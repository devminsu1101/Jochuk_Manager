# [Concept: Project Overview & Engineering Standards] This document defines the project structure and rules. Static unless requested.

# Jochuk Manager (조축 매니저)

조기축구회 운영자의 '공평한 출전 시간 배분'과 '포지션 배치' 문제를 해결하는 축구 라인업 관리 솔루션입니다.

---

## 🏛 전체 시스템 체계 (System Architecture)

본 프로젝트는 **Frontend (Next.js)**와 **Backend (FastAPI)**로 구성된 분리형 아키텍처를 따릅니다.

### 1. 기술 스택 (Tech Stack)
- **Frontend**: Next.js (App Router), TypeScript, Zustand (State Management), dnd-kit (Drag & Drop), CSS Modules.
- **Backend**: FastAPI (Python), Uvicorn (ASGI Server), Pydantic (Data Validation).
- **Database**: JSON file-based storage (`matches_db.json`) - 프로토타입 단계의 경량화를 위해 채택.

### 2. 시스템 구조
- **Frontend**: 사용자 인터페이스 및 드래그 앤 드롭 로직 담당. Zustand를 통해 전역 상태 관리 및 API 통신 수행.
- **Backend**: RESTful API 제공. 선수 정보 생성, 조회, 수정, 삭제(CRUD) 및 자동 라인업 생성 알고리즘 수행.

---

## 🚀 시작하기 (How to Run)

### 1. Backend 실행 방법
Backend는 Python 기반의 FastAPI로 구동됩니다.

```bash
cd backend

# 1. 가상환경 생성 (최초 1회)
python -m venv venv

# 2. 가상환경 활성화
# macOS/Linux:
source venv/bin/activate
# Windows:
# .\venv\Scripts\activate

# 3. 의존성 설치
pip install -r requirements.txt

# 4. 서버 실행
uvicorn main:app --reload --port 8000

# (선택 사항) 초기 샘플 데이터 생성
# 서버 실행 중 혹은 실행 전, 아래 명령어로 국가대표 선수 데이터를 생성할 수 있습니다.
python seed_players.py
```
- API 문서 확인: `http://localhost:8000/docs`

### 2. Frontend 실행 방법
Frontend는 Next.js 기반으로 구동됩니다.

```bash
cd frontend

# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev
```
- 접속 주소: `http://localhost:3000`

---

## 📋 포팅 매뉴얼 (Porting Manual)

### 환경 요구 사항
- **Node.js**: v18.0.0 이상
- **Python**: v3.9 이상
- **npm**: v9.0.0 이상

### 주요 설정 변경
1. **API URL 설정**: 현재 프론트엔드는 `http://localhost:8000`을 백엔드 주소로 사용합니다. 배포 환경에 따라 프론트엔드 코드 내의 API base URL을 수정해야 합니다.
2. **CORS 설정**: `backend/main.py`의 `CORSMiddleware` 설정에서 허용할 Origin을 운영 환경의 도메인으로 제한해야 합니다.

---

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
