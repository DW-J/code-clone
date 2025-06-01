'use client';

interface ButtonProps {
  title: string;
  subtitle: string;
  href: string;
  gradientFrom: string;
  gradientTo: string;
  hoverGradientFrom: string;
  hoverGradientTo: string;
}

interface LandingPageProps {
  id?: string;
  mainTitle: string;
  subTitle: string;
  buttons: ButtonProps[];
  backgroundClassName?: string;
  diagonalLineColor?: string;
}

const Button = ({ title, subtitle, href, gradientFrom, gradientTo, hoverGradientFrom, hoverGradientTo }: ButtonProps) => (
  <a 
    href={href} 
    className={`group relative overflow-hidden rounded-lg bg-gradient-to-r from-${gradientFrom} to-${gradientTo} px-8 py-6 w-72 transition-transform hover:scale-105`}
  >
    <div className={`absolute inset-0 bg-gradient-to-r from-${hoverGradientFrom} to-${hoverGradientTo} transform translate-x-full group-hover:translate-x-0 transition-transform duration-300`} />
    <div className="relative z-10">
      <h3 className="text-2xl font-bold text-white text-center mb-2">{title}</h3>
      <p className="text-white text-center">{subtitle}</p>
    </div>
  </a>
);

export default function LandingPage({
  id = "landing",
  mainTitle = "서울창조경제혁신센터 S.Stage는",
  subTitle = "당신을 기다리고 있습니다.",
  buttons = [
    {
      title: "상시모집",
      subtitle: "스타트업 협업제안",
      href: "#",
      gradientFrom: "pink-600",
      gradientTo: "pink-500",
      hoverGradientFrom: "pink-500",
      hoverGradientTo: "pink-400"
    },
    {
      title: "상시모집",
      subtitle: "대중견기업 협업제안",
      href: "#",
      gradientFrom: "blue-600",
      gradientTo: "blue-500",
      hoverGradientFrom: "blue-500",
      hoverGradientTo: "blue-400"
    }
  ],
  backgroundClassName = "bg-gradient-to-br from-black via-purple-900 to-blue-900",
  diagonalLineColor = "rgba(255,255,255,0.1)"
}: LandingPageProps) {
  return (
    <section 
      id={id} 
      className={`relative w-full min-h-screen ${backgroundClassName} flex flex-col items-center justify-center px-4`}
    >
      {/* 배경 효과 - 대각선 라인 */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{
          background: `linear-gradient(45deg, transparent 45%, ${diagonalLineColor} 45%, ${diagonalLineColor} 55%, transparent 55%)`,
          backgroundSize: '200% 200%',
        }}
      />

      {/* 메인 텍스트 */}
      <div className="text-center mb-20 relative">
        <h1 className="text-3xl md:text-5xl text-white font-bold mb-4">
          {mainTitle}
        </h1>
        <h2 className="text-2xl md:text-4xl text-white font-bold">
          {subTitle}
        </h2>
      </div>

      {/* 버튼 컨테이너 */}
      <div className="flex flex-col md:flex-row gap-6 relative z-10">
        {buttons.map((button, index) => (
          <Button key={index} {...button} />
        ))}
      </div>
    </section>
  );
}

// 사용 예시:
/*
<LandingPage
  id="custom-landing"
  mainTitle="Welcome to Our Platform"
  subTitle="Start Your Journey Today"
  buttons={[
    {
      title: "Get Started",
      subtitle: "For Startups",
      href: "/startups",
      gradientFrom: "green-600",
      gradientTo: "green-500",
      hoverGradientFrom: "green-500",
      hoverGradientTo: "green-400"
    },
    {
      title: "Learn More",
      subtitle: "For Enterprises",
      href: "/enterprise",
      gradientFrom: "indigo-600",
      gradientTo: "indigo-500",
      hoverGradientFrom: "indigo-500",
      hoverGradientTo: "indigo-400"
    }
  ]}
  backgroundClassName="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900"
  diagonalLineColor="rgba(99,102,241,0.1)"
/>
*/ 