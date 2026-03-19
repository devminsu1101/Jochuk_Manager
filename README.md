# [Concept: Project Overview & Engineering Standards] This document defines the project structure and rules. Static unless requested.

# Jochuk Manager (조축 매니저)

조기축구회 운영자의 '공평한 출전 시간 배분'과 '포지션 배치' 문제를 해결하는 축구 라인업 관리 솔루션입니다.

## 🚀 주요 기능

### 1. 지능형 라인업 자동 배정 (AI)
- **포지션 선호도 반영**: 1순위, 2순위 포지션을 고려한 최적의 배치.
- **출전 시간 공평성 보정**: 모든 선수가 균등한 출전 시간을 갖도록 자동 스왑 알고리즘 적용.
- **전술적 호환성**: 포지션 간 친밀도 및 좌우 측면성을 고려한 정교한 배치.

### 2. 드래그 앤 드롭 편집 (DnD)
- **직관적 인터페이스**: 사이드바에서 운동장으로 선수를 드래그하여 배치.
- **포지션 교체**: 운동장 내에 배치된 선수들끼리 드래그하여 포지션 스왑 가능.

### 3. 실시간 동기화 및 관리
- **선수 명단 관리**: 선수 정보 **수정(PUT)** 및 **삭제(DELETE)** 기능.
- **샘플 데이터(샘플)**: 한 번의 클릭으로 15명의 선수 데이터를 즉시 생성 및 백엔드 동기화.
- **멸종(전체 삭제)**: 모든 선수 데이터 및 라인업을 한 번에 초기화.
- **로딩 인터페이스**: 데이터 처리 중 시각적 피드백(스피너) 제공.

### 4. 시각화 및 공유
- **반응형 축구장**: 해상도에 맞춰 잘림 없는 최적화된 레이아웃 제공 (4쿼터 전체 보기 지원).
- **이미지 저장**: 생성된 라인업을 PNG 이미지로 저장하여 팀원들에게 공유.

## 🛠 Engineering Standards

### Git Branch & Merge Strategy
본 프로젝트는 **Merge Commit** 전략을 채택합니다.

*   **Strategy:** `Merge Commit (3-way merge)`
*   **Reasoning:**
    1.  **Contribution Visibility:** 각 커밋의 날짜와 시간을 보존하여 GitHub 잔디(Contribution Graph)를 정확하게 기록합니다.
    2.  **Granular Tracking:** 특정 시점의 고민과 구현 과정을 로그에 남겨 기술적 성장 과정을 세밀하게 추적합니다.
    3.  **Stability over Cleanliness:** 깔끔한 히스토리보다, 성실한 작업량과 구현 과정을 증명하는 데이터 보존을 우선합니다.

### Branch Workflow
1.  `main`: 프로덕션 배포 브랜치
2.  `develop`: 기능 통합 및 테스트 브랜치
3.  `feature/*`: 개별 기능 구현 브랜치 (완료 후 `develop`에 머지)
