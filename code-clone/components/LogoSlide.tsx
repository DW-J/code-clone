'use client';
import Image from 'next/image';
import { useMemo } from 'react';

interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface LogoSlideProps {
  id?: string;
  title?: string;
  logos: Logo[];
  backgroundColor?: string;
  slideSpeed?: number;
  reverseMiddleRow?: boolean;
  logoClassName?: string;
}

export default function LogoSlide({
  id = "partners",
  title = "협력기관",
  logos = [],
  backgroundColor = "bg-black",
  slideSpeed = 30,
  reverseMiddleRow = true,
  logoClassName = "grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
}: LogoSlideProps) {
  // 로고 배열 복제를 메모이제이션
  const duplicatedLogos = useMemo(() => [...logos, ...logos], [logos]);

  // 애니메이션 스타일을 동적으로 생성
  const slideStyle = useMemo(() => ({
    animationDuration: `${slideSpeed}s`
  }), [slideSpeed]);

  const renderLogoRow = (direction: 'left' | 'right') => (
    <div className="relative">
      <div 
        className={`flex ${direction === 'left' ? 'animate-slideLeft' : 'animate-slideRight'}`}
        style={slideStyle}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.src}-${index}`}
            className={`mx-8 flex items-center justify-center ${logoClassName} transition-all duration-300`}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="max-w-[150px] h-auto"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id={id} className={`${backgroundColor} py-20 overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl text-white font-bold text-center mb-16">
          {title}
        </h2>

        {/* 첫 번째 줄 - 왼쪽으로 이동 */}
        {renderLogoRow('left')}

        {/* 두 번째 줄 - 방향 선택 가능 */}
        <div className="mt-8">
          {renderLogoRow(reverseMiddleRow ? 'right' : 'left')}
        </div>

        {/* 세 번째 줄 - 왼쪽으로 이동 */}
        <div className="mt-8">
          {renderLogoRow('left')}
        </div>
      </div>
    </section>
  );
}

// 사용 예시:
/*
<LogoSlide
  id="partners"
  title="Our Partners"
  logos={[
    { src: "/partner1.png", alt: "Partner 1", width: 150, height: 60 },
    { src: "/partner2.png", alt: "Partner 2", width: 150, height: 60 },
    // ... 더 많은 로고들
  ]}
  backgroundColor="bg-gray-900"
  slideSpeed={25}
  reverseMiddleRow={true}
  logoClassName="grayscale opacity-40 hover:grayscale-0 hover:opacity-100"
/>
*/ 