"use client";

import { useResume } from "@/contexts/resume-context";
import { Phone, Mail, MapPin, Briefcase, GraduationCap, Wrench, User, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function ResumePreviewModern() {
  const { resumeData, t } = useResume();
  const { profile, summary, experience, education, skills, customSections, settings } = resumeData;

  return (
    <div 
      id="resume-preview" 
      className="page-preview bg-white text-gray-800 shadow-2xl w-full max-w-[800px] overflow-auto font-sans transform scale-[0.8] lg:scale-100 origin-top"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '16mm',
        boxSizing: 'border-box',
      }}
    >
      <div className="flex gap-4">
        {/* Left Column */}
        <div className="w-[38%] bg-gradient-to-b from-[#fcfcff] to-[#f7f9ff] p-3 rounded-lg box-border">
          {settings.showProfile && (
            <>
              <Avatar className="w-[120px] h-[120px] rounded-lg object-cover block mx-auto mb-3.5 shadow-md">
                <AvatarImage src={profile.photoUrl} alt={profile.name} data-ai-hint="person face" />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <section className="mb-3.5">
                <h3 className="text-base font-semibold text-[#0b2540] border-l-4 border-[#6b7bd8] pl-1.5 mb-1.5 flex items-center gap-2">
                  <Mail size={16} /> {t('email')} / {t('phone')}
                </h3>
                <div className="text-xs text-[#444]">
                  <a href={`mailto:${profile.email}`} className="block text-[#113366] no-underline mb-1">{profile.email}</a>
                  <p>{profile.phone}</p>
                </div>
              </section>

              <section className="mb-3.5">
                 <h3 className="text-base font-semibold text-[#0b2540] border-l-4 border-[#6b7bd8] pl-1.5 mb-1.5 flex items-center gap-2">
                    <MapPin size={16} /> {t('address')}
                </h3>
                <p className="text-xs text-[#444]">{profile.address}</p>
              </section>
            </>
          )}
          
          {settings.showSkills && skills.length > 0 && (
            <section className="mb-3.5">
              <h3 className="text-base font-semibold text-[#0b2540] border-l-4 border-[#6b7bd8] pl-1.5 mb-1.5 flex items-center gap-2">
                <Wrench size={16} /> {t('skills')}
              </h3>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill, index) => (
                  <span key={index} className="bg-secondary text-secondary-foreground text-xs font-medium px-2 py-0.5 rounded-full">{skill}</span>
                ))}
              </div>
            </section>
          )}

          {settings.showEducation && education.length > 0 && (
            <section className="mb-3.5">
              <h3 className="text-base font-semibold text-[#0b2540] border-l-4 border-[#6b7bd8] pl-1.5 mb-1.5 flex items-center gap-2">
                <GraduationCap size={16} /> {t('education')}
              </h3>
              <ul className="space-y-2">
                {education.map(edu => (
                  <li key={edu.id} className="text-xs text-[#444]">
                    <strong>{edu.institution}</strong>
                    <p>{edu.degree}</p>
                    <p>{edu.startDate} - {edu.endDate}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
          
          {settings.showCustomSections && customSections && customSections.length > 0 && (
            customSections.map(sec => (
              <section key={sec.id} className="mb-3.5">
                <h3 className="text-base font-semibold text-[#0b2540] border-l-4 border-[#6b7bd8] pl-1.5 mb-1.5 flex items-center gap-2">
                  <Star size={16} /> {sec.title}
                </h3>
                <ul className="list-disc list-inside text-sm leading-relaxed space-y-1 pl-2">
                  {sec.content.split('\n').map((line, i) => line && <li key={i} className="text-xs text-[#444]">{line.replace(/^- /, '')}</li>)}
                </ul>
              </section>
            ))
          )}

        </div>

        {/* Right Column */}
        <div className="w-[62%] p-1">
          {settings.showProfile && (
            <header className="flex items-center gap-3.5 mb-1.5">
              <div>
                <h1 className="text-2xl font-bold tracking-wide">{profile.name}</h1>
                <h2 className="text-sm text-[#3b4a6b]">{profile.title}</h2>
              </div>
            </header>
          )}

          {settings.showSummary && summary && (
            <section className="mb-3.5">
              <h3 className="text-base font-semibold text-[#0b2540] border-l-4 border-[#6b7bd8] pl-1.5 mb-1.5 flex items-center gap-2">
                <User size={16} /> {t('summary')}
              </h3>
              <p className="text-sm leading-relaxed">{summary}</p>
            </section>
          )}
          
          {settings.showExperience && experience.length > 0 && (
            <section>
              <h3 className="text-base font-semibold text-[#0b2540] border-l-4 border-[#6b7bd8] pl-1.5 mb-1.5 flex items-center gap-2">
                <Briefcase size={16} /> {t('experience')}
              </h3>
              <div className="space-y-3">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="text-sm text-[#3b4a6b] font-semibold">{exp.title} at {exp.company}</div>
                    <div className="text-xs text-gray-500">{exp.location} | {exp.startDate} - {exp.endDate}</div>
                    <ul className="mt-1 list-disc list-inside text-sm leading-relaxed space-y-1">
                       {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
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
