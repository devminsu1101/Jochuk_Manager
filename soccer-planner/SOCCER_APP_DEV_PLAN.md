# [Master Context] Soccer Match Manager: Virtual Agency Project

## 1. Project Vision & Goals
조기축구회 운영자의 고질적인 문제인 '공평한 출전 시간 배분'과 '포지션 배치'를 AI와 직관적인 UI로 해결하는 엔터프라이즈급 관리 솔루션.

## 2. Requirement History (의사결정 이력)
*   ... (중략) ...
*   **Refinement 8 (Visual Fix Pending):** 축구장 내 노드 디자인이 현재 텍스트만 남는 현상 발생. 차기 단계에서 고유 컬러 원형 노드로 복구 필요.
*   **Refinement 9 (AI Logic Refinement):** 수비수(DF) 카테고리 세분화 필요. CB(Center Back)와 LB/RB(Side Back)를 구분하여 알고리즘이 배정하도록 개선 예정.
*   **Refinement 10 (Formation Pivot):** 시스템 기본 포메이션을 4-4-2에서 **4-2-3-1**로 변경 결정.

## 3. Development History (개발 이력)

### 📅 2026-03-17 (Initial Sprint & UX Overhaul)
- **Frontend Setup**: Next.js 14, Zustand, Vanilla CSS 환경 구축.
- **Phase 6 & 8 Completion**: 
    - 초대 링크 기반 실시간 플레이어 등록 및 자동 명단 동기화 완료.
    - 현재 뷰(개별/전체)에 따른 지능형 PNG 이미지 저장 기능 구현.
- **Unique Color System**: 이미지 저장 안정성을 위해 아바타 대신 선수별 고유 Hex 컬러 부여 시스템 도입.
- **UI/UX Overhaul**: 
    - 하단 탭 방식 내비게이션 및 중앙 집중식 편집 뷰 도입.
    - '전체 보기(Overall View)' 모드 추가로 4개 쿼터 동시 확인 및 캡처 지원.
    - 사이드바 드래그 시 '컬러 노드'만 움직이도록 인터랙션 고도화.

## 4. Pending Issues & Next Steps (중요)

### 🚨 우선 해결 과제 (Immediate Tasks)
1. **Pitch Node UI 복구**: 현재 축구장 내에서 선수 노드(Circle)가 보이지 않고 텍스트 라벨만 남은 상태. `SoccerPitch.module.css` 및 `DraggablePlayerNode.tsx`의 스타일 우선 복구 필요.
2. **DF 세분화 로직**: 백엔드 `get_category` 함수에서 CB와 LB/RB를 동일한 'DF'로 묶지 말고, 각각 독립된 포지션으로 인식하여 선호도 매칭 정확도 향상.
3. **4-2-3-1 기본값 설정**: `useMatchStore` 초기 상태 및 백엔드 슬롯 구성을 4-2-3-1 포메이션(GK, LB, CB, CB, RB, CDM, CDM, CAM, LW, RW, ST)으로 전면 교체.

## 5. Current Implementation Status
- **Status**: 실시간 모집 및 종합 공유 기능 안정화 완료. 시각적 노드 복구 및 포지션 로직 고도화 단계 진입 대기 중.

---
*Last Updated: 2026-03-17 by Gemini CLI (Phase 6&8 Finalized, 4-2-3-1 Pivot Ready)*
