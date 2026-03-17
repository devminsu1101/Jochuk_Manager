# [Master Context] Soccer Match Manager: Virtual Agency Project

## 1. Project Vision & Goals
조기축구회 운영자의 고질적인 문제인 '공평한 출전 시간 배분'과 '포지션 배치'를 AI와 직관적인 UI로 해결하는 엔터프라이즈급 관리 솔루션.

## 2. Requirement History (의사결정 이력)
*기획적 의사결정과 요구사항의 변천사입니다.*

*   **Initial:** 쿼터별 라인업 생성 프로그램 개발 제안.
*   **Refinement 1 (Fair Play):** "멀티 포지션이라고 더 뛰는 것이 아니라, 적게 뛰는 사람이 없어야 한다"는 원칙 확립. (최소 출전 시간의 상향 평준화)
*   **Refinement 2 (GK Rule):** GK를 1순위로 선호하는 선수는 4쿼터 내내 참여(필드 또는 GK)할 수 있도록 배려.
*   **Refinement 3 (Preference):** 명단 텍스트 중 맨 앞의 포지션을 '1순위 선호'로 간주.
*   **Refinement 4 (Flexible Strategy):** 쿼터별 가변 포메이션 엔진 요구.
*   **Refinement 5 (Tech Migration):** Next.js + FastAPI 풀스택 아키텍처 및 실시간 D&D 도입 결정.
*   **Refinement 6 (Export & Social):** 결과 이미지 저장 및 초대 링크 기반 플레이어 참여 시스템 도입 결정.
*   **Refinement 7 (Host-Centric):** 호스트(운영자)와 플레이어(참여자)의 권한 분리 및 역할 정의.

## 3. Development History (개발 이력)
*실제로 구현 완료된 기술적 작업 내역입니다.*

### 📅 2026-03-17 (Initial Sprint)
- **Frontend Setup**: Next.js 14, Zustand, Vanilla CSS 환경 구축.
- **Data Model**: `Player`, `QuarterLineup` 인터페이스 및 Zustand 스토어(`useMatchStore`) 구현.
- **UI Layout**: 2x2 축구장 그리드 시스템 및 실시간 통계 사이드바 렌더링.
- **D&D Interaction**: `dnd-kit`을 이용한 선수 배정 및 포지션 스왑(Swap) 로직 완성.
- **Backend AI**: FastAPI 서버 구축 및 공정성 기반 자동 배정 알고리즘 연동 완료.
- **Bug Fix**: 모듈 형식 mismatch(ESM vs CJS) 해결 및 사이드바 버튼 고정 레이아웃 수정.

## 4. Current Implementation Status
- **Current Phase**: Phase 4 Complete (AI Integration)
- **Status**: 핵심 알고리즘 및 드래그 인터랙션 작동 중. 로컬 환경 테스트 완료.

## 5. Future Strategic Roadmap (Phase 5 ~ 8)

### 🚀 Phase 5: Refinement (Polishing)
- 축구장 잔디 텍스처 무늬 및 노드 이동 애니메이션.
- 모바일/태블릿 반응형 UI 최적화.

### 🚀 Phase 6: 플레이어 참여 시스템 (Invitation)
- **주체**: [Fullstack/Backend Agent]
- 고유 초대 링크 발급 및 플레이어 자가 등록 폼(이름/포지션) 구현.

### 🚀 Phase 7: 가변 전술 엔진 (Tactics)
- **주체**: [Frontend UI Agent]
- 쿼터별 포메이션 선택 기능(4-3-3, 3-5-2 등) 및 노드 재배치 로직.

### 🚀 Phase 8: 결과 공유 시스템 (Export)
- **주체**: [Interaction/Export Agent]
- 완성된 4쿼터 라인업을 이미지(PNG)로 캡처하여 다운로드하는 기능.

---

## 6. Technical Stack
- **Frontend**: Next.js, TypeScript, Zustand, dnd-kit
- **Backend**: FastAPI (Python), Uvicorn
- **Storage (Planned)**: Supabase / PostgreSQL (for Phase 6)

---
*Last Updated: 2026-03-17 by Gemini CLI (History Integrity Maintained)*
