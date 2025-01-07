import { z } from "zod";

const basicsSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  title: z.string().min(1, "Professional title is required"),
  email: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  profile: z.string().min(1, "Professional profile is required"),
});

const experienceSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  duties: z.array(z.string()),
});

const educationSchema = z.object({
  level: z.string().min(1, "Degree level is required"),
  institution: z.string().min(1, "Institution name is required"),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  highlights: z.array(z.string()),
});

const languageSchema = z.object({
  name: z.string(),
  proficiency: z.string().optional(),
});

const referenceSchema = z.object({
  name: z.string().min(1, "Reference name is required"),
  organization: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
});

export const resumeSchema = z.object({
  title: z.string().min(1, "Resume title is required"),
  content: z.object({
    basics: basicsSchema,
    experience: z.array(experienceSchema),
    education: z.array(educationSchema),
    skills: z.array(z.string()),
    languages: z.array(languageSchema),
    references: z.array(referenceSchema),
  }),
});
