import json
import os
import uuid

DB_FILE = "matches_db.json"
MATCH_ID = "match-123"

# 대한민국 국가대표 주요 선수 데이터 (전술적 친밀도 반영)
SEED_PLAYERS = [
    {"name": "손흥민", "primary": "LW", "secondary": ["ST", "RW", "CF"]},
    {"name": "오현규", "primary": "ST", "secondary": ["CF"]},
    {"name": "배준호", "primary": "LM", "secondary": ["AM", "LW"]},
    {"name": "이강인", "primary": "RW", "secondary": ["AM", "RM", "CF"]},
    {"name": "황희찬", "primary": "RW", "secondary": ["LW", "ST"]},
    {"name": "이재성", "primary": "AM", "secondary": ["CM", "RW", "LW"]},
    {"name": "황인범", "primary": "CM", "secondary": ["DM", "AM"]},
    {"name": "백승호", "primary": "DM", "secondary": ["CM"]},
    # {"name": "유상철", "primary": "CM", "secondary": ["CB", "ST", "AM"]}, # 멀티플레이어
    {"name": "김민재", "primary": "CB", "secondary": []},
    {"name": "조유민", "primary": "CB", "secondary": ["DM"]},
    # {"name": "홍명보", "primary": "CB", "secondary": ["DM", "CM"]},
    {"name": "설영우", "primary": "LB", "secondary": ["RB", "LW"]}, # 양발 풀백
    {"name": "김문환", "primary": "RB", "secondary": ["RM"]},
    # {"name": "이영표", "primary": "LB", "secondary": ["RB", "LM"]},
    {"name": "조현우", "primary": "GK", "secondary": []},
    {"name": "김승규", "primary": "GK", "secondary": []},
]

PLAYER_COLORS = [
    "#E53935", "#D81B60", "#8E24AA", "#5E35B1", "#3949AB", 
    "#1E88E5", "#039BE5", "#00ACC1", "#00897B", "#43A047", 
    "#7CB342", "#C0CA33", "#FDD835", "#FFB300", "#FB8C00", 
    "#F4511E", "#6D4C41", "#757575", "#546E7A", "#263238"
]

def seed():
    db = {}
    if os.path.exists(DB_FILE):
        with open(DB_FILE, "r", encoding="utf-8") as f:
            try:
                db = json.load(f)
            except:
                db = {}

    players = []
    for i, p in enumerate(SEED_PLAYERS):
        players.append({
            "id": str(uuid.uuid4()),
            "name": p["name"],
            "primaryPosition": p["primary"],
            "secondaryPositions": p["secondary"],
            "playCount": 0,
            "color": PLAYER_COLORS[i % len(PLAYER_COLORS)]
        })
    
    db[MATCH_ID] = players
    
    with open(DB_FILE, "w", encoding="utf-8") as f:
        json.dump(db, f, ensure_ascii=False, indent=4)
    
    print(f"✅ {len(players)}명의 국가대표 선수 데이터가 '{MATCH_ID}'에 등록되었습니다.")

if __name__ == "__main__":
    seed()
