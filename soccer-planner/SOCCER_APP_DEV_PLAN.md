# [Master Context] Soccer Match Manager: Virtual Agency Project

## 1. Project Vision & Goals
조기축구회 운영자의 고질적인 문제인 '공평한 출전 시간 배분'과 '포지션 배치'를 AI와 직관적인 UI로 해결하는 엔터프라이즈급 관리 솔루션. AI 자동 배정 로직과 드래그 앤 드랍 기반의 직관적인 UI를 결합하여 공정하고 효율적인 팀 운영을 지원합니다.

## 2. Technical Stack & Architecture (Updated: 2026-03-17)
- **Frontend**: Next.js 14+ (App Router), TypeScript, Zustand (State), dnd-kit (D&D Interaction), Vanilla CSS Modules.
- **Backend**: FastAPI (Python 3.10+), Pydantic (Data Validation), Uvicorn (ASGI Server).
- **Communication**: REST API (POST /api/auto-assign), CORS enabled.

## 3. Implementation Status (Current: Phase 4 Complete)

### ✅ Phase 1: Infra & State Management
- Zustand 스토어(`useMatchStore`)를 통한 전역 상태 관리 구축.
- `Player`, `QuarterLineup`, `MatchState` 등 핵심 타입 정의.
- 동일 쿼터 내 중복 배정 방지 로직(Anti-Duplicate)이 스토어 레벨에서 보장됨.

### ✅ Phase 2: UI Layout (Pitch & Sidebar)
- 2x2 그리드 시스템을 통한 4개 쿼터 동시 렌더링.
- CSS Variables 기반의 축구장 테마(Pitch Green) 적용.
- 실시간 참여 통계 사이드바(Participation Stats) 구현.

### ✅ Phase 3: Interaction (D&D & Swap)
- `dnd-kit`을 활용한 고도화된 인터랙션.
    - **Scenario A**: Sidebar -> Pitch (신규 배정)
    - **Scenario B**: Pitch -> Pitch (같은 쿼터 내 위치 이동 및 선수 스왑)
- `DroppableNode`와 `DraggablePlayerNode` 간의 데이터 전송(`playerId`, `fromPositionKey`) 처리.

### ✅ Phase 4: AI Integration
- FastAPI 백엔드 연동 완료.
- **Fairness Algorithm**: 
    1. **누적 출전 횟수(`play_count`)**가 적은 선수 우선 선발.
    2. **포지션 카테고리 매칭** (GK, DF, MF, FW) 가중치 부여.
    3. 1순위 선호 포지션과 차선호 포지션을 점수화하여 최적 슬롯 탐색.

## 4. Technical Deep Dive (For Next Developer)

### A. Zustand Store Structure
```typescript
interface MatchStore {
  players: Player[];
  lineups: QuarterLineup[]; // 4 quarters
  updateLineup: (quarterId, position, playerId) => void; // Handles de-duplication
}
```
`updateLineup`은 새 위치에 선수를 배정할 때, 해당 선수가 같은 쿼터의 다른 위치에 있다면 자동으로 `null` 처리하여 데이터 무결성을 유지합니다.

### B. D&D Data Protocol
- `active.data.current`: 드래그 중인 선수 ID 및 시작 위치 정보.
- `over.data.current`: 드롭 대상인 쿼터 ID 및 포지션 키 정보.
- 스왑 시 `fromPositionKey`가 존재하면 타겟 노드의 선수와 위치를 맞바꾸는 로직이 `page.tsx`에 구현되어 있음.

### C. Backend Logic (FastAPI)
- `get_category()` 함수를 통해 세부 포지션(LCB, RCB 등)을 대분류(DF)로 그룹화하여 매칭 정확도 향상.
- 정렬 점수: `play_count * 10 - (match_score)`. (적게 뛴 것이 가장 중요하며, 선호 포지션 일치가 차순위)

## 5. Remaining Phase: Phase 5 (Refinement)
- **UI/UX Polishing**: 
    - 축구장 잔디 텍스처(Mowing Patterns) 추가.
    - 노드 이동 및 AI 배정 시 애니메이션 효과(Framer Motion 등).
    - 모바일/태블릿 반응형 레이아웃 최적화.
- **Feature Expansion**:
    - 포메이션 변경 기능(4-3-3, 3-5-2 등) 연동.
    - 배정 결과 이미지로 내보내기(Share) 기능.

---
*Last Updated: 2026-03-17 by Gemini CLI*
