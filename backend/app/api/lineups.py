from fastapi import APIRouter, HTTPException, Depends
from typing import List, Dict, Optional
from pydantic import BaseModel
from app.db.supabase import supabase
from app.schemas.lineup import LineupUpdateIn, AutoAssignRequest
from app.services.ai_service import AIService
from app.core.security import verify_match_owner

router = APIRouter(tags=["lineups"])

class BulkLineupsIn(BaseModel):
    lineups: List[Dict]

@router.get("/api/matches/{match_id}/lineups")
async def get_lineups(match_id: str):
    try:
        res = supabase.table("lineups").select("*").eq("match_id", match_id).execute()
        if res.data:
            formatted_data = []
            for l in res.data:
                # 존재하는 모든 가능성 있는 컬럼명 체크
                q_id = l.get("quarter_id") or l.get("quarterId") or l.get("quarter") or 1
                formatted_data.append({
                    "quarterId": q_id,
                    "formation": l.get("formation", "4-2-3-1"),
                    "assignedPlayers": l.get("assigned_players") or l.get("assignedPlayers") or {}
                })
            formatted_data.sort(key=lambda x: x["quarterId"])
            return formatted_data
    except Exception as e:
        print(f"Fetch lineups error: {e}")
    
    return [{"quarterId": i, "formation": "4-2-3-1", "assignedPlayers": {}} for i in [1, 2, 3, 4]]

@router.put("/api/matches/{match_id}/lineups/bulk")
async def update_lineups_bulk(match_id: str, req: BulkLineupsIn, authorized: bool = Depends(verify_match_owner)):
    """모든 쿼터 라인업을 유연하게 저장"""
    try:
        # 1. 시도해볼 컬럼명 조합들
        attempts = [
            {"match_id": "match_id", "quarter": "quarter_id", "formation": "formation", "players": "assigned_players"},
            {"match_id": "match_id", "quarter": "quarterId", "formation": "formation", "players": "assignedPlayers"},
            {"match_id": "match_id", "quarter": "quarter", "formation": "formation", "players": "assigned_players"}
        ]
        
        last_error = None
        for mapping in attempts:
            payload = []
            for l in req.lineups:
                payload.append({
                    mapping["match_id"]: match_id,
                    mapping["quarter"]: l.get("quarterId"),
                    mapping["formation"]: l.get("formation"),
                    mapping["players"]: l.get("assignedPlayers")
                })
            
            try:
                res = supabase.table("lineups").upsert(payload, on_conflict=f"{mapping['match_id']}, {mapping['quarter']}").execute()
                if res.data:
                    return {"success": True}
            except Exception as e:
                last_error = e
                continue # 다음 조합 시도
        
        raise last_error or Exception("모든 컬럼명 조합 시도 실패")

    except Exception as e:
        print(f"Bulk save critical error: {e}")
        return {"success": False, "error": str(e)}

@router.post("/api/matches/{match_id}/auto-assign")
async def auto_assign(match_id: str, req: AutoAssignRequest, authorized: bool = Depends(verify_match_owner)):
    """특정 매치의 라인업을 AI로 자동 배정 (방장 전용)"""
    return AIService.auto_assign(req.players, req.quarters)
