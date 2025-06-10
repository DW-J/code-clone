import RecruitmentForm from '@/components/RecruitmentForm';

export default function RecruitmentPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">상시모집</h1>
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-600 mb-8 text-center">
            서울창조경제혁신센터의 오픈 이노베이션 프로그램에 참여를 희망하는 
            <strong className="text-black">스타트업을 상시 모집</strong>합니다!
            <br />
            ※본 모집은 <strong className="text-black">자율제안형(Bottom-Up)방식</strong>으로 
            대·중견기업과 협업을 원하는 스타트업은 제안서를 제출해 주시기 바랍니다.
          </p>
          <RecruitmentForm />
        </div>
      </div>
    </main>
  );
} 