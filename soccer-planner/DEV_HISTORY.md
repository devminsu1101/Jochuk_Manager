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

### 📅 2026-03-19 (AI Auto-Assignment Logic Overhaul)
- **Affinity-Based Matching**: 포지션 간 '전술적 친밀도' 개념을 도입하여 단순 카테고리 매칭을 넘어선 지능형 배정 로직 구축.
    - 좌우 측면성(Left/Right)을 엄격히 구분하여 RB가 LB보다 RM에 가깝게 배정되도록 개선.
    - CF(센터 포워드)가 ST와 AM 양쪽 역할을 수행할 수 있도록 유연성 부여.
- **Robust Post-Balancing Swap**: 배정 완료 후 출전 시간이 2쿼터 이상 차이 나는 선수들을 대상으로 자동 스왑 실시.
    - 필드 플레이어 전원의 출전 시간을 3~4쿼터(14인 기준)로 균등화하는 최적화 알고리즘 적용.
    - 골키퍼 그룹 분리를 통한 알고리즘 안정성 확보.
- **Seed Data Generation**: 국가대표 17명(손흥민, 이강인 등) 데이터 스크립트(`seed_players.py`) 제작을 통한 로직 검증 환경 구축.

### 📅 2026-03-19 (UI/UX Refinement & Data Sync)
- **Data Synchronization Overhaul**:
    - 백엔드 벌크 등록 API(`POST /api/matches/match-123/players/bulk`) 추가를 통해 샘플 데이터를 실제 DB(JSON)와 동기화.
    - 프론트엔드 폴링(Polling) 시 데이터 유실 문제 원인 규명 및 로직 수정 완료.
- **Player Management (CRUD)**:
    - 사이드바 내 점 3개(⋮) 메뉴를 통한 선수 정보 **수정(PUT)** 및 **삭제(DELETE)** 기능 구현.
    - **샘플(Sample)** 버튼: 15명의 국가대표 데이터를 백엔드에 즉시 등록.
    - **멸종(Extinction)** 버튼: 모든 선수 및 라인업 데이터를 한 번에 초기화하는 전체 삭제 기능 구현.
- **UX/UI Improvements**:
    - **Loading Overlay**: 데이터 등록/삭제 시 스피너와 메시지를 포함한 로딩 상태 시각화.
    - **Responsive Pitch**: `aspect-ratio` 및 `flex` 설정을 최적화하여 4쿼터 전체 보기 모드에서도 잘림 없는 축구장 레이아웃 구현.
    - **Icon Layout Fix**: 선수 카드 내 점 3개 아이콘과 텍스트 간의 겹침 현상을 Flex 레이아웃으로 해결.
