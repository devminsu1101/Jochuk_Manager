from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import uuid
import random

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

class QuarterConfig(BaseModel):
    quarterId: int
    formation: str

class AutoAssignRequest(BaseModel):
    players: List[PlayerIn]
    quarters: List[QuarterConfig]

matches_db: Dict[str, List[Dict]] = {
    "match-123": []
}

PLAYER_COLORS = [
    "#E53935", "#D81B60", "#8E24AA", "#5E35B1", "#3949AB", 
    "#1E88E5", "#039BE5", "#00ACC1", "#00897B", "#43A047", 
    "#7CB342", "#C0CA33", "#FDD835", "#FFB300", "#FB8C00", 
    "#F4511E", "#6D4C41", "#757575", "#546E7A", "#263238"
]

def get_category(pos: str):
    pos = pos.upper()
    if pos == "GK": return "GK"
    if "CB" in pos: return "CB"
    if "LB" in pos or "RB" in pos: return "SB" # Side Back
    if any(x in pos for x in ["CM", "DM", "AM", "MF"]): return "MF"
    if any(x in pos for x in ["ST", "LW", "RW", "FW"]): return "FW"
    return "MF"

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
    return new_player

@app.post("/api/auto-assign")
async def auto_assign(req: AutoAssignRequest):
    if len(req.players) < 11:
        raise HTTPException(status_code=400, detail="최소 11명의 선수가 필요합니다.")

    # 내부 상태 초기화 (실제로는 누적 play_count를 고려해야 함)
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
        # 4-2-3-1 포메이션 슬롯 정의
        slots = ["GK", "LB", "LCB", "RCB", "RB", "LCDM", "RCDM", "LW", "CAM", "RW", "ST"]
        assigned = {}
        assigned_player_ids = set()

        # 1. GK 우선 배정
        gk_candidates = [p for p in players if p['primary'] == "GK"]
        if not gk_candidates: gk_candidates = players
        gk_candidates.sort(key=lambda x: x['play_count'])
        selected_gk = gk_candidates[0]
        assigned["GK"] = selected_gk["id"]
        selected_gk["play_count"] += 1
        assigned_player_ids.add(selected_gk["id"])

        # 2. 필드 플레이어 배정 (엄격한 규칙 적용)
        field_slots = [s for s in slots if s != "GK"]
        for slot in field_slots:
            slot_cat = get_category(slot)
            available = [p for p in players if p['id'] not in assigned_player_ids]
            if not available: break

            # 가용 인원 중 해당 포지션을 선호/수행 가능한 사람만 1차 필터링
            qualified = [
                p for p in available 
                if get_category(p['primary']) == slot_cat or 
                any(get_category(sp) == slot_cat for sp in p['secondary'])
            ]

            # 99% 규칙: 적합한 사람이 있다면 그들 중에서만 선택
            pool = qualified if qualified else available 

            def sort_key(p):
                # 최우선: 출전 횟수 적은 사람 (공정성)
                # 차선: 1순위 포지션 일치 여부
                score = p['play_count'] * 100
                if get_category(p['primary']) == slot_cat:
                    score -= 50 # 1순위 일치 시 큰 보너스
                elif any(get_category(sp) == slot_cat for sp in p['secondary']):
                    score -= 20 # 2순위 일치 시 중간 보너스
                return score

            pool.sort(key=sort_key)
            selected = pool[0]
            assigned[slot] = selected["id"]
            selected["play_count"] += 1
            assigned_player_ids.add(selected["id"])
            
        results.append({
            "quarterId": q.quarterId,
            "assignedPlayers": assigned
        })
    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
