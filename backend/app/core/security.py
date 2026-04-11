from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.db.supabase import supabase
from app.core.config import settings

security = HTTPBearer()

async def get_current_user(request: Request, token: HTTPAuthorizationCredentials = Depends(security)):
    """Supabase Auth 토큰을 검증하여 현재 사용자 정보를 반환합니다."""
    try:
        res = supabase.auth.get_user(token.credentials)
        if not res.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="유효하지 않은 토큰입니다.",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return res.user
    except Exception as e:
        print(f"Auth error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="인증에 실패했습니다.",
            headers={"WWW-Authenticate": "Bearer"},
        )

async def verify_match_owner(match_id: str, user = Depends(get_current_user)):
    """현재 사용자가 해당 매치의 방장(Owner)인지 확인합니다."""
    try:
        res = supabase.table("matches").select("owner_id").eq("id", match_id).execute()
        if not res.data:
            raise HTTPException(status_code=404, detail="매치를 찾을 수 없습니다.")
        
        match_owner_id = res.data[0].get("owner_id")
        
        # owner_id가 없거나(레거시 데이터) 일치하지 않는 경우
        if match_owner_id and match_owner_id != user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="이 매치를 수정할 권한이 없습니다. (방장 전용)"
            )
        return True
    except HTTPException:
        raise
    except Exception as e:
        print(f"Ownership check error: {e}")
        raise HTTPException(status_code=500, detail="권한 확인 중 오류 발생")

