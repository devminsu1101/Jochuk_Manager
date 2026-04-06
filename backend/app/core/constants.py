PLAYER_COLORS = [
    "#E53935", "#D81B60", "#8E24AA", "#5E35B1", "#3949AB", 
    "#1E88E5", "#039BE5", "#00ACC1", "#00897B", "#43A047", 
    "#7CB342", "#C0CA33", "#FDD835", "#FFB300", "#FB8C00", 
    "#F4511E", "#6D4C41", "#757575", "#546E7A", "#263238"
]

CATEGORIES = {
    "GK": ["GK"],
    "DF": ["LB", "LCB", "CB", "RCB", "RB", "LWB", "RWB"],
    "CDM": ["LCDM", "CDM", "RCDM", "CM"],
    "AM": ["LW", "CAM", "RW", "LM", "RM"],
    "FW": ["ST", "CF", "LS", "RS"]
}

# 포지션별 전술적 친밀도 맵 (더 정교한 AI 배정용)
# 주 포지션 외에도 해당 카테고리에 속하는지 여부를 판단하기 위함
POSITION_CATEGORY_MAP = {
    "GK": "GK",
    "LB": "DF", "LCB": "DF", "CB": "DF", "RCB": "DF", "RB": "DF", "LWB": "DF", "RWB": "DF",
    "LCDM": "CDM", "CDM": "CDM", "RCDM": "CDM", "CM": "CDM",
    "LW": "AM", "CAM": "AM", "RW": "AM", "LM": "AM", "RM": "AM",
    "ST": "FW", "CF": "FW", "LS": "FW", "RS": "FW"
}
