from pydantic import BaseModel
from typing import List, Dict, Optional
from app.schemas.player import PlayerIn

class QuarterConfig(BaseModel):
    quarterId: int
    formation: str

class LineupUpdateIn(BaseModel):
    formation: str
    assignedPlayers: Dict[str, Optional[str]]

class AutoAssignRequest(BaseModel):
    players: List[PlayerIn]
    quarters: List[QuarterConfig]
