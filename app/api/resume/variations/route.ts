import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { generateVariations } from '@/lib/anthropic';
import { Resume } from '@/types/resume';

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { content, count = 3 } = await request.json();
    if (!content) {
      return new NextResponse('Resume content is required', { status: 400 });
    }

    const variations = await generateVariations(content as Resume['content'], count);

    return NextResponse.json(variations);
  } catch (error) {
    console.error('Error in resume variations:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
