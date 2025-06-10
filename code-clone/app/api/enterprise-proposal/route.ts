import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      demandFields,
      companyName,
      department,
      managerName,
      managerEmail,
      managerPhone,
      participationType,
      proposalProgram
    } = body;

    // 필수 필드 검증
    if (!demandFields || !companyName || !department || !managerName || !managerEmail || !managerPhone) {
      return NextResponse.json(
        { message: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // 데이터베이스에 저장
    const result = await query(
      `INSERT INTO enterprise_proposals 
      (demand_fields, company_name, department, manager_name, manager_email, manager_phone, participation_type, proposal_program)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        demandFields.join(','),
        companyName,
        department,
        managerName,
        managerEmail,
        managerPhone,
        participationType || null,
        proposalProgram || null
      ]
    );

    return NextResponse.json({ 
      message: '제안서가 성공적으로 제출되었습니다.',
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error submitting enterprise proposal:', error);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 