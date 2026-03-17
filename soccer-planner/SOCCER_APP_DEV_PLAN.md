# [Master Context] Soccer Match Manager: Virtual Agency Project

## 1. Project Vision & Goals
조기축구회 운영자의 고질적인 문제인 '공평한 출전 시간 배분'과 '포지션 배치'를 AI와 직관적인 UI로 해결하는 엔터프라이즈급 관리 솔루션.

## 2. Requirement History (의사결정 이력)
*   ... (중략) ...
*   **Refinement 6 (Export & Social):** 배정 결과를 이미지로 저장하여 단톡방에 공유하는 기능 및 플레이어 참여 시스템(초대 링크) 도입 결정.
*   **Refinement 7 (Host-Centric):** 호스트가 쿼터별 전술(포메이션)을 주도적으로 설정하되, 플레이어는 데이터 입력에 참여하는 분업 구조 확립.

## 3. New Strategic Roadmap: Phase 6 ~ 8

### 🚀 Phase 6: 플레이어 참여 시스템 (Invitation & Registration)
- **목표**: 호스트의 수동 입력을 없애고, 선수가 직접 정보를 입력하는 협업 모델 구축.
- **상세 계획**:
    1. **초대 링크 생성**: 특정 매치에 대한 고유 URL 발급.
    2. **참여 폼(Form)**: 선수가 접속하여 [이름, 1순위 포지션, 차순위 포지션] 선택.
    3. **데이터 퍼시스턴스**: 입력된 데이터의 백엔드(DB) 저장 및 호스트 대시보드 실시간 반영.
- **담당 주체**: **[Fullstack/Backend Agent]** - DB 스키마 설계 및 초대 시스템 API 구축 담당.

### 🚀 Phase 7: 가변 전술 엔진 (Dynamic Tactical Control)
- **목표**: 호스트가 각 쿼터의 성격에 맞춰 포메이션을 자유롭게 변경.
- **상세 계획**:
    1. **포메이션 셀렉터**: 각 쿼터 카드 상단에 드롭다운 메뉴 추가 (4-4-2, 4-3-3, 3-5-2 등).
    2. **실시간 리렌더링**: 포메이션 변경 시 노드 위치의 즉각적 이동 및 AI 배정 슬롯 업데이트.
- **담당 주체**: **[Frontend UI Agent]** - 전술 선택 UI 및 노드 배치 로직 고도화 담당.

### 🚀 Phase 8: 결과 공유 시스템 (Image Export)
- **목표**: 완성된 라인업을 이미지 파일(PNG/JPG)로 저장하여 공유 편의성 극대화.
- **상세 계획**:
    1. **HTML-to-Image**: `dom-to-image` 또는 `html-to-image` 라이브러리를 이용한 2x2 그리드 캡처.
    2. **공유용 워터마크**: 매치 날짜, 팀명 등이 포함된 정돈된 레이아웃 생성.
- **담당 주체**: **[Interaction/Export Agent]** - 클라이언트 사이드 이미지 생성 및 다운로드 로직 담당.

---

## 4. Technical Stack Expansion
- **Database**: PostgreSQL (Supabase/Prisma) - 매치 정보 및 선수 등록 데이터 저장.
- **Auth**: NextAuth.js (SNS 로그인 대비) - 추후 호스트 권한 관리용.
- **Export Library**: `html-to-image` - 브라우저 내 이미지 렌더링.

---
*Last Updated: 2026-03-17 by Gemini CLI (Plan Expanded)*
