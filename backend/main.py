from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import uuid
import random
import os
import json

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

DB_FILE = "matches_db.json"

def load_db():
    if os.path.exists(DB_FILE):
        try:
            with open(DB_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except:
            return {"match-123": []}
    return {"match-123": []}

def save_db(db):
    with open(DB_FILE, "w", encoding="utf-8") as f:
        json.dump(db, f, ensure_ascii=False, indent=4)

matches_db = load_db()

PLAYER_COLORS = [
    "#E53935", "#D81B60", "#8E24AA", "#5E35B1", "#3949AB", 
    "#1E88E5", "#039BE5", "#00ACC1", "#00897B", "#43A047", 
    "#7CB342", "#C0CA33", "#FDD835", "#FFB300", "#FB8C00", 
    "#F4511E", "#6D4C41", "#757575", "#546E7A", "#263238"
]

# 좌우 및 중앙 역할을 엄격히 구분한 세부 포지션 그룹 정의
POSITION_GROUPS = {
    "GK": ["GK"],
    "CB": ["CB", "LCB", "RCB"],
    "LB": ["LB", "LWB"],             # 왼쪽 풀백/윙백
    "RB": ["RB", "RWB"],             # 오른쪽 풀백/윙백
    "DM": ["CDM", "DM", "LCDM", "RCDM"],
    "CM": ["CM", "LCM", "RCM"],
    "AM": ["CAM", "AM"],
    "LWIDE": ["LM", "LW"],           # 왼쪽 측면 (미드필더/윙어)
    "RWIDE": ["RM", "RW"],           # 오른쪽 측면 (미드필더/윙어)
    "ST": ["ST", "FW", "LST", "RST"],
    "CF": ["CF"]
}

# 슬롯별 호환성 맵 (Slot_Group: (Primary_Matches, Secondary_Matches))
# 사용자 피드백 반영: RB는 LB보다 RM(RWIDE)에 훨씬 가깝게 설정
COMPATIBILITY = {
    "GK": (["GK"], []),
    "CB": (["CB"], ["LB", "RB", "DM"]),
    "LB": (["LB"], ["LWIDE", "CB"]),  # 왼쪽 라인 연계 (LB <-> LM/LW)
    "RB": (["RB"], ["RWIDE", "CB"]),  # 오른쪽 라인 연계 (RB <-> RM/RW)
    "DM": (["DM", "CM"], ["CB", "AM"]),
    "CM": (["CM", "DM", "AM"], ["LWIDE", "RWIDE"]),
    "AM": (["AM", "CM", "CF"], ["DM", "ST", "LWIDE", "RWIDE"]),
    "LWIDE": (["LWIDE"], ["LB", "AM", "ST"]), # 왼쪽 공격 라인
    "RWIDE": (["RWIDE"], ["RB", "AM", "ST"]), # 오른쪽 공격 라인
    "ST": (["ST", "CF"], ["LWIDE", "RWIDE", "AM"]),
    "CF": (["CF", "ST", "AM"], ["LWIDE", "RWIDE"])
}

def get_pos_group(pos: str):
    """특정 포지션 약어가 어떤 그룹에 속하는지 반환 (좌우 구분 포함)"""
    pos = pos.upper()
    
    # 1. 명시적 좌우 구분 처리
    if pos in ["LB", "LWB"]: return "LB"
    if pos in ["RB", "RWB"]: return "RB"
    if pos in ["LM", "LW"]: return "LWIDE"
    if pos in ["RM", "RW"]: return "RWIDE"
    
    # 2. 정의된 그룹에서 멤버 확인
    for group, members in POSITION_GROUPS.items():
        if pos in members:
            return group
            
    # 3. 키워드 기반 매칭 (그 외의 경우)
    if "CB" in pos: return "CB"
    if "DM" in pos or "CDM" in pos: return "DM"
    if "AM" in pos or "CAM" in pos: return "AM"
    if "CM" in pos: return "CM"
    if "CF" in pos: return "CF"
    if any(x in pos for x in ["ST", "FW"]): return "ST"
    return "CM"

# 프론트엔드와 동일한 포메이션 구성을 백엔드에서도 정의
FORMATIONS_SLOTS = {
    "4-4-2": ["GK", "LB", "LCB", "RCB", "RB", "LM", "LCM", "RCM", "RM", "LST", "RST"],
    "4-2-3-1": ["GK", "LB", "LCB", "RCB", "RB", "LCDM", "RCDM", "LW", "CAM", "RW", "ST"]
}

@app.get("/api/matches/{match_id}/players")
async def get_players(match_id: str):
    if match_id not in matches_db:
        matches_db[match_id] = []
    return matches_db[match_id]

@app.post("/api/matches/{match_id}/players")
async def register_player(match_id: str, player: PlayerIn):
    if match_id not in matches_db:
        matches_db[match_id] = []
    
    used_colors = [p['color'] for p in matches_db[match_id]]
    available_colors = [c for c in PLAYER_COLORS if c not in used_colors]
    color = random.choice(available_colors if available_colors else PLAYER_COLORS)
    
    new_player = {
        "id": str(uuid.uuid4()),
        "name": player.name,
        "primaryPosition": player.primaryPosition,
        "secondaryPositions": player.secondaryPositions,
        "playCount": 0,
        "color": color
    }
    matches_db[match_id].append(new_player)
    save_db(matches_db)
    return new_player

@app.put("/api/matches/{match_id}/players/{player_id}")
async def update_player(match_id: str, player_id: str, player: PlayerIn):
    if match_id not in matches_db:
        raise HTTPException(status_code=404, detail="매치를 찾을 수 없습니다.")
    
    for p in matches_db[match_id]:
        if p["id"] == player_id:
            p["name"] = player.name
            p["primaryPosition"] = player.primaryPosition
            p["secondaryPositions"] = player.secondaryPositions
            save_db(matches_db)
            return p
    
    raise HTTPException(status_code=404, detail="선수를 찾을 수 없습니다.")

@app.delete("/api/matches/{match_id}/players/{player_id}")
async def delete_player(match_id: str, player_id: str):
    if match_id not in matches_db:
        raise HTTPException(status_code=404, detail="매치를 찾을 수 없습니다.")
    
    initial_len = len(matches_db[match_id])
    matches_db[match_id] = [p for p in matches_db[match_id] if p["id"] != player_id]
    
    if len(matches_db[match_id]) < initial_len:
        save_db(matches_db)
        return {"success": True}
    
    raise HTTPException(status_code=404, detail="선수를 찾을 수 없습니다.")

@app.delete("/api/matches/{match_id}/players")
async def delete_all_players(match_id: str):
    if match_id in matches_db:
        matches_db[match_id] = []
        save_db(matches_db)
        return {"success": True, "message": "모든 선수가 삭제되었습니다."}
    raise HTTPException(status_code=404, detail="매치를 찾을 수 없습니다.")

@app.post("/api/matches/{match_id}/players/bulk")
async def register_players_bulk(match_id: str, req: BulkPlayersIn):
    if match_id not in matches_db:
        matches_db[match_id] = []
    
    new_players = []
    used_colors = [p['color'] for p in matches_db[match_id]]
    
    for player in req.players:
        available_colors = [c for c in PLAYER_COLORS if c not in used_colors]
        color = random.choice(available_colors if available_colors else PLAYER_COLORS)
        
        new_player = {
            "id": str(uuid.uuid4()),
            "name": player.name,
            "primaryPosition": player.primaryPosition,
            "secondaryPositions": player.secondaryPositions,
            "playCount": 0,
            "color": color
        }
        new_players.append(new_player)
        matches_db[match_id].append(new_player)
        used_colors.append(color)
        
    save_db(matches_db)
    return new_players

@app.post("/api/auto-assign")
async def auto_assign(req: AutoAssignRequest):
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

            # 해당 슬롯 그룹에 대한 호환성 규칙 가져오기
            primary_matches, secondary_matches = COMPATIBILITY.get(slot_group, (["CM"], []))

            def get_sort_key(p):
                p_primary_group = get_pos_group(p['primary'])
                p_secondary_groups = [get_pos_group(sp) for sp in p['secondary']]
                
                # 0순위: 주 포지션이 슬롯의 주 호환 그룹과 일치
                if p_primary_group in primary_matches:
                    tier = 0
                # 1순위: 주 포지션이 슬롯의 부 호환 그룹과 일치하거나, 부 포지션이 주 호환 그룹과 일치
                elif p_primary_group in secondary_matches or any(sg in primary_matches for sg in p_secondary_groups):
                    tier = 1
                # 2순위: 부 포지션이 부 호환 그룹과 일치
                elif any(sg in secondary_matches for sg in p_secondary_groups):
                    tier = 2
                # 3순위: 기타 (Fill-in)
                else:
                    tier = 3
                
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

    # --- 개선된 공평성 보정 로직 (Robust Post-Balancing) ---
    def get_compatibility_tier(player, slot_group):
        primary_matches, secondary_matches = COMPATIBILITY.get(slot_group, (["CM"], []))
        p_primary_group = get_pos_group(player['primary'])
        p_secondary_groups = [get_pos_group(sp) for sp in player['secondary']]
        if p_primary_group in primary_matches: return 0
        if p_primary_group in secondary_matches or any(sg in primary_matches for sg in p_secondary_groups): return 1
        if any(sg in secondary_matches for sg in p_secondary_groups): return 2
        return 3

    # 필드 플레이어만 밸런싱 대상으로 설정 (골키퍼 제외)
    field_players = [p for p in players if get_pos_group(p['primary']) != "GK"]

    for _ in range(100): # 충분한 시도 횟수 보장
        field_players.sort(key=lambda x: x['play_count'], reverse=True)
        p_max_candidates = [p for p in field_players if p['play_count'] == field_players[0]['play_count']]
        p_min_candidates = [p for p in field_players if p['play_count'] == field_players[-1]['play_count']]
        
        # 격차가 2쿼터 미만이면 종료
        if field_players[0]['play_count'] - field_players[-1]['play_count'] < 2:
            break

        success = False
        # 많이 뛴 사람군과 적게 뛴 사람군 사이에서 교체 가능한 조합 탐색
        for p_max in p_max_candidates:
            for p_min in p_min_candidates:
                if success: break
                
                for res in results:
                    assigned_ids = res['assignedPlayers'].values()
                    if p_max['id'] in assigned_ids and p_min['id'] not in assigned_ids:
                        target_slot = next(s for s, pid in res['assignedPlayers'].items() if pid == p_max['id'])
                        slot_group = get_pos_group(target_slot)
                        
                        # p_min이 해당 슬롯을 소화할 수 있다면 스왑
                        if get_compatibility_tier(p_min, slot_group) <= 2:
                            res['assignedPlayers'][target_slot] = p_min['id']
                            p_max['play_count'] -= 1
                            p_min['play_count'] += 1
                            success = True
                            break
            if success: break
        
        if not success: # 더 이상 교체할 조합이 없으면 종료
            break

    return results

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
