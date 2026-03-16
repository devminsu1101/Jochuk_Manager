# [Master Context] Soccer Match Manager: Virtual Agency Project

## 1. Project Vision & Goals
조기축구회 운영자의 고질적인 문제인 '공평한 출전 시간 배분'과 '포지션 배치'를 AI와 직관적인 UI로 해결하는 엔터프라이즈급 관리 솔루션. AI 자동 배정 로직과 드래그 앤 드랍 기반의 직관적인 UI를 결합하여 공정하고 효율적인 팀 운영을 지원합니다.

## 2. Requirement History (의사결정 이력)
*   **Initial:** 쿼터별 라인업 생성 프로그램 개발 제안.
*   **Refinement 1 (Fair Play):** "멀티 포지션이라고 더 뛰는 것이 아니라, 적게 뛰는 사람이 없어야 한다"는 원칙 확립. (최소 출전 시간의 상향 평준화)
*   **Refinement 2 (GK Rule):** GK를 1순위로 선호하는 선수는 경기 운영의 특수성을 고려하여 4쿼터 내내 휴식 없이 참여(필드 또는 GK)할 수 있도록 배려.
*   **Refinement 3 (Preference):** 명단에 나열된 포지션 중 맨 앞의 것을 '1순위 선호'로 간주하고 배정 시 최우선 가중치 부여.
*   **Refinement 4 (Flexible Strategy):** 쿼터별로 서로 다른 포메이션(4-2-3-1, 4-4-2, 3-4-3 등)을 적용할 수 있는 가변 엔진 요구.

## 3. Core Functional Specifications
### A. Participation Management
- 선수는 [성함, 1순위 선호 포지션, 차선호 포지션들] 순서로 입력. (예: `minsu CDM, CB`)
- 입력된 텍스트 데이터를 파싱하여 선수 객체화.

### B. Match Overview & Dashboards
- **Overview Page**: 'Past Matches'와 'Upcoming Matches' 섹션 구분.
- **Match Manager**: 쿼터별 포메이션 설정 및 참여 명단 확정 기능.

### C. Lineup Editor (핵심 UI/UX)
- **Layout**: 2x2 그리드 시스템 (한 화면에 최대 4개 쿼터의 잔디밭 동시 노출).
- **Pitch UI**: 축구장 잔디 텍스처 위에 포메이션에 따른 위치 노드 배치.
- **Player Nodes**: 선수는 동그란 노드로 표현되며 아래에 이름 표기.
- **Drag & Drop**: 
    - 쿼터 내 노드 간 위치 교체(Swap).
    - 잔디밭 위(출전)와 잔디밭 아래(대기) 간의 선수 이동.
- **Real-time Stats (Sidebar)**: 
    - 우측 영역에 전체 명단 표시.
    - 각 선수별 [선호 포지션, 현재 배정된 쿼터 정보, 총 참여 쿼터 수] 실시간 업데이트.

## 4. AI Auto-Assignment Logic (The Algorithm)
1.  **Priority 1 (GK):** GK 1순위 선호자 4/4쿼터 강제 배정.
2.  **Priority 2 (Fairness):** 현재까지 누적 `play_count`가 가장 적은 선수를 다음 쿼터에 최우선 선발.
3.  **Priority 3 (Matching):** 선발된 선수를 1순위 선호 포지션에 우선 배치, 불가 시 차선호 포지션 탐색.
4.  **Priority 4 (Filling):** 가용 포지션이 없을 경우 비어있는 아무 위치에나 배치하여 전체 인원 가동률 최적화.

## 5. Technical Strategy & Stack
- **Frontend**: React + TypeScript + Zustand(State) + dnd-kit(Drag&Drop).
- **Styling**: Vanilla CSS (Custom Pitch Gradients & Circle Nodes).
- **API/Backend**: Python `lineup_generator.py` 로직을 RESTful API(FastAPI/Flask)로 변환하여 통신.
- **State Management**: Zustand - 쿼터 간 선수 이동 시 실시간 통계 동기화.

## 6. Component Architecture
- `App.tsx`: 전체 라우팅 및 전역 상태 관리.
- `MatchDashboard`: 매치 목록(Past/Upcoming) 오버뷰.
- `LineupEditor`: 메인 편집 화면 (Pitch Area + Sidebar).
- `SoccerPitch`: 단일 쿼터 잔디밭 컴포넌트 (노드 배치 로직 포함).
- `PlayerNode`: 드래그 가능한 개별 선수 원형 요소.
- `ParticipationSidebar`: 우측 실시간 통계 및 선수 리스트.

## 7. Development Roadmap
1. **Phase 1 (Infra & Data)**: 데이터 스키마 정의 및 AI 로직 API 전환.
2. **Phase 2 (UI Framework)**: 축구장 레이아웃 및 2x2 그리드 시스템 구축.
3. **Phase 3 (Interaction)**: 드래그 앤 드랍 선수 교체 로직 및 대기 명단 연동.
4. **Phase 4 (AI Integration)**: '자동 배정' 버튼 연동 및 배정 결과 시각화.
5. **Phase 5 (Refinement)**: 디자인 폴리싱 (잔디 텍스처, 노드 애니메이션, 반응형 대응).

## 8. Development Agent Strategy
- **Frontend Agent**: `src/components/Pitch`, `src/components/Sidebar` 등 원자 단위 컴포넌트 개발 및 UI 구현.
- **Backend Agent**: 데이터 퍼시스턴스(JSON/DB) 및 AI 배정 API 구축.
- **Interaction Agent**: 드래그 앤 드랍 시 데이터 동기화 및 유효성 검사 로직 담당.

---
*Last Updated: 2026-03-17*
