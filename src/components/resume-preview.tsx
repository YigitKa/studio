"use client";

import { useResume } from "@/contexts/resume-context";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Phone, Mail, MapPin, Briefcase, GraduationCap, Wrench, User } from 'lucide-react';

export default function ResumePreview() {
  const { resumeData, t } = useResume();
  const { profile, summary, experience, education, skills } = resumeData;

  return (
    <div id="resume-preview" className="printable bg-white text-gray-800 shadow-2xl rounded-lg aspect-[210/297] w-full max-w-[800px] overflow-auto p-8 lg:p-12 font-sans transform scale-[0.8] lg:scale-100 origin-top">
      {/* Header */}
      <header className="flex items-center space-x-8 mb-8">
        <Avatar className="h-32 w-32">
          <AvatarImage src={profile.photoUrl} alt={profile.name} data-ai-hint="person face" />
          <AvatarFallback className="text-4xl">{profile.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-4xl font-bold text-primary">{profile.name}</h1>
          <h2 className="text-xl font-light text-gray-600 mt-1">{profile.title}</h2>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-2"><Mail size={14} /><span>{profile.email}</span></div>
            <div className="flex items-center gap-2"><Phone size={14} /><span>{profile.phone}</span></div>
            <div className="flex items-center gap-2 col-span-2"><MapPin size={14} /><span>{profile.address}</span></div>
          </div>
        </div>
      </header>

      {/* Summary Section */}
      <section className="mb-8">
        <h3 className="flex items-center gap-3 text-xl font-semibold text-primary border-b-2 border-accent pb-2 mb-4">
            <User size={20} />
            {t('summary')}
        </h3>
        <p className="text-sm leading-relaxed">{summary}</p>
      </section>

      {/* Experience Section */}
      <section className="mb-8">
         <h3 className="flex items-center gap-3 text-xl font-semibold text-primary border-b-2 border-accent pb-2 mb-4">
            <Briefcase size={20} />
            {t('experience')}
        </h3>
        <div className="space-y-6">
          {experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h4 className="text-lg font-semibold">{exp.title}</h4>
                <div className="text-sm font-light text-gray-500">{exp.startDate} - {exp.endDate}</div>
              </div>
              <div className="flex justify-between items-baseline text-md text-accent">
                <h5>{exp.company}</h5>
                <span className="font-light text-gray-500">{exp.location}</span>
              </div>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-700 space-y-1">
                {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="mb-8">
        <h3 className="flex items-center gap-3 text-xl font-semibold text-primary border-b-2 border-accent pb-2 mb-4">
            <GraduationCap size={20} />
            {t('education')}
        </h3>
        <div className="space-y-4">
          {education.map(edu => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline">
                <h4 className="text-lg font-semibold">{edu.degree}</h4>
                <div className="text-sm font-light text-gray-500">{edu.startDate} - {edu.endDate}</div>
              </div>
               <div className="flex justify-between items-baseline text-md text-gray-600">
                <h5>{edu.institution}</h5>
                 <span className="font-light text-gray-500">{edu.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section>
        <h3 className="flex items-center gap-3 text-xl font-semibold text-primary border-b-2 border-accent pb-2 mb-4">
            <Wrench size={20} />
            {t('skills')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span key={index} className="bg-secondary text-secondary-foreground text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
