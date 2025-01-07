import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { generateResume } from '@/lib/anthropic';

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { prompt } = await request.json();
    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 });
    }

    const resumeContent = await generateResume(prompt);

    return NextResponse.json(resumeContent);
  } catch (error) {
    console.error('Error in resume generation:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
