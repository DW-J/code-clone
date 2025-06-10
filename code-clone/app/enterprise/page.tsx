import EnterpriseForm from '@/components/EnterpriseForm';

export default function EnterprisePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">대·중견기업 협업제안</h1>
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-600 mb-8 text-center">
            서울창조경제혁신센터의 오픈 이노베이션 프로그램을 희망하는 
            <strong className="text-black">대·중견기업을 상시 모집</strong>합니다!
            <br />
            ※본 모집은 <strong className="text-black">수요기반형(On-Demand)방식</strong>으로 
            스타트업과 협업을 원하는 대·중견기업은 제안서를 제출해 주시기 바랍니다.
          </p>
          <EnterpriseForm />
        </div>
      </div>
    </main>
  );
} 