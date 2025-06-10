CREATE TABLE IF NOT EXISTS enterprise_proposals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    demand_fields VARCHAR(255) NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    manager_name VARCHAR(50) NOT NULL,
    manager_email VARCHAR(100) NOT NULL,
    manager_phone VARCHAR(20) NOT NULL,
    participation_type VARCHAR(100),
    proposal_program TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 