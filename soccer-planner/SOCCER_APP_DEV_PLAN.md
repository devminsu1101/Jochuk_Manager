# [Master Context] Soccer Match Manager: Virtual Agency Project

## 1. Project Vision & Goals
조기축구회 운영자의 고질적인 문제인 '공평한 출전 시간 배분'과 '포지션 배치'를 AI와 직관적인 UI로 해결하는 엔터프라이즈급 관리 솔루션. AI 자동 배정 로직과 드래그 앤 드랍 기반의 직관적인 UI를 결합하여 공정하고 효율적인 팀 운영을 지원합니다.

## 2. Requirement History (의사결정 이력)
*   **Initial:** 쿼터별 라인업 생성 프로그램 개발 제안.
*   **Refinement 1 (Fair Play):** "멀티 포지션이라고 더 뛰는 것이 아니라, 적게 뛰는 사람이 없어야 한다"는 원칙 확립. (최소 출전 시간의 상향 평준화)
*   **Refinement 2 (GK Rule):** GK를 1순위로 선호하는 선수는 경기 운영의 특수성을 고려하여 4쿼터 내내 휴식 없이 참여(필드 또는 GK)할 수 있도록 배려.
*   **Refinement 3 (Preference):** 명단에 나열된 포지션 중 맨 앞의 것을 '1순위 선호'로 간주하고 배정 시 최우선 가중치 부여.
*   **Refinement 4 (Flexible Strategy):** 쿼터별로 서로 다른 포메이션(4-2-3-1, 4-4-2, 3-4-3 등)을 적용할 수 있는 가변 엔진 요구.
*   **Refinement 5 (Tech Migration):** 초기 Python 스크립트 기반에서 Next.js(App Router) + FastAPI 풀스택 아키텍처로 전환 및 실시간 D&D 인터랙션 도입.

## 3. Technical Stack & Architecture (Updated: 2026-03-17)
- **Frontend**: Next.js 14, TypeScript, Zustand, dnd-kit, Vanilla CSS Modules.
- **Backend**: FastAPI (Python), Pydantic, Uvicorn.
- **Core Logic**: Fairness-based AI Assignment Algorithm.

## 4. Implementation Status (Current: Phase 4 Complete)

### ✅ Phase 1: Infra & Data Schema
- Zustand를 이용한 전역 상태(`useMatchStore`) 및 타입 정의.
- 동일 쿼터 내 중복 배정 방지 로직 구현.

### ✅ Phase 2: UI Framework
- 2x2 축구장 그리드 및 포지션 노드 배치 알고리즘 시각화.
- 실시간 참여 통계 사이드바 연동.

### ✅ Phase 3: Advanced Interaction
- `dnd-kit` 기반의 드래그 앤 드랍 (사이드바 -> 노드, 노드 <-> 노드 스왑) 구현.

### ✅ Phase 4: AI & Backend Integration
- FastAPI 백엔드 구축 및 공정성 알고리즘 API 연동 완료.
- 누적 출전 횟수와 포지션 선호도를 가중치로 한 자동 배정 기능 탑재.

## 5. Technical Deep Dive
- **State Integrity**: `updateLineup` 함수가 사이드 이펙트를 최소화하며 선수 위치 정보를 관리.
- **D&D Protocol**: `fromPositionKey` 유무에 따른 배정/스왑 로직 분기 처리.
- **Fairness Logic**: `play_count` 가중치(10x)를 통해 최소 출전 시간 보장 원칙 준수.

## 6. Future Roadmap (Phase 5)
- UI/UX 폴리싱 (잔디 텍스처, 애니메이션).
- 다이나믹 포메이션 변경 시스템 구축.
- 배정 결과 이미지 내보내기 기능.

---
*Last Updated: 2026-03-17 by Gemini CLI (History Restored)*
