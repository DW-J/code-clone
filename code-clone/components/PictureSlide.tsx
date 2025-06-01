'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

interface Slide {
  date: string;
  category: string;
  title: string;
  description?: string;
  imageSrc: string;
  youtubeUrl?: string;
}

interface PictureSlideProps {
  id?: string;
  slides?: Slide[];
  backgroundColor?: string;
  transitionDuration?: number;
}

export default function PictureSlide({
  id = "portfolio",
  slides = [
    {
      date: '2024.03.10',
      category: '프로그램 소개',
      title: '혁신적인 기술과 아이디어로',
      description: '스타트업의 성장을 이끌어내는 협력 프로그램을 운영합니다.',
      imageSrc: '/slide1.jpg',
      youtubeUrl: '#'
    },
    {
      date: '2024.03.15',
      category: '멘토링',
      title: '다양한 분야의 전문가들과',
      description: '함께하는 멘토링과 네트워킹 기회를 제공합니다.',
      imageSrc: '/slide2.jpg'
    },
    {
      date: '2024.03.20',
      category: '글로벌',
      title: '글로벌 시장 진출을 위한',
      description: '맞춤형 지원 프로그램을 운영합니다.',
      imageSrc: '/slide3.jpg'
    }
  ],
  backgroundColor = "bg-black",
  transitionDuration = 500
}: PictureSlideProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePrevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), transitionDuration);
  }, [isAnimating, slides.length, transitionDuration]);

  const handleNextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), transitionDuration);
  }, [isAnimating, slides.length, transitionDuration]);

  // 키보드 네비게이션
  useEffect(() => {
    if (!isMounted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevSlide();
      } else if (e.key === 'ArrowRight') {
        handleNextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSlide, handlePrevSlide, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <section 
      ref={sectionRef}
      id={id} 
      className={`relative w-full min-h-screen ${backgroundColor} py-20 px-4 overflow-hidden`}
      role="region"
      aria-roledescription="carousel"
      aria-label="프로젝트 슬라이드쇼"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* 왼쪽: 텍스트 영역 */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="text-white text-lg">{slide.date}</span>
                      <span className="text-red-500 font-bold">━</span>
                      <span className="text-white text-lg">{slide.category}</span>
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-4xl md:text-5xl text-white font-bold">{slide.title}</h2>
                      {slide.description && (
                        <p className="text-xl text-gray-300 mt-4">{slide.description}</p>
                      )}
                    </div>
                    {/* Play Youtube 버튼 */}
                    {slide.youtubeUrl && (
                      <a 
                        href={slide.youtubeUrl}
                        className="flex items-center gap-4 mt-8 group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="w-16 h-16 rounded-full bg-pink-600 flex items-center justify-center group-hover:bg-pink-700 transition-colors">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                        </div>
                        <span className="text-white text-xl">Play Youtube</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 오른쪽: 이미지 영역 */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div 
                  key={index}
                  className="w-full flex-shrink-0 relative"
                  style={{ aspectRatio: '4/3' }}
                >
                  <Image
                    src={slide.imageSrc}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 좌우 네비게이션 버튼 */}
        <button 
          onClick={handlePrevSlide}
          disabled={isAnimating}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-white/40 transition-colors disabled:opacity-50 z-10"
          aria-label="이전 슬라이드"
        >
          <span className="text-white/20 text-2xl">&lt;</span>
        </button>
        <button 
          onClick={handleNextSlide}
          disabled={isAnimating}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-white/40 transition-colors disabled:opacity-50 z-10"
          aria-label="다음 슬라이드"
        >
          <span className="text-white/20 text-2xl">&gt;</span>
        </button>
      </div>
    </section>
  );
}

// 사용 예시:
/*
<PictureSlide
  id="portfolio"
  slides={[
    {
      date: '2024.03.10',
      category: '프로그램',
      title: '혁신 프로그램',
      description: '혁신적인 기술 프로그램을 소개합니다.',
      imageSrc: '/program1.jpg',
      youtubeUrl: 'https://youtube.com/...'
    },
    // ... 더 많은 슬라이드
  ]}
  backgroundColor="bg-gray-900"
  transitionDuration={500}
/>
*/ 