import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { data: resume, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', userId)
      .single();

    if (error) {
      return new NextResponse(error.message, { status: 500 });
    }

    if (!resume) {
      return new NextResponse('Resume not found', { status: 404 });
    }

    return NextResponse.json(resume);
  } catch (error) {
    console.error('[RESUME_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
