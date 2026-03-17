'use client';

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Position } from '@/types';
import styles from './Register.module.css';

const ALL_POSITIONS: Position[] = ['GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'LW', 'RW', 'ST'];

export default function PlayerRegisterPage({ params }: { params: Promise<{ matchId: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const matchId = resolvedParams.matchId;

  const [name, setName] = useState('');
  const [primaryPos, setPrimaryPos] = useState<Position | null>(null);
  const [secondaryPos, setSecondaryPos] = useState<Position[]>([]);

  const toggleSecondary = (pos: Position) => {
    if (pos === primaryPos) return;
    setSecondaryPos(prev => 
      prev.includes(pos) ? prev.filter(p => p !== pos) : [...prev, pos]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !primaryPos) {
      alert('이름과 1순위 포지션을 선택해주세요.');
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/matches/${matchId}/players`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          primaryPosition: primaryPos,
          secondaryPositions: secondaryPos,
        }),
      });

      if (!response.ok) throw new Error('등록 실패');
      
      alert(`${name}님, 매치 참여 등록이 완료되었습니다!`);
      router.push('/'); 
    } catch (error) {
      alert('등록 중 오류가 발생했습니다. 서버 상태를 확인하세요.');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>경기 참여 등록</h1>
        <p className={styles.matchIdBadge}>Match ID: {matchId}</p>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <section className={styles.section}>
          <label className={styles.label}>성함</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="본인의 성함을 입력하세요"
            className={styles.input}
            required
          />
        </section>

        <section className={styles.section}>
          <label className={styles.label}>1순위 선호 포지션 (1개)</label>
          <div className={styles.buttonGrid}>
            {ALL_POSITIONS.map(pos => (
              <button
                key={pos}
                type="button"
                className={`${styles.posButton} ${primaryPos === pos ? styles.active : ''}`}
                onClick={() => {
                  setPrimaryPos(pos);
                  setSecondaryPos(prev => prev.filter(p => p !== pos));
                }}
              >
                {pos}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <label className={styles.label}>수행 가능 포지션 (다중 선택)</label>
          <div className={styles.buttonGrid}>
            {ALL_POSITIONS.map(pos => (
              <button
                key={pos}
                type="button"
                className={`${styles.posButton} ${secondaryPos.includes(pos) ? styles.activeSecondary : ''}`}
                disabled={primaryPos === pos}
                onClick={() => toggleSecondary(pos)}
              >
                {pos}
              </button>
            ))}
          </div>
        </section>

        <button type="submit" className={styles.submitButton}>
          매치 참여 신청하기
        </button>
      </form>
    </div>
  );
}

const sectionStyle = {
  marginBottom: '20px'
};
