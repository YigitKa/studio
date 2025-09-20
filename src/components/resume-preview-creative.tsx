"use client";

import { useResume } from "@/contexts/resume-context";
import { Phone, Mail, MapPin, Briefcase, GraduationCap, Wrench, User, FolderGit2, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { ResumeSection } from "@/lib/types";
import React from "react";

const headerBg = 'bg-accent';
const textColor = 'text-accent';

export function ResumePreviewCreative() {
  const { resumeData, t } = useResume();
  const { profile, summary, experience, education, projects, skills, customSections, settings, sections } = resumeData;

  const leftColumnSections: ResumeSection[] = ['profile', 'skills', 'education'];

  const rightColumnSections: ResumeSection[] = ['summary', 'experience', 'projects', 'customSections'];

  const sectionComponents: Record<ResumeSection, React.ReactNode> = {
    profile: settings.showProfile && (
      <section>
        <h3 className={`uppercase font-bold tracking-widest text-sm ${textColor} mb-3 flex items-center gap-2`}><User size={16} /> Contact</h3>
        <div className="space-y-1 text-sm text-gray-600">
          <p className="flex items-center gap-2"><Mail size={14} />{profile.email}</p>
          <p className="flex items-center gap-2"><Phone size={14} />{profile.phone}</p>
          <p className="flex items-center gap-2"><MapPin size={14} />{profile.address}</p>
        </div>
      </section>
    ),
    skills: settings.showSkills && skills.length > 0 && (
      <section>
        <h3 className={`uppercase font-bold tracking-widest text-sm ${textColor} mb-3 flex items-center gap-2`}><Wrench size={16} /> {t('skills')}</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>
    ),
    education: settings.showEducation && education.length > 0 && (
      <section>
        <h3 className={`uppercase font-bold tracking-widest text-sm ${textColor} mb-3 flex items-center gap-2`}><GraduationCap size={16} /> {t('education')}</h3>
        <div className="space-y-4">
          {education.map(edu => (
            <div key={edu.id} className="text-sm">
              <h4 className="font-semibold">{edu.institution}</h4>
              <p className="text-gray-600">{edu.degree}</p>
              <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
            </div>
          ))}
        </div>
      </section>
    ),
    summary: settings.showSummary && summary && (
      <section className="mb-6">
        <h3 className={`uppercase font-bold tracking-widest text-sm ${textColor} mb-3 flex items-center gap-2`}><User size={16} /> {t('summary')}</h3>
        <p className="text-sm leading-relaxed">{summary}</p>
      </section>
    ),
    experience: settings.showExperience && experience.length > 0 && (
      <section className="mb-6">
        <h3 className={`uppercase font-bold tracking-widest text-sm ${textColor} mb-3 flex items-center gap-2`}><Briefcase size={16} /> {t('experience')}</h3>
        <div className="space-y-6">
          {experience.map(exp => (
            <div key={exp.id} className="relative pl-6">
                <div className="absolute left-0 h-full w-0.5 bg-gray-200"></div>
                <div className={`absolute left-[-5px] top-1 h-3 w-3 rounded-full ${headerBg}`}></div>
                <h4 className="font-semibold text-md">{exp.title}</h4>
                <p className="text-gray-600 text-sm">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                <ul className="mt-2 list-disc list-inside text-sm leading-relaxed space-y-1">
                    {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                </ul>
            </div>
          ))}
        </div>
      </section>
    ),
    projects: settings.showProjects && projects && projects.length > 0 && (
    <section className="mb-6">
      <h3 className={`uppercase font-bold tracking-widest text-sm ${textColor} mb-3 flex items-center gap-2`}><FolderGit2 size={16} /> {t('projects')}</h3>
      <div className="space-y-4">
        {projects.map(proj => (
          <div key={proj.id}>
            <div className="flex justify-between items-baseline">
              <h4 className="font-semibold">{proj.name}</h4>
              <div className="text-xs text-gray-500">{proj.date}</div>
            </div>
            <ul className="mt-1 list-disc list-inside text-sm leading-relaxed space-y-1">
              {proj.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
    ),
    customSections: settings.showCustomSections && customSections && customSections.length > 0 && (
      customSections.map(sec => sec.content && (
        <section key={sec.id} className="mt-6">
          <h3 className={`uppercase font-bold tracking-widest text-sm ${textColor} mb-3 flex items-center gap-2`}><Star size={16} /> {sec.title}</h3>
          <ul className="mt-1 list-disc list-inside text-sm leading-relaxed space-y-1">
            {sec.content.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
          </ul>
        </section>
      ))
    ),
  };

  const visibleLeftSections = sections.filter(sectionId =>
    leftColumnSections.includes(sectionId) && sectionComponents[sectionId]
  );
  
  const visibleRightSections = sections.filter(sectionId =>
    rightColumnSections.includes(sectionId) && sectionComponents[sectionId]
  );

  return (
    <div
      id="resume-preview"
      className="page-preview bg-white text-gray-800 shadow-2xl w-full max-w-[800px] overflow-auto font-sans transform scale-[0.8] lg:scale-100 origin-top"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '12mm',
        boxSizing: 'border-box',
        fontSize: '10pt',
      }}
    >
      {settings.showProfile && (
        <header className={`flex items-center justify-between mb-6 p-6 rounded-lg -mx-2 ${headerBg} text-accent-foreground`}>
          <div className="w-3/4">
            <h1 className="text-4xl font-bold tracking-tight">{profile.name}</h1>
            <h2 className="text-lg text-accent-foreground/80 mt-1">{profile.title}</h2>
          </div>
          <div className="w-1/4 flex justify-end">
              <Avatar className="w-24 h-24 border-4 border-white">
                  <AvatarImage src={profile.photoUrl} alt={profile.name} data-ai-hint="person face" />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
          </div>
        </header>
      )}

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4 space-y-6">
          {visibleLeftSections.map(sectionId => (
            <React.Fragment key={sectionId}>
              {sectionComponents[sectionId]}
            </React.Fragment>
          ))}
        </div>

        <div className="col-span-8">
          {visibleRightSections.map(sectionId => (
             <React.Fragment key={sectionId}>
              {sectionComponents[sectionId]}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
