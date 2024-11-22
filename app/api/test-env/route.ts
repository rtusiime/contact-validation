import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (apiKey) {
    // Don't return the actual key, just confirm it's set
    return NextResponse.json({ message: 'RESEND_API_KEY is set' });
  } else {
    return NextResponse.json({ message: 'RESEND_API_KEY is not set' }, { status: 500 });
  }
}

