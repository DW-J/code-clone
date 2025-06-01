'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface MenuItem {
  label: string;
  href: string;
}

interface HeaderProps {
  logo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  menuItems: MenuItem[];
  stickyClassName?: string;
  nonStickyClassName?: string;
  mobileMenuBgColor?: string;
  showBorder?: boolean;
}

export default function Header({
  logo = {
    src: "/logo.png",
    alt: "Logo",
    width: 120,
    height: 50
  },
  menuItems = [
    { label: "HOME", href: "#hero" },
    { label: "PARTNERS", href: "#partners" },
    { label: "PORTFOLIO", href: "#portfolio" },
    { label: "TIMELINE", href: "#timeline" },
    { label: "CONTACT", href: "#landing" }
  ],
  stickyClassName = "bg-black/80 backdrop-blur-sm",
  nonStickyClassName = "bg-transparent",
  mobileMenuBgColor = "bg-black/95",
  showBorder = true
}: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isSticky ? stickyClassName : nonStickyClassName
      } ${showBorder && isSticky ? 'border-b border-white/10' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* 로고 */}
          <div className="flex-shrink-0">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-auto w-auto"
            />
          </div>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-white hover:text-green-400 transition-colors px-3 py-2 text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <div
          className={`md:hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden ${mobileMenuBgColor}`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-white hover:text-green-400 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

// 사용 예시:
/*
<Header 
  logo={{
    src: "/custom-logo.png",
    alt: "Company Logo",
    width: 150,
    height: 60
  }}
  menuItems={[
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" }
  ]}
  stickyClassName="bg-blue-900/80 backdrop-blur-sm"
  nonStickyClassName="bg-transparent"
  mobileMenuBgColor="bg-blue-900/95"
  showBorder={false}
/>
*/
