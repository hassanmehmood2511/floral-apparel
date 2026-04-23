import { NextResponse } from 'next/response';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_token');
  return response;
}
