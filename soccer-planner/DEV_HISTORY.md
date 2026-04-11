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

    ### 📅 2026-04-03 (Infra & Multi-Tenancy Foundation)
    - **Database Migration (Supabase)**:
        - JSON 파일 기반 저장소에서 Supabase(PostgreSQL)로 데이터 레이어 전면 이전.
        - 데이터 영속성 확보를 통해 서버 재시작 시에도 선수 및 매치 데이터 보존.
    - **Match ID Dynamic Routing**:
        - 하드코딩된 'match-123' 제거 및 URL 파라미터 기반 동적 라우팅(`/[matchId]`) 구현.
        - Zustand Store 내 `matchId` 상태 관리를 통한 멀티 매치(Multi-match) 지원 기반 마련.
        - **Security & Env Management**:
        - Supabase API Key 및 백엔드 URL을 `.env`로 분리하여 보안 및 환경 설정 유연성 강화.

        ### 📅 2026-04-03 (Part 2: Discovery Hub & Platform Expansion)
        - **Discovery Hub (Overview Page)**:
        - 루트 페이지(`/`)를 검색 가능한 공개 매치 대시보드로 전면 개편.
        - Lucide-react 아이콘을 활용한 세련된 UI 및 매치 리스트 카드 설계.
        - **Match Scheduling & Management**:
        - 매치 생성 시 제목, 날짜, 시간 정보를 입력받아 DB에 실시간 저장하는 모달 기반 흐름 구축.
        - UUID 기반 짧은 고유 ID 발급 시스템 도입.
        - **Backend API Expansion**:
        - 매치 리스트 검색 필터링 및 상세 조회 엔드포인트 구현.
        - Pydantic 모델 고도화를 통해 날짜/시간 데이터 유효성 검증 강화.
        - **Frontend Dependency Update**:
        - `@supabase/supabase-js`, `lucide-react` 패키지 설치를 통해 향후 Auth 연동 기반 마련.


### 📅 2026-04-06 (Backend Refactoring & Lineup Persistence)
- **Backend Architecture Overhaul (Layered Architecture)**:
    - `main.py` 중심의 모놀리식 구조에서 `Controller-Service-DTO-Repository` 계층형 아키텍처로 전면 리팩토링.
    - FastAPI `APIRouter`를 활용한 도메인별(Match, Player, Lineup) 엔드포인트 분리 및 가독성 증대.
- **Bulk Lineup Persistence & Logic Recovery**:
    - 4개 쿼터 라인업을 한 번에 저장하는 `Bulk Save API` 구현을 통해 데이터 유실 방지 및 네트워크 부하 감소.
    - 유실되었던 AI 자동 배정 로직(v2: Tactical Affinity & Play-count Balancing) 복구 및 `AIService` 이식.
    - Supabase `lineups` 테이블 스키마 정규화 및 `quarter_id` 기반 유니크 제약 조건 적용.
- **UX/UI Stability**:
    - Trailing Slash(/)로 인한 307 리다이렉트 문제 해결 및 `DELETE` 메소드 허용 정책 수정.
    - 참여 선수 부재 시에도 항상 축구장 코트를 노출하도록 UI 단순화.

### 📅 2026-04-11 (Context Harnessing & Session Reset)
- **The Great Reset**: 이전 세션의 불안정한 변경 사항을 전체 롤백하고 `2026-04-06` 시점으로 프로젝트 상태 복구.
- **Context Harness System Implementation**:
    - `GEMINI.md` (Project Constitution) 도입을 통한 기술 스택 및 아키텍처 가이드라인 고정.
    - `SESSION_STATE.md` (Handover Protocol) 구축을 통해 세션 간 작업 연속성 확보.
- **Governance Reinforcement**: "베테랑 총무" 페르소나와 데이터 기반 공정성 원칙 재정립.

### 📅 2026-04-11 (Backend Unification & System Optimization)
- **Backend Entry-Point Unification**: 
    - 루트 `backend/main.py`를 `app/main.py`의 래퍼로 교체하여 계층형 아키텍처(Router-Service-DTO) 강제화.
- **Tactical Constants Centralization**:
    - `constants.py`에 포메이션 슬롯 정의(4-2-3-1, 3-5-2 등)를 중앙 집중화하여 AI 배정 로직의 확장성 확보.
- **Frontend Store & Type Refinement**:
    - `useMatchStore.ts` 내 API 호출 로직 최적화 및 `API_BASE_URL` 중앙 관리 도입.
    - `types/index.ts`에 전술 포지션 명단 및 매치 도메인 모델 추가.
- **Error Handling & UX**: API 호출 시 예외 처리 강화 및 샘플 데이터 등록 피드백 속도 최적화.

### 📅 2026-04-11 (Phase 1.5: Auth & Governance Completed)
- **Supabase Auth Integration**: 
    - `useAuthStore` 및 Google OAuth 연동을 통한 사용자 인증 시스템 구축.
    - 프론트엔드 환경 변수 동기화 및 방어적 초기화 로직 적용.
- **Match Ownership & Security**:
    - 백엔드 `verify_match_owner` 가드 구현으로 방장 전용 수정 권한 강제화.
    - 매치 생성 시 `owner_id` 기록 및 API 레벨 권한 검증 적용.
- **Read-only UI Implementation**:
    - 방장이 아닌 사용자를 위한 "읽기 전용 모드" 배너 및 태그 추가.
    - 권한에 따른 드래그 앤 드랍 비활성화 및 관리 버튼 노출 제어.



