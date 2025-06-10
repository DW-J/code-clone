'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from '@/styles/Enterprise.module.css';

interface FormData {
  demandFields: string[];
  companyName: string;
  department: string;
  managerName: string;
  managerEmail: string;
  managerPhone: string;
  participationType: string;
  proposalProgram: string;
}

export default function EnterpriseForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    demandFields: [],
    companyName: '',
    department: '',
    managerName: '',
    managerEmail: '',
    managerPhone: '',
    participationType: '',
    proposalProgram: ''
  });

  const demandFieldOptions = [
    'AI', 'Digital', 'Platform', 'ESG', 'Space Tech', '로봇/IoT',
    '모빌리티/자율주행', '미래기술', '바이오', '배터리',
    '소재·부품·장비', '수소·에너지', '헬스·뷰티케어', '기타'
  ];

  const participationTypes = [
    'Short Term 프로그램: [스타트업 오픈 스테이지]',
    'Long Term 프로그램: [PoC 프로그램]',
    'Field 프로그램: [산업군별 대·중견기업 융합 프로그램]'
  ];

  const handleFieldChange = (field: string) => {
    setFormData(prev => {
      const fields = [...prev.demandFields];
      if (fields.includes(field)) {
        return { ...prev, demandFields: fields.filter(f => f !== field) };
      }
      if (fields.length < 3) {
        return { ...prev, demandFields: [...fields, field] };
      }
      return prev;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/enterprise-proposal', formData);
      alert('제안서가 성공적으로 제출되었습니다.');
      router.push('/enterprise/complete');
    } catch (err) {
      alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.section}>
        <label>수요분야 (최대 3개 선택 가능) *</label>
        <div className={styles.checkboxGrid}>
          {demandFieldOptions.map((field) => (
            <label key={field} className={styles.checkbox}>
              <input
                type="checkbox"
                checked={formData.demandFields.includes(field)}
                onChange={() => handleFieldChange(field)}
              />
              {field}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <label>회사명 *</label>
        <input
          type="text"
          required
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
        />
      </div>

      <div className={styles.section}>
        <label>담당 부서 *</label>
        <input
          type="text"
          required
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        />
      </div>

      <div className={styles.section}>
        <label>담당자 성명 *</label>
        <input
          type="text"
          required
          value={formData.managerName}
          onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
        />
      </div>

      <div className={styles.section}>
        <label>담당자 이메일 *</label>
        <input
          type="email"
          required
          value={formData.managerEmail}
          onChange={(e) => setFormData({ ...formData, managerEmail: e.target.value })}
        />
      </div>

      <div className={styles.section}>
        <label>담당자 연락처 *</label>
        <input
          type="tel"
          required
          value={formData.managerPhone}
          onChange={(e) => setFormData({ ...formData, managerPhone: e.target.value })}
        />
      </div>

      <div className={styles.section}>
        <label>참여 희망 형태</label>
        <select
          value={formData.participationType}
          onChange={(e) => setFormData({ ...formData, participationType: e.target.value })}
        >
          <option value="">선택해주세요</option>
          {participationTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className={styles.section}>
        <label>제안 프로그램</label>
        <textarea
          value={formData.proposalProgram}
          onChange={(e) => setFormData({ ...formData, proposalProgram: e.target.value })}
          placeholder="ex. 1:1 밋업, 투자 연계형, PoC 이후 데모데이 등"
        />
      </div>

      <button type="submit" className={styles.submitButton}>제출하기</button>
    </form>
  );
} 