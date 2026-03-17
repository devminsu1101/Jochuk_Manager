from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
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
    id: str
    name: str
    primaryPosition: str
    secondaryPositions: List[str]

class QuarterConfig(BaseModel):
    quarterId: int
    formation: str

class AutoAssignRequest(BaseModel):
    players: List[PlayerIn]
    quarters: List[QuarterConfig]

def get_category(pos: str):
    pos = pos.upper()
    if pos == "GK": return "GK"
    if any(x in pos for x in ["CB", "LB", "RB", "DF"]): return "DF"
    if any(x in pos for x in ["CM", "DM", "AM", "MF"]): return "MF"
    if any(x in pos for x in ["ST", "LW", "RW", "FW"]): return "FW"
    return "MF"

@app.post("/api/auto-assign")
async def auto_assign(req: AutoAssignRequest):
    # 입력 데이터를 내부 dict 구조로 변환
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
    
    # 쿼터별 배정 로직 (Fairness 기반)
    for q in req.quarters:
        # 4-4-2 기본 포지션 슬롯 (프론트엔드와 일치)
        slots = ["GK", "LB", "LCB", "RCB", "RB", "LM", "LCM", "RCM", "RM", "LST", "RST"]
        
        assigned = {}
        assigned_player_ids = set()

        # 1. GK 우선 배정
        gk_candidates = [p for p in players if p['primary'] == "GK"]
        if not gk_candidates:
            gk_candidates = players
        
        gk_candidates.sort(key=lambda x: x['play_count'])
        selected_gk = gk_candidates[0]
        assigned["GK"] = selected_gk["id"]
        selected_gk["play_count"] += 1
        assigned_player_ids.add(selected_gk["id"])

        # 2. 필드 플레이어 배정
        field_slots = [s for s in slots if s != "GK"]
        for slot in field_slots:
            slot_cat = get_category(slot)
            
            available = [p for p in players if p['id'] not in assigned_player_ids]
            if not available: break

            # 정렬 기준: 1. 적게 뛴 순, 2. 선호 포지션 일치
            def sort_key(p):
                score = p['play_count'] * 10
                if get_category(p['primary']) == slot_cat:
                    score -= 5
                elif any(get_category(sp) == slot_cat for sp in p['secondary']):
                    score -= 2
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
