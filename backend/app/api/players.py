from fastapi import APIRouter, HTTPException
from typing import List
import random
from app.db.supabase import supabase
from app.schemas.player import PlayerIn, BulkPlayersIn
from app.core.constants import PLAYER_COLORS

router = APIRouter(prefix="/api/matches/{match_id}/players", tags=["players"])

@router.get("")
async def get_players(match_id: str):
    try:
        res = supabase.table("players").select("*").eq("match_id", match_id).order("created_at").execute()
        return [{"id": p["id"], "name": p["name"], "primaryPosition": p["primary_position"], 
                 "secondaryPositions": p["secondary_positions"], "playCount": p["play_count"], "color": p["color"]} for p in res.data]
    except: return []

@router.post("")
async def register_player(match_id: str, player: PlayerIn):
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
        p = res.data[0]
        return {"id": p["id"], "name": p["name"], "primaryPosition": p["primary_position"], 
                "secondaryPositions": p["secondary_positions"], "playCount": p["play_count"], "color": p["color"]}
    except:
        raise HTTPException(status_code=500, detail="선수 등록 실패")

@router.delete("")
async def delete_all_players(match_id: str):
    """멸종 버튼: 해당 매치의 모든 선수 삭제"""
    try:
        supabase.table("players").delete().eq("match_id", match_id).execute()
        return {"success": True}
    except:
        raise HTTPException(status_code=500, detail="전체 삭제 실패")

@router.put("/{player_id}")
async def update_player(match_id: str, player_id: str, player: PlayerIn):
    update_data = {
        "name": player.name,
        "primary_position": player.primaryPosition,
        "secondary_positions": player.secondaryPositions
    }
    try:
        res = supabase.table("players").update(update_data).eq("id", player_id).eq("match_id", match_id).execute()
        p = res.data[0]
        return {"id": p["id"], "name": p["name"], "primaryPosition": p["primary_position"], 
                "secondaryPositions": p["secondary_positions"], "playCount": p["play_count"], "color": p["color"]}
    except:
        raise HTTPException(status_code=404, detail="선수를 찾을 수 없습니다.")

@router.delete("/{player_id}")
async def delete_player(match_id: str, player_id: str):
    supabase.table("players").delete().eq("id", player_id).eq("match_id", match_id).execute()
    return {"success": True}

@router.post("/bulk")
async def register_players_bulk(match_id: str, req: BulkPlayersIn):
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
