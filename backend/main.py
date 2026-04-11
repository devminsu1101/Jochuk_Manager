import uvicorn
import os
from app.core.config import settings

# 이 파일은 리팩토링된 app 모듈을 실행하기 위한 단순 래퍼입니다.
# 모든 실제 로직은 backend/app/ 폴더 내에 위치합니다.

if __name__ == "__main__":
    # app.main:app 형식을 사용하여 리팩토링된 FastAPI 인스턴스를 실행합니다.
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.PORT, reload=True)
