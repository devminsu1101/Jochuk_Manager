# [Master Context] Soccer Match Manager: Virtual Agency Project

## 1. Project Vision & Goals
조기축구회 운영자의 고질적인 문제인 '공평한 출전 시간 배분'과 '포지션 배치'를 AI와 직관적인 UI로 해결하는 엔터프라이즈급 관리 솔루션.

## 2. Requirement History (의사결정 이력)
*   ... (중략) ...
*   **Refinement 8 (Visual Fix Pending):** 축구장 내 노드 디자인이 현재 텍스트만 남는 현상 발생. 차기 단계에서 고유 컬러 원형 노드로 복구 필요.
*   **Refinement 9 (AI Logic Refinement):** 수비수(DF) 카테고리 세분화 필요. CB(Center Back)와 LB/RB(Side Back)를 구분하여 알고리즘이 배정하도록 개선 예정.
*   **Refinement 10 (Formation Pivot):** 시스템 기본 포메이션을 4-4-2에서 **4-2-3-1**로 변경 결정.

## 3. Development History (개발 이력)

### 📅 2026-03-17 (UI Recovery & 4-2-3-1 Pivot)
- **UI/UX Recovery**: `SoccerPitch.module.css` 중첩 오류 수정 및 `DraggablePlayerNode` 시각화 복구 완료.
- **Formation Pivot (4-2-3-1)**:
    - 시스템 기본 포메이션을 4-2-3-1로 전면 교체 (GK, LB, LCB, RCB, RB, LCDM, RCDM, LW, CAM, RW, ST).
    - 백엔드 `auto-assign` 슬롯 구성 동기화 완료.
- **AI Logic Refinement**:
    - `get_category` 함수 개선을 통한 DF 세분화(CB vs SB) 적용.
    - 선수 등록 페이지(`register/page.tsx`) 내 포지션 선택 및 스타일 버그 수정.
- **Color System Sync**: `ParticipationSidebar`와 `DraggablePlayer` 간의 고유 컬러 데이터 전달 최적화.

## 4. Pending Issues & Next Steps (중요)

### 🚨 우선 해결 과제 (Immediate Tasks)
1. **이미지 저장 품질 검증**: 4-2-3-1 포지션 배치 상태에서 전체 보기 및 개별 쿼터 PNG 저장 시 레이아웃 깨짐 여부 최종 확인.
2. **교체 명단 최적화**: 11명 초과 등록 시, 쿼터별 출전 횟수가 균등하게 배분되는지 알고리즘 테스트.

## 5. Current Implementation Status
- **Status**: 4-2-3-1 시스템 전환 및 UI 복구 완료. 실시간 운영 준비 단계 진입.

---
*Last Updated: 2026-03-17 by Gemini CLI (Phase 6&8 Finalized, 4-2-3-1 Pivot Ready)*
