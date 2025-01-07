import Anthropic from '@anthropic-ai/sdk';
import { Resume } from '@/types/resume';

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error('Missing ANTHROPIC_API_KEY environment variable');
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export type ResumeStyle = 'professional' | 'creative' | 'technical' | 'executive';

const stylePrompts: Record<ResumeStyle, string> = {
  professional: 'Create a traditional, professional resume that emphasizes experience and achievements. Use formal language and focus on quantifiable results.',
  creative: 'Create a modern, dynamic resume that showcases personality while maintaining professionalism. Use engaging language and highlight innovative achievements.',
  technical: 'Create a technical-focused resume that emphasizes hard skills and technical achievements. Use precise technical terminology and highlight specific technologies and methodologies.',
  executive: 'Create an executive-level resume that focuses on leadership, strategic initiatives, and business impact. Emphasize organizational achievements and high-level decision making.',
};

export async function generateResume(
  prompt: string,
  style: ResumeStyle = 'professional'
): Promise<Partial<Resume['content']>> {
  const systemPrompt = `You are an expert resume writer. Create a ${style} resume based on the provided information. 
${stylePrompts[style]}

Format the response as a JSON object matching this structure:
{
  "basics": {
    "name": string,
    "email": string (if provided),
    "phone": string (if provided),
    "location": string (if provided),
    "summary": string (professional summary)
  },
  "experience": [{
    "company": string,
    "position": string,
    "startDate": string (YYYY-MM),
    "endDate": string (YYYY-MM) | null (if current),
    "highlights": string[] (3-5 bullet points)
  }],
  "education": [{
    "institution": string,
    "area": string,
    "studyType": string,
    "startDate": string (YYYY-MM),
    "endDate": string (YYYY-MM) | null (if current)
  }],
  "skills": [{
    "name": string,
    "level": string (optional),
    "keywords": string[] (optional)
  }]
}

Make the content professional, impactful, and optimized for ATS systems. Use action verbs and quantify achievements where possible.`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 4000,
      temperature: 0.7,
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: prompt,
      }],
    });

    const content = JSON.parse(response.content[0].type === 'text' ? response.content[0].text : '{}');
    return content;
  } catch (error) {
    console.error('Error generating resume:', error);
    throw error;
  }
}

export async function generateVariations(
  content: Resume['content'],
  count: number = 3
): Promise<Array<Resume['content']>> {
  const systemPrompt = `You are an expert resume writer. Create ${count} variations of the provided resume content.
Each variation should:
1. Use different action verbs and phrasing
2. Reorganize achievements for maximum impact
3. Maintain the same facts but present them differently
4. Be equally professional and ATS-friendly

Return an array of ${count} resume variations in the same JSON format as the input.`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 4000,
      temperature: 0.8,
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: JSON.stringify(content, null, 2),
      }],
    });

    const variations = JSON.parse(response.content[0].type === 'text' ? response.content[0].text : '[]');
    return variations;
  } catch (error) {
    console.error('Error generating variations:', error);
    throw error;
  }
}

export async function improveResume(
  content: Resume['content'],
  focusAreas?: Array<'clarity' | 'impact' | 'ats' | 'brevity'>
): Promise<Resume['content']> {
  const focusPrompts = {
    clarity: 'Improve clarity and readability',
    impact: 'Enhance impact by quantifying achievements',
    ats: 'Optimize for ATS systems by using relevant keywords',
    brevity: 'Make content more concise without losing impact'
  };

  const focusInstructions = focusAreas
    ? focusAreas.map(area => focusPrompts[area]).join('. ')
    : 'Make general improvements to all aspects';

  const systemPrompt = `You are an expert resume writer. Improve the provided resume content to make it more impactful and professional.
Focus on: ${focusInstructions}

Return the improved resume in the same JSON format as provided.`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 4000,
      temperature: 0.7,
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: JSON.stringify(content, null, 2),
      }],
    });

    const improvedContent = JSON.parse(response.content[0].type === 'text' ? response.content[0].text : '{}');
    return improvedContent;
  } catch (error) {
    console.error('Error improving resume:', error);
    throw error;
  }
}

export async function suggestSkills(experience: Resume['content']['experience']): Promise<Resume['content']['skills']> {
  const systemPrompt = `You are an expert in technical recruiting and career development. Based on the provided work experience, suggest relevant skills that should be highlighted in the resume.
Group skills by category (e.g., Technical Skills, Soft Skills, Tools) and include both hard and soft skills.
Return the skills in this JSON format:
{
  "skills": [{
    "name": string,
    "level": string,
    "keywords": string[]
  }]
}`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 2000,
      temperature: 0.7,
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: JSON.stringify(experience, null, 2),
      }],
    });

    const suggestedSkills = JSON.parse(response.content[0].type === 'text' ? response.content[0].text : '{"skills": []}');
    return suggestedSkills.skills;
  } catch (error) {
    console.error('Error suggesting skills:', error);
    throw error;
  }
}
