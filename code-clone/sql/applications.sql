-- 1. 데이터베이스 선택
USE partner_db;

-- 2. 테이블 생성
CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  field VARCHAR(255) NOT NULL COMMENT '지원분야 (최대 3개 선택)',
  manager_name VARCHAR(100) NOT NULL COMMENT '담당자명',
  manager_email VARCHAR(255) NOT NULL COMMENT '담당자 이메일',
  manager_phone VARCHAR(20) NOT NULL COMMENT '담당자 연락처',
  ceo_name VARCHAR(100) NOT NULL COMMENT '대표자명',
  ceo_email VARCHAR(255) NOT NULL COMMENT '대표자 이메일',
  ceo_phone VARCHAR(20) NOT NULL COMMENT '대표자 연락처',
  company_name VARCHAR(255) NOT NULL COMMENT '회사명',
  years_of_establishment INT NOT NULL COMMENT '창업년수',
  service_description TEXT NOT NULL COMMENT '기술/제품/서비스 한줄 소개',
  service_stage VARCHAR(50) NOT NULL COMMENT '기술/제품/서비스 단계',
  desired_partner VARCHAR(255) COMMENT '협업 희망 파트너사',
  proposal_file_url VARCHAR(1000) NOT NULL COMMENT '협업제안서 파일 경로',
  has_investment BOOLEAN NOT NULL COMMENT '투자유치 여부',
  has_intellectual_property BOOLEAN NOT NULL COMMENT '산업재산권 보유 여부',
  reference_url VARCHAR(1000) COMMENT '참고용 URL',
  application_route VARCHAR(100) NOT NULL COMMENT '참가신청경로',
  business_location VARCHAR(100) NOT NULL COMMENT '사업장 소재지',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pending' COMMENT '지원 상태 (pending, reviewing, accepted, rejected)',
  INDEX idx_status (status),
  INDEX idx_company (company_name)
);

SELECT * FROM applications;

-- 테이블 생성 확인
SHOW TABLES;

-- 테이블 구조 확인
DESCRIBE applications;