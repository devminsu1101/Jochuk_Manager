from pydantic import BaseModel
from datetime import date, time
from typing import Optional

class MatchBase(BaseModel):
    title: str
    matchDate: date
    matchTime: time
    isPublic: bool = True

class MatchCreate(MatchBase):
    pass

class MatchOut(MatchBase):
    id: str
    owner_id: Optional[str] = None
    status: str
