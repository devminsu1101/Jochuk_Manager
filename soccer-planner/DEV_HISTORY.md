# [Concept: Immutable Dev History] This document is a record of completed milestones. Append-only.

# 📜 Development History

### 📅 2026-03-17 (UI Recovery & 4-2-3-1 Pivot)
- **UI/UX Recovery**: `SoccerPitch.module.css` 중첩 오류 수정 및 `DraggablePlayerNode` 시각화 복구 완료.
- **Formation Pivot (4-2-3-1)**:
    - 시스템 기본 포메이션을 4-2-3-1로 전면 교체 (GK, LB, LCB, RCB, RB, LCDM, RCDM, LW, CAM, RW, ST).
    - 백엔드 `auto-assign` 슬롯 구성 동기화 완료.
- **AI Logic Refinement**:
    - `get_category` 함수 개선을 통한 DF 세분화(CB vs SB) 적용.
    - 선수 등록 페이지(`register/page.tsx`) 내 포지션 선택 및 스타일 버그 수정.
- **Color System Sync**: `ParticipationSidebar`와 `DraggablePlayer` 간의 고유 컬러 데이터 전달 최적화.

### 📅 2026-03-19 (Project Governance & Branch Strategy)
- **Governance Setup**: `README.md` 생성을 통한 프로젝트 표준 정의.
- **Git Strategy**: `Merge Commit` 전략 공식 채택 및 문서화.
- **Document Refactoring**: 
    - `SOCCER_APP_DEV_PLAN.md` (가변 계획)
    - `DEV_HISTORY.md` (불변 기록)
    - `REQUIREMENTS.md` (불변 기획 및 로드맵)
    - 세 문서로 분리하여 관리 효율성 및 확장성 증대.
