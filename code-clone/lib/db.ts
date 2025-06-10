import mysql from 'mysql2/promise';

// 먼저 데이터베이스 없이 연결
const initPool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 데이터베이스와 테이블 초기화
async function initDatabase() {
  try {
    const connection = await initPool.getConnection();
    
    // 데이터베이스 생성
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE || 'partner_db'}`);
    
    // 데이터베이스 선택
    await connection.query(`USE ${process.env.MYSQL_DATABASE || 'partner_db'}`);
    
    // 테이블 생성
    await connection.query(`
      CREATE TABLE IF NOT EXISTS partners (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        imageUrl VARCHAR(1000) NOT NULL,
        websiteUrl VARCHAR(1000),
        description TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        isActive BOOLEAN DEFAULT TRUE,
        \`order\` INT DEFAULT 0
      )
    `);

    console.log('Database and table initialized successfully');
    connection.release();
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  }
}

// 초기화 실행
initDatabase()
  .then(() => console.log('Database setup completed'))
  .catch(err => console.error('Database setup failed:', err));

// 실제 사용할 pool 생성
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'partner_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 연결 테스트
pool.getConnection()
  .then(connection => {
    console.log('Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

export async function query(sql: string, values: any[] = []) {
  const [rows] = await pool.execute(sql, values);
  return rows;
}

export default pool; 