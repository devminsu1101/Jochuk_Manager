# 🔄 Current Session State (2026-04-11 - FINAL)

## 📍 Baseline: "Auth & Governance System Fixed"
- **Auth**: Supabase Google 로그인 연동 완료.
- **Security**: 백엔드 API 권한 가드(`verify_match_owner`) 및 프론트엔드 `authFetch` 도입 완료.
- **UX**: 방장 권한에 따른 Read-only UI 및 안내 시스템 구축 완료.

## 🎯 Next Objective: "Phase 2 - UI Polish & UX"
1.  **SUB List Logic**: 포메이션 변경 시 배치된 선수가 사라지지 않고 '대기 명단'으로 이동하도록 개선. (최우선)
2.  **Empty State UX**: 선수가 한 명도 없을 때의 가이드 화면 구현.
3.  **Mobile Responsive**: 축구장 UI 및 드래그 영역의 모바일 최적화.

## ⚠️ Handover Notes
- **Architecture**: 모든 API 호출은 `useMatchStore`의 `authFetch`를 통해 인증 토큰을 전달해야 함.
- **Constraints**: 포메이션 변경 시 `assignedPlayers` 데이터를 보존하는 로직을 `useMatchStore.ts`의 `setFormation`에 추가해야 함.
