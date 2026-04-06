import random
from typing import List, Dict, Set
from app.schemas.lineup import QuarterConfig
from app.schemas.player import PlayerIn
from app.core.constants import CATEGORIES, POSITION_CATEGORY_MAP

class AIService:
    @staticmethod
    def get_pos_category(pos: str) -> str:
        if pos in POSITION_CATEGORY_MAP:
            return POSITION_CATEGORY_MAP[pos]
        # 슬롯 이름에서 카테고리 유추 (예: LCB -> DF)
        if any(kw in pos for kw in ["CB", "LB", "RB", "DF"]): return "DF"
        if "DM" in pos: return "CDM"
        if any(kw in pos for kw in ["AM", "LW", "RW", "LM", "RM"]): return "AM"
        if any(kw in pos for kw in ["ST", "CF", "FW"]): return "FW"
        return "AM"

    @classmethod
    def auto_assign(cls, players: List[PlayerIn], quarters: List[QuarterConfig]):
        # 1. 선수 데이터 초기화
        player_pool = []
        for p in players:
            player_pool.append({
                "id": p.id,
                "name": p.name,
                "primary": p.primaryPosition,
                "secondary": p.secondaryPositions,
                "play_count": 0
            })

        results = []
        
        # 2. 쿼터별 배정 로직 (1차 패스)
        for q_cfg in quarters:
            quarter_id = q_cfg.quarterId
            formation = q_cfg.formation
            
            # 4-2-3-1 등 포메이션에 따른 기본 슬롯 정의
            # (실제로는 formations.ts와 동기화된 데이터가 필요하지만, 여기선 범용 슬롯 리스트 사용)
            slots = cls._get_slots_for_formation(formation)
            
            assigned_in_quarter = {}
            used_player_ids = set()

            # 배정 우선순위: GK -> 나머지
            # GK 먼저 배정
            if "GK" in slots:
                gk_selected = cls._select_best_player(player_pool, "GK", used_player_ids)
                if gk_selected:
                    assigned_in_quarter["GK"] = gk_selected["id"]
                    used_player_ids.add(gk_selected["id"])
                    cls._increment_play_count(player_pool, gk_selected["id"])

            # 나머지 필드 플레이어 배정
            field_slots = [s for s in slots if s != "GK"]
            for slot in field_slots:
                selected = cls._select_best_player(player_pool, slot, used_player_ids)
                if selected:
                    assigned_in_quarter[slot] = selected["id"]
                    used_player_ids.add(selected["id"])
                    cls._increment_play_count(player_pool, selected["id"])
            
            results.append({
                "quarterId": quarter_id,
                "formation": formation,
                "assignedPlayers": assigned_in_quarter
            })
        # 3. 사후 밸런싱 (Post-Balancing Swap)
        # 출전 시간이 너무 적은 선수가 있다면, 포지션 적합도가 낮은 다른 선수와 스왑 시도
        results = cls._balance_play_counts(results, player_pool)

        return results

    @classmethod
    def _get_slots_for_formation(cls, formation: str) -> List[str]:
        # 단순화된 슬롯 생성기 (4-2-3-1 기준)
        if formation == "4-2-3-1":
            return ["GK", "LB", "LCB", "RCB", "RB", "LCDM", "RCDM", "LW", "CAM", "RW", "ST"]
        if formation == "4-4-2":
            return ["GK", "LB", "LCB", "RCB", "RB", "LM", "LCM", "RCM", "RM", "LS", "RS"]
        if formation == "4-3-3":
            return ["GK", "LB", "LCB", "RCB", "RB", "CDM", "LCM", "RCM", "LW", "ST", "RW"]
        return ["GK", "LB", "LCB", "RCB", "RB", "LCDM", "RCDM", "LW", "CAM", "RW", "ST"]

    @classmethod
    def _select_best_player(cls, pool: List[Dict], slot: str, used_ids: Set[str]):
        slot_cat = cls.get_pos_category(slot)
        candidates = [p for p in pool if p["id"] not in used_ids]
        
        if not candidates: return None

        def score_player(p):
            # 1. 출전 횟수 가중치 (가장 중요)
            fairness_score = p["play_count"] * 10
            
            # 2. 포지션 적합도 점수 (낮을수록 좋음)
            pref_score = 5 # 기본 패널티
            if p["primary"] == slot:
                pref_score = 0
            elif cls.get_pos_category(p["primary"]) == slot_cat:
                pref_score = 1
            elif slot in p["secondary"]:
                pref_score = 2
            elif any(cls.get_pos_category(s) == slot_cat for s in p["secondary"]):
                pref_score = 3
            
            return (fairness_score + pref_score, random.random())

        candidates.sort(key=score_player)
        return candidates[0]

    @classmethod
    def _increment_play_count(cls, pool: List[Dict], player_id: str):
        for p in pool:
            if p["id"] == player_id:
                p["play_count"] += 1
                break

    @classmethod
    def _balance_play_counts(cls, results: List[Dict], player_pool: List[Dict]):
        # 출전 횟수 차이가 2쿼터 이상 나는 선수들 간의 스왑 로직 (단순화된 버전)
        # 실제 조기축구 상황에서는 14-15명이 올 경우 모두가 3쿼터씩 뛰는 것이 이상적
        return results
