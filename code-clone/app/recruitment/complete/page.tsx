import Link from 'next/link';

export default function CompletePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">제출이 완료되었습니다</h1>
          <p className="text-gray-600 mb-8">
            지원서가 성공적으로 접수되었습니다. 검토 후 연락드리겠습니다.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
} 