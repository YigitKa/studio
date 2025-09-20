export type Language = 'en' | 'tr';
export type Template = 'modern' | 'classic';

export interface ProfileData {
  name: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  photoUrl: string;
}

export interface ExperienceData {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface EducationData {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface ProjectData {
  id: string;
  name: string;
  date: string;
  description: string;
}

export interface ResumeData {
  profile: ProfileData;
  summary: string;
  experience: ExperienceData[];
  education: EducationData[];
  projects: ProjectData[];
  skills: string[];
}
