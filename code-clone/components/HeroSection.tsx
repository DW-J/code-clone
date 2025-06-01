'use client';

interface HeroSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  overlayColor?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonClassName?: string;
  showScrollIndicator?: boolean;
}

export default function HeroSection({
  id = "hero",
  title = "Innovation Hub for Startups",
  subtitle = "혁신적인 스타트업과 함께 성장하는 플랫폼",
  backgroundImage = "/hero-bg.jpg",
  overlayColor = "bg-black/50",
  buttonText = "시작하기",
  buttonLink = "#partners",
  buttonClassName = "bg-green-500 hover:bg-green-600",
  showScrollIndicator = true
}: HeroSectionProps) {
  // 줄바꿈 문자를 기준으로 텍스트를 분리
  const titleLines = title.split('\\n').map(line => line.trim());

  return (
    <section id={id} className="relative w-full h-screen">
      {/* 배경 이미지 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* 오버레이 */}
      <div className={`absolute inset-0 ${overlayColor}`} />

      {/* 컨텐츠 */}
      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {titleLines.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl mb-12 max-w-3xl">
            {subtitle}
          </p>
        )}
        {buttonText && (
          <a
            href={buttonLink}
            className={`${buttonClassName} text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-300`}
          >
            {buttonText}
          </a>
        )}
      </div>

      {/* 스크롤 인디케이터 */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      )}
    </section>
  );
}

// 사용 예시:
/*
<HeroSection
  id="main-hero"
  title="Welcome to the Future\nDiscover Tomorrow Today"
  subtitle="Discover innovative solutions for your business"
  backgroundImage="/custom-bg.jpg"
  overlayColor="bg-blue-900/60"
  buttonText="Get Started"
  buttonLink="#services"
  buttonClassName="bg-blue-500 hover:bg-blue-600"
  showScrollIndicator={true}
/>
*/ 