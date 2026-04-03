from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import uuid
import random
import os
from dotenv import load_dotenv
from supabase import create_client, Client

# .env 파일 로드
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("⚠️ 경고: SUPABASE_URL 또는 SUPABASE_KEY가 설정되지 않았습니다.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PlayerIn(BaseModel):
    id: Optional[str] = None
    name: str
    primaryPosition: str
    secondaryPositions: List[str]

class BulkPlayersIn(BaseModel):
    players: List[PlayerIn]

class QuarterConfig(BaseModel):
    quarterId: int
    formation: str

class AutoAssignRequest(BaseModel):
    players: List[PlayerIn]
    quarters: List[QuarterConfig]

PLAYER_COLORS = [
    "#E53935", "#D81B60", "#8E24AA", "#5E35B1", "#3949AB", 
    "#1E88E5", "#039BE5", "#00ACC1", "#00897B", "#43A047", 
    "#7CB342", "#C0CA33", "#FDD835", "#FFB300", "#FB8C00", 
    "#F4511E", "#6D4C41", "#757575", "#546E7A", "#263238"
]

# 포지션 그룹 및 호환성 설정 (기존 로직 유지)
POSITION_GROUPS = {
    "GK": ["GK"],
    "CB": ["CB", "LCB", "RCB"],
    "LB": ["LB", "LWB"],
    "RB": ["RB", "RWB"],
    "DM": ["CDM", "DM", "LCDM", "RCDM"],
    "CM": ["CM", "LCM", "RCM"],
    "AM": ["CAM", "AM"],
    "LWIDE": ["LM", "LW"],
    "RWIDE": ["RM", "RW"],
    "ST": ["ST", "FW", "LST", "RST"],
    "CF": ["CF"]
}

COMPATIBILITY = {
    "GK": (["GK"], []),
    "CB": (["CB"], ["LB", "RB", "DM"]),
    "LB": (["LB"], ["LWIDE", "CB"]),
    "RB": (["RB"], ["RWIDE", "CB"]),
    "DM": (["DM", "CM"], ["CB", "AM"]),
    "CM": (["CM", "DM", "AM"], ["LWIDE", "RWIDE"]),
    "AM": (["AM", "CM", "CF"], ["DM", "ST", "LWIDE", "RWIDE"]),
    "LWIDE": (["LWIDE"], ["LB", "AM", "ST"]),
    "RWIDE": (["RWIDE"], ["RB", "AM", "ST"]),
    "ST": (["ST", "CF"], ["LWIDE", "RWIDE", "AM"]),
    "CF": (["CF", "ST", "AM"], ["LWIDE", "RWIDE"])
}

def get_pos_group(pos: str):
    pos = pos.upper()
    if pos in ["LB", "LWB"]: return "LB"
    if pos in ["RB", "RWB"]: return "RB"
    if pos in ["LM", "LW"]: return "LWIDE"
    if pos in ["RM", "RW"]: return "RWIDE"
    for group, members in POSITION_GROUPS.items():
        if pos in members: return group
    if "CB" in pos: return "CB"
    if "DM" in pos or "CDM" in pos: return "DM"
    if "AM" in pos or "CAM" in pos: return "AM"
    if "CM" in pos: return "CM"
    if "CF" in pos: return "CF"
    if any(x in pos for x in ["ST", "FW"]): return "ST"
    return "CM"

FORMATIONS_SLOTS = {
    "4-4-2": ["GK", "LB", "LCB", "RCB", "RB", "LM", "LCM", "RCM", "RM", "LST", "RST"],
    "4-2-3-1": ["GK", "LB", "LCB", "RCB", "RB", "LCDM", "RCDM", "LW", "CAM", "RW", "ST"]
}

async def ensure_match_exists(match_id: str):
    """매치가 존재하지 않으면 생성"""
    res = supabase.table("matches").select("id").eq("id", match_id).execute()
    if not res.data:
        supabase.table("matches").insert({"id": match_id}).execute()

@app.get("/api/matches/{match_id}/players")
async def get_players(match_id: str):
    await ensure_match_exists(match_id)
    res = supabase.table("players").select("*").eq("match_id", match_id).order("created_at").execute()
    # 프론트엔드 형식에 맞춰 필드명 변환 (snake_case -> camelCase)
    players = []
    for p in res.data:
        players.append({
            "id": p["id"],
            "name": p["name"],
            "primaryPosition": p["primary_position"],
            "secondaryPositions": p["secondary_positions"],
            "playCount": p["play_count"],
            "color": p["color"]
        })
    return players

@app.post("/api/matches/{match_id}/players")
async def register_player(match_id: str, player: PlayerIn):
    await ensure_match_exists(match_id)
    
    # 중복되지 않는 색상 선택
    res_players = supabase.table("players").select("color").eq("match_id", match_id).execute()
    used_colors = [p['color'] for p in res_players.data]
    available_colors = [c for c in PLAYER_COLORS if c not in used_colors]
    color = random.choice(available_colors if available_colors else PLAYER_COLORS)
    
    new_player_data = {
        "match_id": match_id,
        "name": player.name,
        "primary_position": player.primaryPosition,
        "secondary_positions": player.secondaryPositions,
        "play_count": 0,
        "color": color
    }
    
    res = supabase.table("players").insert(new_player_data).execute()
    if not res.data:
        raise HTTPException(status_code=500, detail="선수 등록 실패")
    
    p = res.data[0]
    return {
        "id": p["id"],
        "name": p["name"],
        "primaryPosition": p["primary_position"],
        "secondaryPositions": p["secondary_positions"],
        "playCount": p["play_count"],
        "color": p["color"]
    }

@app.put("/api/matches/{match_id}/players/{player_id}")
async def update_player(match_id: str, player_id: str, player: PlayerIn):
    update_data = {
        "name": player.name,
        "primary_position": player.primaryPosition,
        "secondary_positions": player.secondaryPositions
    }
    res = supabase.table("players").update(update_data).eq("id", player_id).eq("match_id", match_id).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="선수를 찾을 수 없습니다.")
    
    p = res.data[0]
    return {
        "id": p["id"],
        "name": p["name"],
        "primaryPosition": p["primary_position"],
        "secondaryPositions": p["secondary_positions"],
        "playCount": p["play_count"],
        "color": p["color"]
    }

@app.delete("/api/matches/{match_id}/players/{player_id}")
async def delete_player(match_id: str, player_id: str):
    res = supabase.table("players").delete().eq("id", player_id).eq("match_id", match_id).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="선수를 찾을 수 없습니다.")
    return {"success": True}

@app.delete("/api/matches/{match_id}/players")
async def delete_all_players(match_id: str):
    supabase.table("players").delete().eq("match_id", match_id).execute()
    return {"success": True, "message": "모든 선수가 삭제되었습니다."}

@app.post("/api/matches/{match_id}/players/bulk")
async def register_players_bulk(match_id: str, req: BulkPlayersIn):
    await ensure_match_exists(match_id)
    
    res_players = supabase.table("players").select("color").eq("match_id", match_id).execute()
    used_colors = [p['color'] for p in res_players.data]
    
    batch_data = []
    for player in req.players:
        available_colors = [c for c in PLAYER_COLORS if c not in used_colors]
        color = random.choice(available_colors if available_colors else PLAYER_COLORS)
        used_colors.append(color)
        
        batch_data.append({
            "match_id": match_id,
            "name": player.name,
            "primary_position": player.primaryPosition,
            "secondary_positions": player.secondaryPositions,
            "play_count": 0,
            "color": color
        })
        
    res = supabase.table("players").insert(batch_data).execute()
    
    new_players = []
    for p in res.data:
        new_players.append({
            "id": p["id"],
            "name": p["name"],
            "primaryPosition": p["primary_position"],
            "secondaryPositions": p["secondary_positions"],
            "playCount": p["play_count"],
            "color": p["color"]
        })
    return new_players

@app.post("/api/auto-assign")
async def auto_assign(req: AutoAssignRequest):
    # 자동 배정 로직은 기존과 동일하게 메모리에서 계산 (필요시 DB의 play_count와 동기화 로직 추가 가능)
    if len(req.players) < 11:
        raise HTTPException(status_code=400, detail="최소 11명의 선수가 필요합니다.")

    players = []
    for p in req.players:
        players.append({
            "id": p.id,
            "name": p.name,
            "primary": p.primaryPosition,
            "secondary": p.secondaryPositions,
            "play_count": 0
        })

    results = []
    for q in req.quarters:
        slots = FORMATIONS_SLOTS.get(q.formation, FORMATIONS_SLOTS["4-2-3-1"])
        assigned = {}
        assigned_player_ids = set()

        for slot in slots:
            slot_group = get_pos_group(slot)
            available = [p for p in players if p['id'] not in assigned_player_ids]
            if not available: break

            primary_matches, secondary_matches = COMPATIBILITY.get(slot_group, (["CM"], []))

            def get_sort_key(p):
                p_primary_group = get_pos_group(p['primary'])
                p_secondary_groups = [get_pos_group(sp) for sp in p['secondary']]
                if p_primary_group in primary_matches: tier = 0
                elif p_primary_group in secondary_matches or any(sg in primary_matches for sg in p_secondary_groups): tier = 1
                elif any(sg in secondary_matches for sg in p_secondary_groups): tier = 2
                else: tier = 3
                return (tier, p['play_count'])

            available.sort(key=get_sort_key)
            selected = available[0]
            assigned[slot] = selected["id"]
            selected["play_count"] += 1
            assigned_player_ids.add(selected["id"])
            
        results.append({
            "quarterId": q.quarterId,
            "assignedPlayers": assigned
        })

    # 공평성 보정 로직 (기존 유지)
    def get_compatibility_tier(player, slot_group):
        primary_matches, secondary_matches = COMPATIBILITY.get(slot_group, (["CM"], []))
        p_primary_group = get_pos_group(player['primary'])
        p_secondary_groups = [get_pos_group(sp) for sp in player['secondary']]
        if p_primary_group in primary_matches: return 0
        if p_primary_group in secondary_matches or any(sg in primary_matches for sg in p_secondary_groups): return 1
        if any(sg in secondary_matches for sg in p_secondary_groups): return 2
        return 3

    field_players = [p for p in players if get_pos_group(p['primary']) != "GK"]
    for _ in range(100):
        field_players.sort(key=lambda x: x['play_count'], reverse=True)
        if field_players[0]['play_count'] - field_players[-1]['play_count'] < 2: break
        success = False
        p_max_candidates = [p for p in field_players if p['play_count'] == field_players[0]['play_count']]
        p_min_candidates = [p for p in field_players if p['play_count'] == field_players[-1]['play_count']]
        for p_max in p_max_candidates:
            for p_min in p_min_candidates:
                if success: break
                for res in results:
                    assigned_ids = res['assignedPlayers'].values()
                    if p_max['id'] in assigned_ids and p_min['id'] not in assigned_ids:
                        target_slot = next(s for s, pid in res['assignedPlayers'].items() if pid == p_max['id'])
                        if get_compatibility_tier(p_min, get_pos_group(target_slot)) <= 2:
                            res['assignedPlayers'][target_slot] = p_min['id']
                            p_max['play_count'] -= 1
                            p_min['play_count'] += 1
                            success = True
                            break
            if success: break
        if not success: break

    return results

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
