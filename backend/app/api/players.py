from fastapi import APIRouter, HTTPException, Depends
from typing import List
import random
from app.db.supabase import supabase
from app.schemas.player import PlayerIn, BulkPlayersIn
from app.core.constants import PLAYER_COLORS
from app.core.security import verify_match_owner

# strict_slashes=False를 통해 /players 와 /players/ 모두 허용
router = APIRouter(prefix="/api/matches/{match_id}/players", tags=["players"])

@router.get("", include_in_schema=True)
@router.get("/", include_in_schema=False)
async def get_players(match_id: str):
    try:
        res = supabase.table("players").select("*").eq("match_id", match_id).order("created_at").execute()
        return [{"id": p["id"], "name": p["name"], "primaryPosition": p["primary_position"], 
                 "secondaryPositions": p["secondary_positions"], "play_count": p["play_count"], "color": p["color"]} for p in res.data]
    except: return []

@router.post("", include_in_schema=True)
@router.post("/", include_in_schema=False)
async def register_player(match_id: str, player: PlayerIn):
    # 개별 등록은 초대 링크를 가진 누구나 가능하도록 verify_match_owner 제거
    color = random.choice(PLAYER_COLORS)
    new_player_data = {
        "match_id": match_id,
        "name": player.name,
        "primary_position": player.primaryPosition,
        "secondary_positions": player.secondaryPositions,
        "play_count": 0,
        "color": color
    }
    try:
        res = supabase.table("players").insert(new_player_data).execute()
        if not res.data:
            raise HTTPException(status_code=500, detail="선수 등록 실패")
        p = res.data[0]
        return {"id": p["id"], "name": p["name"], "primaryPosition": p["primary_position"], 
                "secondaryPositions": p["secondary_positions"], "play_count": p["play_count"], "color": p["color"]}
    except Exception as e:
        print(f"Register player error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("", include_in_schema=True)
@router.delete("/", include_in_schema=False)
async def delete_all_players(match_id: str, authorized: bool = Depends(verify_match_owner)):
    try:
        supabase.table("players").delete().eq("match_id", match_id).execute()
        return {"success": True}
    except:
        raise HTTPException(status_code=500, detail="전체 삭제 실패")

@router.put("/{player_id}")
async def update_player(match_id: str, player_id: str, player: PlayerIn, authorized: bool = Depends(verify_match_owner)):
    update_data = {
        "name": player.name,
        "primary_position": player.primaryPosition,
        "secondary_positions": player.secondaryPositions
    }
    try:
        res = supabase.table("players").update(update_data).eq("id", player_id).eq("match_id", match_id).execute()
        p = res.data[0]
        return {"id": p["id"], "name": p["name"], "primaryPosition": p["primary_position"], 
                "secondaryPositions": p["secondary_positions"], "play_count": p["play_count"], "color": p["color"]}
    except:
        raise HTTPException(status_code=404, detail="선수를 찾을 수 없습니다.")

@router.delete("/{player_id}")
async def delete_player(match_id: str, player_id: str, authorized: bool = Depends(verify_match_owner)):
    try:
        supabase.table("players").delete().eq("id", player_id).eq("match_id", match_id).execute()
        return {"success": True}
    except:
        return {"success": False}

@router.post("/bulk")
async def register_players_bulk(match_id: str, req: BulkPlayersIn, authorized: bool = Depends(verify_match_owner)):
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
                 "secondaryPositions": p["secondary_positions"], "play_count": p["play_count"], "color": p["color"]} for p in res.data]
    except: return []
