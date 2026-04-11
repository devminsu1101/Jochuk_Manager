'use client';

import '@/styles/globals.css'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const checkSession = useAuthStore((state) => state.checkSession);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
