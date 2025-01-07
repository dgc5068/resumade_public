import { supabase } from './supabase';
import type { Resume } from '../types/resume';

export async function getResumes(userId: string) {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data as Resume[];
}

export async function getResume(id: string, userId: string) {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data as Resume;
}

export async function createResume(resume: Omit<Resume, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('resumes')
    .insert(resume)
    .select()
    .single();

  if (error) throw error;
  return data as Resume;
}

export async function updateResume(id: string, userId: string, updates: Partial<Resume>) {
  const { data, error } = await supabase
    .from('resumes')
    .update(updates)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data as Resume;
}

export async function deleteResume(id: string, userId: string) {
  const { error } = await supabase
    .from('resumes')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);

  if (error) throw error;
}
