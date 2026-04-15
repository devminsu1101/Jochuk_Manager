from fastapi import APIRouter, HTTPException, Request, Depends
from typing import List, Optional
import uuid
from app.db.supabase import supabase
from app.schemas.match import MatchCreate, MatchOut
from app.core.security import get_current_user

router = APIRouter(prefix="/api/matches", tags=["matches"])

@router.get("")
async def list_matches(search: Optional[str] = None):
    try:
        # 매치와 해당 매치의 선수 숫자를 함께 가져옴
        query = supabase.table("matches").select("*, players(count)").eq("is_public", True).order("match_date", desc=False)
        if search: query = query.ilike("title", f"%{search}%")
        res = query.execute()
        
        # 데이터 가공: players count 데이터를 player_count 필드로 변환
        processed_data = []
        for match in res.data:
            match["player_count"] = match.get("players", [{}])[0].get("count", 0) if match.get("players") else 0
            processed_data.append(match)
            
        return processed_data
    except Exception as e:
        print(f"List matches error: {e}")
        return []

@router.get("/my")
async def list_my_matches(user = Depends(get_current_user)):
    try:
        # 내가 만든 매치들만 가져옴
        res = supabase.table("matches").select("*, players(count)").eq("owner_id", user.id).order("match_date", desc=True).execute()
        
        processed_data = []
        for match in res.data:
            match["player_count"] = match.get("players", [{}])[0].get("count", 0) if match.get("players") else 0
            processed_data.append(match)
            
        return processed_data
    except Exception as e:
        print(f"List my matches error: {e}")
        return []

@router.post("")
async def create_match(match: MatchCreate, user = Depends(get_current_user)):
    match_id = str(uuid.uuid4())[:8]
    new_match = {
        "id": match_id,
        "title": match.title,
        "match_date": match.matchDate.isoformat(),
        "match_time": match.matchTime.isoformat(),
        "is_public": match.isPublic,
        "status": "upcoming",
        "owner_id": user.id  # 매치 생성자의 ID 기록
    }
    try:
        res = supabase.table("matches").insert(new_match).execute()
        return res.data[0]
    except Exception as e:
        print(f"Match creation error: {e}")
        raise HTTPException(status_code=500, detail="매치 생성 실패")


@router.get("/{match_id}")
async def get_match_detail(match_id: str):
    try:
        res = supabase.table("matches").select("*").eq("id", match_id).execute()
        if not res.data: raise HTTPException(status_code=404)
        return res.data[0]
    except:
        raise HTTPException(status_code=404, detail="매치를 찾을 수 없습니다.")
