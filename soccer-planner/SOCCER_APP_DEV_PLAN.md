# 📅 Jochuk Manager: Development Roadmap (When/How)

이 문서는 프로젝트의 **진행 상황과 미래 계획**을 정의합니다. (기능 명세는 `REQUIREMENTS.md` 참조)

---

## 🟢 Phase 1: Core UX & Reliability (Completed)
- [x] **Next.js & FastAPI 초기 세팅**
- [x] **Supabase DB 이전 및 영속성 확보** (2026-04-03)
- [x] **동적 매치 라우팅 (`/[matchId]`)**
- [x] **AI 자동 배정 로직 v2 (Tactical Affinity)**
- [x] **백엔드 계층형 아키텍처 리팩토링 및 단일화** (2026-04-11)

---

## 🟡 Phase 1.5: Platform & Governance (In-Progress)
*보안과 권한 관리를 통한 플랫폼화 기반 마련*

- [ ] **SNS 로그인 통합 (Supabase Auth)**
    - Google, Kakao 계정 연동 및 유저 식별.
- [ ] **방장(Owner) 권한 보안 강화**
    - 매치 생성자만 수정(DnD, AI 배정) 가능하도록 백엔드 Guard 구현.
- [ ] **데이터 정합성 고도화**
    - 프론트엔드-백엔드 간 포지션 타입 및 상수(Constants) 100% 동기화.

---

## 🔴 Phase 2: User Experience Polish (Next)
- [ ] **포메이션 변경 시 데이터 증발 방지**
    - 변경된 포메이션에 없는 선수는 '대기 명단(SUB)'으로 자동 이동.
- [ ] **모바일 반응형 최적화**
    - 경기장 UI 터치 영역 최적화 및 뷰포트 맞춤형 레이아웃.
- [ ] **공유 기능 안정화**
    - 웹 페이지 캡처 또는 이미지 생성 최적화.

---

## 📂 기술 부채 및 유지보수
- [ ] **TypeScript 엄격화**: `any` 타입 완전 제거 및 도메인 인터페이스 단일화.
- [ ] **테스트 코드 도입**: 핵심 AI 배정 로직에 대한 Pytest 작성.
