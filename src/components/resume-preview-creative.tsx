"use client";

import { useResume } from "@/contexts/resume-context";
import { Phone, Mail, MapPin, Briefcase, GraduationCap, Wrench, User, FolderGit2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { CreativeColor } from "@/lib/types";
import { cn } from "@/lib/utils";

const colorVariants: Record<CreativeColor, { bg: string, text: string, border: string }> = {
    green: { bg: 'bg-green-600', text: 'text-green-600', border: 'border-green-600' },
    red: { bg: 'bg-red-600', text: 'text-red-600', border: 'border-red-600' },
    orange: { bg: 'bg-orange-600', text: 'text-orange-600', border: 'border-orange-600' },
    blue: { bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-600' },
    purple: { bg: 'bg-purple-600', text: 'text-purple-600', border: 'border-purple-600' },
    gray: { bg: 'bg-gray-600', text: 'text-gray-600', border: 'border-gray-600' },
    black: { bg: 'bg-black', text: 'text-black', border: 'border-black' },
};


export function ResumePreviewCreative() {
  const { resumeData, t, creativeColor } = useResume();
  const { profile, summary, experience, education, projects, skills } = resumeData;

  const colors = colorVariants[creativeColor] || colorVariants.green;
  const headerBg = colors.bg;
  const headerTextColor = creativeColor === 'black' ? 'text-primary-foreground' : 'text-primary-foreground';


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
      <header className={cn("flex items-center justify-between mb-6 p-6 rounded-lg -mx-2", headerBg, headerTextColor)}>
        <div className="w-3/4">
          <h1 className="text-4xl font-bold tracking-tight">{profile.name}</h1>
          <h2 className={cn("text-lg mt-1", creativeColor === 'black' ? 'text-primary-foreground/80' : 'text-primary-foreground/80')}>{profile.title}</h2>
        </div>
        <div className="w-1/4 flex justify-end">
            <Avatar className="w-24 h-24 border-4 border-white">
                <AvatarImage src={profile.photoUrl} alt={profile.name} data-ai-hint="person face" />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4 space-y-6">
          <section>
            <h3 className={cn("uppercase font-bold tracking-widest text-sm mb-3 flex items-center gap-2", colors.text)}><User size={16} /> Contact</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p className="flex items-center gap-2"><Mail size={14} />{profile.email}</p>
              <p className="flex items-center gap-2"><Phone size={14} />{profile.phone}</p>
              <p className="flex items-center gap-2"><MapPin size={14} />{profile.address}</p>
            </div>
          </section>

          <section>
            <h3 className={cn("uppercase font-bold tracking-widest text-sm mb-3 flex items-center gap-2", colors.text)}><Wrench size={16} /> {t('skills')}</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className={cn("uppercase font-bold tracking-widest text-sm mb-3 flex items-center gap-2", colors.text)}><GraduationCap size={16} /> {t('education')}</h3>
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
        </div>

        <div className="col-span-8">
          <section className="mb-6">
            <h3 className={cn("uppercase font-bold tracking-widest text-sm mb-3 flex items-center gap-2", colors.text)}><User size={16} /> {t('summary')}</h3>
            <p className="text-sm leading-relaxed">{summary}</p>
          </section>

          <section className="mb-6">
            <h3 className={cn("uppercase font-bold tracking-widest text-sm mb-3 flex items-center gap-2", colors.text)}><Briefcase size={16} /> {t('experience')}</h3>
            <div className="space-y-6">
              {experience.map(exp => (
                <div key={exp.id} className="relative pl-6">
                    <div className="absolute left-0 h-full w-0.5 bg-gray-200"></div>
                    <div className={cn("absolute left-[-5px] top-1 h-3 w-3 rounded-full", colors.bg)}></div>
                    <h4 className="font-semibold text-md">{exp.title}</h4>
                    <p className="text-gray-600 text-sm">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                    <ul className="mt-2 list-disc list-inside text-sm leading-relaxed space-y-1">
                        {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                    </ul>
                </div>
              ))}
            </div>
          </section>

          {projects && projects.length > 0 && (
          <section>
            <h3 className={cn("uppercase font-bold tracking-widest text-sm mb-3 flex items-center gap-2", colors.text)}><FolderGit2 size={16} /> {t('projects')}</h3>
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
          )}
        </div>
      </div>
    </div>
  );
}
