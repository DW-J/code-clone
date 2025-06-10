USE partner_db;

-- 기존 데이터 초기화 (선택사항)
-- TRUNCATE TABLE partners;

-- 파트너 데이터 추가
INSERT INTO partners 
(name, imageUrl, websiteUrl, description, isActive, `order`) 
VALUES 
('KB국민카드', '/logos/kb-card.png', 'https://card.kbcard.com', 'KB국민카드', true, 1),
('KB캐피탈', '/logos/kb-capital.png', 'https://www.kbcapital.co.kr', 'KB캐피탈', true, 2),
('현대해상', '/logos/hyundai-insurance.png', 'https://www.hi.co.kr', '현대해상', true, 3),
('농협', '/logos/nh.png', 'https://www.nonghyup.com', '농협', true, 4),
('현대백화점', '/logos/hyundai.png', 'https://www.thehyundai.com', '현대백화점', true, 5),
('LG사이언스파크', '/logos/lg-sciencepark.png', 'https://www.lgsciencepark.com', 'LG사이언스파크', true, 6),
('풀무원', '/logos/pulmuone.png', 'https://www.pulmuone.co.kr', '풀무원', true, 7),
('CJ제일제당', '/logos/cj.png', 'https://www.cj.co.kr', 'CJ제일제당', true, 8);

-- 데이터 확인
SELECT * FROM partners; 