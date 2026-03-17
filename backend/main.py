from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import uuid
import random

app = FastAPI()

# CORS 설정
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

# 인메모리 저장소
matches_db: Dict[str, List[Dict]] = {
    "match-123": []
}

def get_category(pos: str):
    pos = pos.upper()
    if pos == "GK": return "GK"
    if any(x in pos for x in ["CB", "LB", "RB", "DF"]): return "DF"
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
    
    # 20여개의 랜덤 아바타 생성을 위한 시드값 (이름 기반 또는 랜덤)
    avatar_id = random.randint(1, 70)
    avatar_url = f"https://i.pravatar.cc/150?u={avatar_id}"
    
    new_player = {
        "id": str(uuid.uuid4()),
        "name": player.name,
        "primaryPosition": player.primaryPosition,
        "secondaryPositions": player.secondaryPositions,
        "playCount": 0,
        "avatarUrl": avatar_url
    }
    matches_db[match_id].append(new_player)
    return new_player

@app.post("/api/auto-assign")
async def auto_assign(req: AutoAssignRequest):
    # 최소 인원 11명 체크 (안전 장치: 백엔드에서도 검증)
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
        slots = ["GK", "LB", "LCB", "RCB", "RB", "LM", "LCM", "RCM", "RM", "LST", "RST"]
        assigned = {}
        assigned_player_ids = set()

        gk_candidates = [p for p in players if p['primary'] == "GK"]
        if not gk_candidates: gk_candidates = players
        gk_candidates.sort(key=lambda x: x['play_count'])
        selected_gk = gk_candidates[0]
        assigned["GK"] = selected_gk["id"]
        selected_gk["play_count"] += 1
        assigned_player_ids.add(selected_gk["id"])

        field_slots = [s for s in slots if s != "GK"]
        for slot in field_slots:
            slot_cat = get_category(slot)
            available = [p for p in players if p['id'] not in assigned_player_ids]
            if not available: break

            def sort_key(p):
                score = p['play_count'] * 10
                if get_category(p['primary']) == slot_cat: score -= 5
                elif any(get_category(sp) == slot_cat for sp in p['secondary']): score -= 2
                return score

            available.sort(key=sort_key)
            selected = available[0]
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
