import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // 파일 처리
    const file = formData.get('proposal_file') as File;
    let fileUrl = '';
    
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // 파일 이름에 타임스탬프 추가하여 중복 방지
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name}`;
      const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
      
      await writeFile(filePath, buffer);
      fileUrl = `/uploads/${fileName}`;
    }

    // 데이터베이스에 저장
    const [result] = await pool.query(
      `INSERT INTO applications (
        field,
        manager_name,
        manager_email,
        manager_phone,
        ceo_name,
        ceo_email,
        ceo_phone,
        company_name,
        years_of_establishment,
        service_description,
        service_stage,
        desired_partner,
        proposal_file_url,
        has_investment,
        has_intellectual_property,
        reference_url,
        application_route,
        business_location
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        formData.get('field'),
        formData.get('manager_name'),
        formData.get('manager_email'),
        formData.get('manager_phone'),
        formData.get('ceo_name'),
        formData.get('ceo_email'),
        formData.get('ceo_phone'),
        formData.get('company_name'),
        parseInt(formData.get('years_of_establishment') as string),
        formData.get('service_description'),
        formData.get('service_stage'),
        formData.get('desired_partner'),
        fileUrl,
        formData.get('has_investment') === '1',
        formData.get('has_intellectual_property') === '1',
        formData.get('reference_url'),
        formData.get('application_route'),
        formData.get('business_location')
      ]
    );

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Failed to submit application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
} 