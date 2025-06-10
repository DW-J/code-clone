import HeroSection from '@/components/HeroSection';
import LogoSlide from '@/components/LogoSlide';
import PictureSlide from '@/components/PictureSlide';
import TimeLine from '@/components/TimeLine';
import LandingPage from '@/components/LandingPage';
import Header from '@/components/Header';

export default function Home() {
  const timelineItems = [
    {
      date: '25.03.10 - 25.04.04',
      title: '혁신 스타트업 모집',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      )
    },
    {
      date: '25.04.07 - 25.04.16',
      title: '협업 제안 스타트업 1차 검토,\n결과 안내 및 일정 조율\n(각 부서 관련 분야 개별 검토)',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      )
    },
    {
      date: '25.04.17',
      title: '대기업-스타트업 매칭 행사\n* 일정에 따라 변동 가능',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      )
    },
    {
      date: 'AFTER MEET UP',
      title: '1:1 심층 비즈니스 매칭 및\n사업 협력 여부 검토',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      )
    },
    {
      date: 'AFTER MEET UP',
      title: '사업 협력 대상 선정 및 진행\n(기술검증, 협업모델 개발 등)',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      )
    }
  ];

  const landingPageButtons = [
    {
      title: "상시모집",
      subtitle: "스타트업 협업제안",
      href: "/recruitment",
      gradientFrom: "pink-600",
      gradientTo: "pink-500",
      hoverGradientFrom: "pink-500",
      hoverGradientTo: "pink-400"
    },
    {
      title: "상시모집",
      subtitle: "대중견기업 협업제안",
      href: "/enterprise",
      gradientFrom: "blue-600",
      gradientTo: "blue-500",
      hoverGradientFrom: "blue-500",
      hoverGradientTo: "blue-400"
    }
  ];

  const headerConfig = {
    logo: {
      src: "/logo.png",
      alt: "Logo",
      width: 120,
      height: 50
    },
    menuItems: [
      { label: "HOME", href: "#hero" },
      { label: "PARTNERS", href: "#partners" },
      { label: "PORTFOLIO", href: "#portfolio" },
      { label: "TIMELINE", href: "#timeline" },
      { label: "CONTACT", href: "#landing" }
    ],
    stickyClassName: "bg-black/80 backdrop-blur-sm",
    nonStickyClassName: "bg-transparent",
    mobileMenuBgColor: "bg-black/95",
    showBorder: true
  };

  const heroConfig = {
    title: "차원이 다른 오픈 이노베이션\\n스타트업과 함께 성장합니다.",
    subtitle: "혁신적인 스타트업과 함께 성장하는 플랫폼",
    backgroundImage: "/hero-bg.jpg",
    overlayColor: "bg-black/60",
    buttonText: "시작하기",
    buttonLink: "#partners",
    showScrollIndicator: true
  };

  const logoSlideConfig = {
    title: "협력기관",
    backgroundColor: "bg-black",
    slideSpeed: 30,
    reverseMiddleRow: true
  };

  const pictureSlideConfig = {
    slides: [
      {
        date: '20xx.xx',
        category: '카테고리리1',
        title: '활동제목1',
        description: '활동내용1',
        imageSrc: 'https://picsum.photos/800/600?random=1',
        youtubeUrl: 'https://youtube.com'
      },
      {
        date: '20xx.xx',
        category: '카테고리리2',
        title: '활동제목2',
        description: '활동내용2',
        imageSrc: 'https://picsum.photos/800/600?random=2'
      },
      {
        date: '20xx.xx',
        category: '카테고리리3',
        title: '활동제목3',
        description: '활동내용3',
        imageSrc: 'https://picsum.photos/800/600?random=3'
      }
    ],
    backgroundColor: "bg-black",
    transitionDuration: 500
  };

  return (
    <div className="relative">
      <Header {...headerConfig} />
      <main>
        <HeroSection {...heroConfig} />
        <LogoSlide {...logoSlideConfig} />
        <PictureSlide {...pictureSlideConfig} />
        <TimeLine 
          items={timelineItems}
          title="모집일정"
          containerClassName="bg-gradient-to-b from-black to-green-900"
          activeItemBorderColor="border-white"
          inactiveItemBorderColor="border-white/30"
        />
        <LandingPage 
          id="landing"
          mainTitle="서울창조경제혁신센터 S.Stage는"
          subTitle="당신을 기다리고 있습니다."
          buttons={landingPageButtons}
          backgroundClassName="bg-gradient-to-br from-black via-purple-900 to-blue-900"
          diagonalLineColor="rgba(255,255,255,0.1)"
        />
      </main>
    </div>
  );
}
