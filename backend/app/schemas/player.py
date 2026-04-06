from pydantic import BaseModel
from typing import List, Optional

class PlayerBase(BaseModel):
    name: str
    primaryPosition: str
    secondaryPositions: List[str]

class PlayerIn(PlayerBase):
    id: Optional[str] = None

class BulkPlayersIn(BaseModel):
    players: List[PlayerIn]

class PlayerOut(PlayerBase):
    id: str
    playCount: int
    color: str
