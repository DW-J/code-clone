'use client';
import { useState, useEffect } from 'react';

// 타입 정의
interface TimelineItem {
  date: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  title?: string;
  containerClassName?: string;
  activeItemBorderColor?: string;
  inactiveItemBorderColor?: string;
  arrowIcon?: React.ReactNode;
  autoPlayInterval?: number; // 밀리초 단위
  initialActiveIndex?: number;
}

export default function TimeLine({
  items,
  title = "타임라인",
  containerClassName = "bg-gradient-to-b from-black to-green-900",
  activeItemBorderColor = "border-white",
  inactiveItemBorderColor = "border-white/30",
  arrowIcon = "➜",
  autoPlayInterval = 3000,
  initialActiveIndex = 0,
}: TimelineProps) {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [items.length, autoPlayInterval]);

  return (
    <section 
      id="timeline" 
      className={`relative w-full min-h-screen pt-32 pb-20 px-4 ${containerClassName}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* 제목 */}
        <h2 className="text-4xl md:text-5xl text-white font-bold text-center mb-20">
          {title}
        </h2>

        {/* 타임라인 */}
        <div className="relative">
          {/* 타임라인 아이템들 */}
          <div className="flex flex-col md:flex-row justify-between items-stretch gap-8 md:gap-4">
            {items.map((item, index) => (
              <div key={index} className="flex items-center w-full">
                <div className="w-full md:w-full">
                  <div 
                    className={`h-[320px] p-4 rounded-lg transition-all duration-500 border flex flex-col justify-between ${
                      activeIndex === index 
                        ? `${activeItemBorderColor} border-4` 
                        : `${inactiveItemBorderColor} border`
                    }`}
                  >
                    <div className="flex flex-col items-center h-full">
                      <div className="w-24 h-24 bg-green-500/10 rounded-lg border border-green-500/20 flex items-center justify-center mb-4">
                        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {item.icon}
                        </svg>
                      </div>
                      <div className="text-green-400 font-semibold text-center mb-2">
                        {item.date}
                      </div>
                      <div className="text-white text-center whitespace-pre-line">
                        {item.title}
                        {item.description && (
                          <div className="mt-2 text-sm text-gray-300">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {index < items.length - 1 && (
                  <div className="hidden md:block text-green-500 text-2xl px-4">
                    {arrowIcon}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 사용 예시:
/*
const timelineItems = [
  {
    date: '25.03.10 - 25.04.04',
    title: '혁신 스타트업 모집',
    icon: <path d="..." />,
  },
  // ... 더 많은 아이템들
];

<TimeLine 
  items={timelineItems}
  title="모집일정"
  containerClassName="bg-gradient-to-b from-black to-blue-900"
  activeItemBorderColor="border-blue-400"
  inactiveItemBorderColor="border-blue-200/30"
  arrowIcon="→"
  autoPlayInterval={5000}
/>
*/ 