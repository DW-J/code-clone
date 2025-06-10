'use client';
import Image from 'next/image';
import { useMemo, useEffect, useState } from 'react';

interface Partner {
  id: number;
  name: string;
  imageUrl: string;
  websiteUrl?: string;
}

interface LogoSlideProps {
  id?: string;
  title?: string;
  backgroundColor?: string;
  slideSpeed?: number;
  reverseMiddleRow?: boolean;
  logoClassName?: string;
}

export default function LogoSlide({
  id = "partners",
  title = "협력기관",
  backgroundColor = "bg-black",
  slideSpeed = 30,
  reverseMiddleRow = true,
  logoClassName = "grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
}: LogoSlideProps) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch('/api/partners');
        if (!response.ok) throw new Error('Failed to fetch partners');
        const data = await response.json();
        setPartners(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load partners');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // 로고 배열 복제를 메모이제이션
  const duplicatedPartners = useMemo(() => [...partners, ...partners], [partners]);

  // 애니메이션 스타일을 동적으로 생성
  const slideStyle = useMemo(() => ({
    animationDuration: `${slideSpeed}s`
  }), [slideSpeed]);

  if (isLoading) return null;
  if (error) return null;
  if (partners.length === 0) return null;

  const renderLogoRow = (direction: 'left' | 'right') => (
    <div className="relative w-full overflow-hidden">
      <div 
        className={`flex justify-center items-center ${direction === 'left' ? 'animate-slideLeft' : 'animate-slideRight'}`}
        style={slideStyle}
      >
        {duplicatedPartners.map((partner, index) => (
          <div
            key={`${partner.id}-${index}`}
            className={`mx-8 flex items-center justify-center min-w-[150px] ${logoClassName} transition-all duration-300`}
          >
            {partner.websiteUrl ? (
              <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer">
                <Image
                  src={partner.imageUrl}
                  alt={partner.name}
                  width={150}
                  height={80}
                  className="max-w-[150px] h-auto"
                  loading="lazy"
                  unoptimized
                />
              </a>
            ) : (
              <Image
                src={partner.imageUrl}
                alt={partner.name}
                width={150}
                height={80}
                className="max-w-[150px] h-auto"
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id={id} className={`py-20 ${backgroundColor} overflow-hidden`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
          {title}
        </h2>
        <div className="space-y-16 w-full">
          {renderLogoRow('left')}
          {reverseMiddleRow && renderLogoRow('right')}
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