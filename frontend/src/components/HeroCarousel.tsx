'use client';

import React, { useState, useEffect } from 'react';
import styles from './HeroCarousel.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  badge: string;
  bgColor: string;
  image?: string;
}

const ITEMS: CarouselItem[] = [
  {
    id: 1,
    badge: 'NEW',
    title: 'AI 자동 라인업 배정 v2.0',
    description: '전술적 친밀도를 분석하여 더 공정하고 지능적인 라인업을 짜드립니다.',
    bgColor: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)'
  },
  {
    id: 2,
    badge: 'GUIDE',
    title: '동호회 총무님의 필수 앱',
    description: '명단 관리부터 라인업 공유까지, 이제 카톡으로 고생하지 마세요.',
    bgColor: 'linear-gradient(135deg, #065f46 0%, #047857 100%)'
  },
  {
    id: 3,
    badge: 'UPDATE',
    title: '모바일 최적화 완료',
    description: '언제 어디서나 스마트폰으로 간편하게 매치를 관리하고 공유하세요.',
    bgColor: 'linear-gradient(135deg, #7c2d12 0%, #9a3412 100%)'
  }
];

export const HeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % ITEMS.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? ITEMS.length - 1 : prev - 1));

  return (
    <div className={styles.carouselContainer}>
      <div 
        className={styles.slideWrapper} 
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {ITEMS.map((item) => (
          <div 
            key={item.id} 
            className={styles.slide}
            style={{ background: item.bgColor }}
          >
            <div className={styles.slideContent}>
              <span className={styles.badge}>{item.badge}</span>
              <h2 className={styles.title}>{item.title}</h2>
              <p className={styles.description}>{item.description}</p>
              <button className={styles.ctaButton}>자세히 보기</button>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.navBtnPrev} onClick={prevSlide}>
        <ChevronLeft size={24} />
      </button>
      <button className={styles.navBtnNext} onClick={nextSlide}>
        <ChevronRight size={24} />
      </button>

      <div className={styles.dots}>
        {ITEMS.map((_, idx) => (
          <div 
            key={idx} 
            className={`${styles.dot} ${idx === current ? styles.activeDot : ''}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
};
