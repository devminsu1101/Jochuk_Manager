# [Concept: Project Overview & Engineering Standards] This document defines the project structure and rules. Static unless requested.

# Jochuk Manager (조축 매니저)

조기축구회 운영자의 '공평한 출전 시간 배분'과 '포지션 배치' 문제를 해결하는 축구 라인업 관리 솔루션입니다.

## 🛠 Engineering Standards

### Git Branch & Merge Strategy
본 프로젝트는 혼자 진행하는 프로젝트의 특성과 GitHub 기여도(잔디) 관리를 최적화하기 위해 **Merge Commit** 전략을 채택합니다.

*   **Strategy:** `Merge Commit (3-way merge)`
*   **Reasoning:**
    1.  **Contribution Visibility:** `Squash and Merge`와 달리 각 커밋의 날짜와 시간을 그대로 보존하여 GitHub 잔디(Contribution Graph)를 정확하게 기록합니다.
    2.  **Granular Tracking:** 개인 프로젝트의 성장 과정을 세밀하게 추적하고, 특정 시점의 고민과 구현 과정을 로그에 남깁니다.
    3.  **Stability over Cleanliness:** 팀 프로젝트의 깔끔한 메인 브랜치보다, 개인의 작업량과 성실도를 증명하는 풍부한 히스토리를 우선합니다.

### Branch Workflow
1.  `main`: 프로덕션 배포 브랜치
2.  `develop`: 기능 통합 및 테스트 브랜치
3.  `feature/*`: 개별 기능 구현 브랜치 (완료 후 `develop`에 머지)
