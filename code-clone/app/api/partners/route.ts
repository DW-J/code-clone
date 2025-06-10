import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [partners] = await pool.query(
      'SELECT * FROM partners WHERE isActive = ? ORDER BY `order` ASC',
      [true]
    );

    return NextResponse.json(partners);
  } catch (error) {
    console.error('Failed to fetch partners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch partners' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const [result] = await pool.query(
      `INSERT INTO partners (name, imageUrl, websiteUrl, description, \`order\`, isActive)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [body.name, body.imageUrl, body.websiteUrl, body.description, body.order || 0, body.isActive !== undefined ? body.isActive : true]
    );

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Failed to create partner:', error);
    return NextResponse.json(
      { error: 'Failed to create partner' },
      { status: 500 }
    );
  }
} 