import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { improveResume } from '@/lib/anthropic';
import { Resume } from '@/types/resume';

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { content } = await request.json();
    if (!content) {
      return new NextResponse('Resume content is required', { status: 400 });
    }

    const improvedContent = await improveResume(content as Resume['content']);

    return NextResponse.json(improvedContent);
  } catch (error) {
    console.error('Error in resume improvement:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
