from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import matches, players, lineups
from app.core.config import settings

app = FastAPI(title="Jochuk Manager API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 구체적인 경로를 가진 라우터를 먼저 등록하여 경로 섀도잉(Shadowing) 방지
app.include_router(players.router)
app.include_router(lineups.router)
app.include_router(matches.router)

@app.get("/")
async def root():
    return {"message": "Jochuk Manager API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.PORT, reload=True)
