'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 기본적으로 match-123으로 이동 (추후 매치 생성 페이지로 대체 가능)
    router.replace('/match-123');
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' 
    }}>
      <p>매치 정보를 불러오는 중입니다...</p>
    </div>
  );
}
