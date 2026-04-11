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
        query = supabase.table("matches").select("*").eq("is_public", True).order("match_date", desc=False)
        if search: query = query.ilike("title", f"%{search}%")
        res = query.execute()
        return res.data
    except: return []

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
