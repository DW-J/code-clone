import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
        
        {/* 상시모집 섹션 */}
        <section className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-lg shadow-sm mb-12">
          <h2 className="text-2xl font-bold mb-4">상시모집</h2>
          <p className="text-gray-600 mb-6">
            서울창조경제혁신센터의 오픈 이노베이션 프로그램에 참여를 희망하는 
            스타트업을 상시 모집합니다.
          </p>
          <Link
            href="/recruitment"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            지원하기
          </Link>
        </section>

        {/* 연락처 정보 */}
        <section className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">주소</h3>
              <p className="text-gray-600">
                04378 서울시 용산구 한강대로 69<br />
                (한강로2가, 용산푸르지오써밋) 102동 5층<br />
                서울창조경제혁신센터
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">문의</h3>
              <p className="text-gray-600">
                이지원 매니저<br />
                Tel: 02-749-9446<br />
                Email: jwlee@ccei.kr
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 