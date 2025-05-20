import { NextResponse } from 'next/server';
import { delay } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { developerId, name, email, message } = data;
    
    if (!developerId || !name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    await delay(3000);
    
    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending contact message:', error);
    
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}