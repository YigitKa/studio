export type Language = 'en' | 'tr';

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

export interface ResumeData {
  profile: ProfileData;
  summary: string;
  experience: ExperienceData[];
  education: EducationData[];
  skills: string[];
}
