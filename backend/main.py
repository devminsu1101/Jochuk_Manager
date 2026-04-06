from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import uuid
import random
import os
from datetime import date, time
from dotenv import load_dotenv
from supabase import create_client, Client

# .env 파일 로드
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Models ---

class PlayerIn(BaseModel):
    id: Optional[str] = None
    name: str
    primaryPosition: str
    secondaryPositions: List[str]

class BulkPlayersIn(BaseModel):
    players: List[PlayerIn]

class MatchCreateIn(BaseModel):
    title: str
    matchDate: date
    matchTime: time
    isPublic: bool = True

class QuarterConfig(BaseModel):
    quarterId: int
    formation: str

class LineupUpdateIn(BaseModel):
    formation: str
    assignedPlayers: Dict[str, Optional[str]]

class AutoAssignRequest(BaseModel):
    players: List[PlayerIn]
    quarters: List[QuarterConfig]

# --- Constants ---

PLAYER_COLORS = [
    "#E53935", "#D81B60", "#8E24AA", "#5E35B1", "#3949AB", 
    "#1E88E5", "#039BE5", "#00ACC1", "#00897B", "#43A047", 
    "#7CB342", "#C0CA33", "#FDD835", "#FFB300", "#FB8C00", 
    "#F4511E", "#6D4C41", "#757575", "#546E7A", "#263238"
]

# 포지션 카테고리 정의 (전술적 친밀도용)
CATEGORIES = {
    "GK": ["GK"],
    "DF": ["LB", "LCB", "CB", "RCB", "RB", "LWB", "RWB"],
    "CDM": ["LCDM", "CDM", "RCDM", "CM"],
    "AM": ["LW", "CAM", "RW", "LM", "RM"],
    "FW": ["ST", "CF", "LS", "RS"]
}

# --- Helper Functions ---

async def get_user_id(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header: return None
    try:
        token = auth_header.replace("Bearer ", "")
        user = supabase.auth.get_user(token)
        return user.user.id
    except: return None

async def ensure_match_exists(match_id: str):
    try:
        res = supabase.table("matches").select("id").eq("id", match_id).execute()
        if not res.data:
            supabase.table("matches").insert({"id": match_id, "title": f"매치 {match_id}"}).execute()
    except: pass

def get_pos_category(pos: str):
    for cat, positions in CATEGORIES.items():
        if pos in positions: return cat
    # 포메이션 슬롯 이름(예: LCB)에서 카테고리 유추
    if "CB" in pos or "LB" in pos or "RB" in pos or "DF" in pos: return "DF"
    if "DM" in pos: return "CDM"
    if "AM" in pos or "LW" in pos or "RW" in pos: return "AM"
    if "ST" in pos or "CF" in pos: return "FW"
    return "AM"

# --- API Endpoints: Matches ---

@app.get("/api/matches")
async def list_matches(search: Optional[str] = None):
    try:
        query = supabase.table("matches").select("*").eq("is_public", True).order("match_date", desc=False)
        if search: query = query.ilike("title", f"%{search}%")
        res = query.execute()
        return res.data
    except: return []

@app.get("/api/matches/{match_id}")
async def get_match_detail(match_id: str):
    try:
        res = supabase.table("matches").select("*").eq("id", match_id).execute()
        if not res.data: raise HTTPException(status_code=404)
        return res.data[0]
    except: return {"id": match_id, "title": "매치 정보 없음"}

# --- API Endpoints: Lineups (영구 저장 및 조회) ---

@app.get("/api/matches/{match_id}/lineups")
async def get_lineups(match_id: str):
    try:
        res = supabase.table("lineups").select("*").eq("match_id", match_id).order("quarter_id").execute()
        if res.data:
            return [{"quarterId": l["quarter_id"], "formation": l["formation"], "assignedPlayers": l["assigned_players"]} for l in res.data]
    except: pass
    
    # 테이블이 없거나 데이터가 없으면 기본값 반환
    return [{"quarterId": i, "formation": "4-2-3-1", "assignedPlayers": {}} for i in [1, 2, 3, 4]]

@app.put("/api/matches/{match_id}/lineups/{quarter_id}")
async def update_lineup(match_id: str, quarter_id: int, lineup: LineupUpdateIn):
    try:
        payload = {
            "match_id": match_id,
            "quarter_id": quarter_id,
            "formation": lineup.formation,
            "assigned_players": lineup.assignedPlayers
        }
        res = supabase.table("lineups").upsert(payload).execute()
        if res.data:
            p = res.data[0]
            return {"quarterId": p["quarter_id"], "formation": p["formation"], "assignedPlayers": p["assigned_players"]}
    except Exception as e:
        print(f"Lineup save error: {e}")
    return {"quarterId": quarter_id, "formation": lineup.formation, "assignedPlayers": lineup.assignedPlayers}

# --- API Endpoints: Players ---

@app.get("/api/matches/{match_id}/players")
async def get_players(match_id: str):
    try:
        res = supabase.table("players").select("*").eq("match_id", match_id).order("created_at").execute()
        return [{"id": p["id"], "name": p["name"], "primaryPosition": p["primary_position"], 
                 "secondaryPositions": p["secondary_positions"], "playCount": p["play_count"], "color": p["color"]} for p in res.data]
    except: return []

@app.post("/api/matches/{match_id}/players/bulk")
async def register_players_bulk(match_id: str, req: BulkPlayersIn):
    await ensure_match_exists(match_id)
    batch_data = []
    for player in req.players:
        color = random.choice(PLAYER_COLORS)
        batch_data.append({
            "match_id": match_id, "name": player.name, "primary_position": player.primaryPosition,
            "secondary_positions": player.secondaryPositions, "play_count": 0, "color": color
        })
    try:
        res = supabase.table("players").insert(batch_data).execute()
        return [{"id": p["id"], "name": p["name"], "primaryPosition": p["primary_position"], 
                 "secondaryPositions": p["secondary_positions"], "playCount": p["play_count"], "color": p["color"]} for p in res.data]
    except: return []

# --- AI Auto Assign (The Real Logic) ---

@app.post("/api/auto-assign")
async def auto_assign(req: AutoAssignRequest):
    if len(req.players) < 11:
        raise HTTPException(status_code=400, detail="최소 11명의 선수가 필요합니다.")

    # 1. 선수 데이터 구조화 (출전 횟수 추적용)
    player_pool = []
    for p in req.players:
        player_pool.append({
            "id": p.id,
            "name": p.name,
            "primary": p.primaryPosition,
            "secondary": p.secondaryPositions,
            "play_count": 0
        })

    results = []
    
    # 2. 쿼터별 배정 시작
    for q_cfg in req.quarters:
        quarter_id = q_cfg.quarterId
        formation = q_cfg.formation
        
        # 포메이션 슬롯 정의 (가정: formations.ts의 구조와 일치)
        # 4-2-3-1 예시 슬롯들
        slots = ["GK", "LB", "LCB", "RCB", "RB", "LCDM", "RCDM", "LW", "CAM", "RW", "ST"]
        # 실제로는 프론트엔드에서 포메이션 데이터에 따른 슬롯 리스트를 넘겨받거나 정의해야 함
        # 여기서는 기본 11개 슬롯을 사용 (포메이션 문자열에 따라 유동적으로 처리 가능하도록 개선 필요)
        
        assigned_in_quarter = {}
        used_player_ids = set()

        # 배정 우선순위: GK -> 각 카테고리별 매칭
        for slot in slots:
            slot_cat = get_pos_category(slot)
            
            # 후보군 필터링 (이번 쿼터 미사용자 중)
            candidates = [p for p in player_pool if p["id"] not in used_player_ids]
            
            def sort_key(p):
                # 1. 출전 횟수 적은 순 (공평성)
                # 2. 선호 포지션 일치 여부 (전문성)
                pref_score = 3 # 기본값 (매칭 안됨)
                if p["primary"] == slot or get_pos_category(p["primary"]) == slot_cat:
                    pref_score = 0
                elif slot in p["secondary"] or any(get_pos_category(s) == slot_cat for s in p["secondary"]):
                    pref_score = 1
                
                return (p["play_count"], pref_score, random.random())

            candidates.sort(key=sort_key)
            
            if candidates:
                selected = candidates[0]
                assigned_in_quarter[slot] = selected["id"]
                used_player_ids.add(selected["id"])
                # 선택된 선수의 전체 출전 횟수 증가
                for p in player_pool:
                    if p["id"] == selected["id"]:
                        p["play_count"] += 1
                        break
        
        results.append({
            "quarterId": quarter_id,
            "assignedPlayers": assigned_in_quarter
        })

    return results

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
