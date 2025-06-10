'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const FIELDS = [
  'AI',
  'Digital',
  'Platform',
  'ESG',
  'Space Tech',
  '로봇/IoT',
  '모빌리티/자율주행',
  '미래기술',
  '바이오',
  '배터리',
  '소재·부품·장비',
  '수소·에너지',
  '헬스·뷰티케어',
  '기타'
];

const SERVICE_STAGES = [
  '아이디어 단계',
  '개발 단계 (상용화되지는 않았으나 개발 중인 단계에 있는 제품이나 기술)',
  '개발 완료',
  '제품 및 브랜드 출시 단계',
  '사업운영 단계(매출 발생)'
];

const APPLICATION_ROUTES = [
  '서울창조경제혁신센터 홈페이지 및 메일 안내',
  'K-StartUp 홈페이지',
  'SNS 광고(페이스북, 인스타그램)',
  '지인추천',
  '대·중견기업 홍보(자사 홈페이지 및 홍보물 등)',
  '기타'
];

const LOCATIONS = [
  '서울', '경기', '인천', '부산', '대전', '대구', '울산', '세종',
  '광주', '강원', '충북', '충남', '경북', '경남', '전북', '전남', '제주'
];

export default function RecruitmentForm() {
  const router = useRouter();
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    manager_name: '',
    manager_email: '',
    manager_phone: '',
    ceo_name: '',
    ceo_email: '',
    ceo_phone: '',
    company_name: '',
    years_of_establishment: '',
    service_description: '',
    service_stage: '',
    desired_partner: '',
    proposal_file: null as File | null,
    has_investment: false,
    has_intellectual_property: false,
    reference_url: '',
    application_route: '',
    business_location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleFieldSelection = (field: string) => {
    setSelectedFields(prev => {
      if (prev.includes(field)) {
        return prev.filter(f => f !== field);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, field];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFields.length === 0) {
      setError('지원분야를 최소 1개 이상 선택해주세요.');
      return;
    }
    if (!formData.proposal_file) {
      setError('협업제안서를 첨부해주세요.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('field', selectedFields.join(','));
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'proposal_file' && value) {
          formDataToSend.append('proposal_file', value);
        } else if (typeof value === 'boolean') {
          formDataToSend.append(key, value ? '1' : '0');
        } else if (value !== null) {
          formDataToSend.append(key, String(value));
        }
      });

      const response = await fetch('/api/applications', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('제출에 실패했습니다.');
      }

      // 성공 시 완료 페이지로 이동
      router.push('/recruitment/complete');
    } catch (err) {
      setError(err instanceof Error ? err.message : '제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md">
          {error}
        </div>
      )}

      {/* 지원분야 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          지원분야 * (최대 3개)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {FIELDS.map((field) => (
            <label
              key={field}
              className={`
                flex items-center p-3 rounded-md cursor-pointer border
                ${selectedFields.includes(field)
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }
                ${selectedFields.length >= 3 && !selectedFields.includes(field)
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
                }
              `}
            >
              <input
                type="checkbox"
                checked={selectedFields.includes(field)}
                onChange={() => handleFieldSelection(field)}
                disabled={selectedFields.length >= 3 && !selectedFields.includes(field)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm">{field}</span>
            </label>
          ))}
        </div>
        {selectedFields.length > 0 && (
          <p className="mt-2 text-sm text-gray-500">
            선택된 분야: {selectedFields.join(', ')} ({selectedFields.length}/3)
          </p>
        )}
      </div>

      {/* 담당자 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            담당자명 *
          </label>
          <input
            type="text"
            required
            value={formData.manager_name}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              manager_name: e.target.value
            }))}
            className="w-full px-3 py-2 border rounded-md text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            담당자 이메일 *
          </label>
          <input
            type="email"
            required
            value={formData.manager_email}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              manager_email: e.target.value
            }))}
            className="w-full px-3 py-2 border rounded-md text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            담당자 연락처 *
          </label>
          <input
            type="tel"
            required
            value={formData.manager_phone}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              manager_phone: e.target.value
            }))}
            className="w-full px-3 py-2 border rounded-md text-black"
            placeholder="010-0000-0000"
          />
        </div>
      </div>

      {/* 대표자 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            대표자명 *
          </label>
          <input
            type="text"
            required
            value={formData.ceo_name}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              ceo_name: e.target.value
            }))}
            className="w-full px-3 py-2 border rounded-md text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            대표자 이메일 *
          </label>
          <input
            type="email"
            required
            value={formData.ceo_email}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              ceo_email: e.target.value
            }))}
            className="w-full px-3 py-2 border rounded-md text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            대표자 연락처 *
          </label>
          <input
            type="tel"
            required
            value={formData.ceo_phone}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              ceo_phone: e.target.value
            }))}
            className="w-full px-3 py-2 border rounded-md text-black"
            placeholder="010-0000-0000"
          />
        </div>
      </div>

      {/* 회사 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            회사명 *
          </label>
          <input
            type="text"
            required
            value={formData.company_name}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              company_name: e.target.value
            }))}
            className="w-full px-3 py-2 border rounded-md text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            창업년수 *
          </label>
          <input
            type="number"
            required
            min="0"
            value={formData.years_of_establishment}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              years_of_establishment: e.target.value
            }))}
            className="w-full px-3 py-2 border rounded-md text-black"
          />
        </div>
      </div>

      {/* 서비스 정보 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          기술/제품/서비스 한줄 소개 *
        </label>
        <textarea
          required
          value={formData.service_description}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            service_description: e.target.value
          }))}
          className="w-full px-3 py-2 border rounded-md text-black"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          기술/제품/서비스 단계 *
        </label>
        <select
          required
          value={formData.service_stage}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            service_stage: e.target.value
          }))}
          className="w-full px-3 py-2 border rounded-md text-black"
        >
          <option value="">선택해주세요</option>
          {SERVICE_STAGES.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          협업 희망 파트너사
        </label>
        <input
          type="text"
          value={formData.desired_partner}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            desired_partner: e.target.value
          }))}
          className="w-full px-3 py-2 border rounded-md text-black"
        />
      </div>

      {/* 파일 업로드 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          협업제안서 * (최대 20MB)
        </label>
        <input
          type="file"
          required
          accept=".pdf,.doc,.docx,.ppt,.pptx"
          onChange={(e) => setFormData(prev => ({
            ...prev,
            proposal_file: e.target.files?.[0] || null
          }))}
          className="w-full px-3 py-2 border rounded-md text-black"
        />
      </div>

      {/* 추가 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.has_investment}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                has_investment: e.target.checked
              }))}
              className="rounded text-blue-600"
            />
            <span className="text-sm text-gray-700">투자유치 여부 *</span>
          </label>
        </div>
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.has_intellectual_property}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                has_intellectual_property: e.target.checked
              }))}
              className="rounded text-blue-600"
            />
            <span className="text-sm text-gray-700">산업재산권 보유 여부 *</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          참고용 URL
        </label>
        <input
          type="url"
          value={formData.reference_url}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            reference_url: e.target.value
          }))}
          className="w-full px-3 py-2 border rounded-md text-black"
          placeholder="https://"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          참가신청경로 *
        </label>
        <select
          required
          value={formData.application_route}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            application_route: e.target.value
          }))}
          className="w-full px-3 py-2 border rounded-md text-black"
        >
          <option value="">선택해주세요</option>
          {APPLICATION_ROUTES.map((route) => (
            <option key={route} value={route}>
              {route}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          사업장 소재지 *
        </label>
        <select
          required
          value={formData.business_location}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            business_location: e.target.value
          }))}
          className="w-full px-3 py-2 border rounded-md text-black"
        >
          <option value="">선택해주세요</option>
          {LOCATIONS.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            px-6 py-3 bg-blue-600 text-white rounded-md
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isSubmitting ? '제출 중...' : '제출하기'}
        </button>
      </div>
    </form>
  );
} 