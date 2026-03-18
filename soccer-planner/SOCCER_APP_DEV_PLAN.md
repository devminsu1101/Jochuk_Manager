# [Concept: Future Development Plan] This document tracks upcoming features and goals. Subject to frequent updates.

# 📅 Future Development Roadmap

## 1. 데이터 레이어 고도화 (Data Persistence)
- [ ] **DB 전환**: 현재 JSON 파일 방식에서 SQLite 또는 PostgreSQL로 전환하여 데이터 안정성 확보.
- [ ] **ORM 도입**: SQLAlchemy 등을 활용한 백엔드 모델 구조 개선.

## 2. 이미지 저장 및 UX 최적화
- [ ] **Canvas 렌더링 검증**: 다양한 해상도에서 `html-to-image` 저장 시 레이아웃 깨짐 방지.
- [ ] **드래그 앤 드롭 개선**: 터치 디바이스(모바일) 환경에서의 조작감 최적화.

## 3. 알고리즘 정교화 (AI Logic)
- [ ] **선호 포지션 가중치**: 선수의 1순위/2순위 포지션 만족도를 수치화하여 배정 로직에 반영.
- [ ] **체력 관리 로직**: 연속 쿼터 출전 제한 옵션 추가.

## 4. 사용자 인증 및 다중 매치 관리
- [ ] **로그인 시스템**: 회원가입 및 관리자별 매치 데이터 분리.
- [ ] **공유 기능**: 생성된 라인업을 URL이나 링크로 팀원들에게 즉시 공유.
