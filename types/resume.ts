export interface Resume {
  id: string;
  user_id: string;
  title: string;
  content: {
    basics: {
      name: string;
      title: string;
      email?: string;
      phone?: string;
      location?: string;
      profile: string;
    };
    experience: Array<{
      title: string;
      company: string;
      location: string;
      startDate: string;
      endDate?: string;
      duties: string[];
    }>;
    education: Array<{
      level: string;
      institution: string;
      location: string;
      startDate: string;
      endDate?: string;
      highlights: string[];
    }>;
    references: Array<{
      name: string;
      organization: string;
      phone?: string;
      email?: string;
    }>;
    skills: string[];
    languages: Array<{
      name: string;
      proficiency?: string;
    }>;
  };
  created_at: string;
  updated_at: string;
}
