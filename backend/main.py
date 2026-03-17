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
    save_db(matches_db)
    return new_player

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
        slots = ["GK", "LB", "LCB", "RCB", "RB", "LCDM", "RCDM", "LW", "CAM", "RW", "ST"]
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

            qualified = [
                p for p in available 
                if get_category(p['primary']) == slot_cat or 
                any(get_category(sp) == slot_cat for sp in p['secondary'])
            ]

            pool = qualified if qualified else available 

            def sort_key(p):
                score = p['play_count'] * 100
                if get_category(p['primary']) == slot_cat:
                    score -= 50
                elif any(get_category(sp) == slot_cat for sp in p['secondary']):
                    score -= 20
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
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
