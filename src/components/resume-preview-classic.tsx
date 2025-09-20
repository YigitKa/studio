"use client";

import { useResume } from "@/contexts/resume-context";
import type { ResumeSection } from "@/lib/types";

export function ResumePreviewClassic() {
  const { resumeData, t } = useResume();
  const { profile, summary, experience, education, skills, projects, customSections, settings, sections } = resumeData;

  // Function to chunk skills into multiple arrays for columns
  const chunkArray = (arr: string[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

  const skillColumns = chunkArray(skills, Math.ceil(skills.length / 3));

  const sectionComponents: Record<ResumeSection, React.ReactNode> = {
    profile: settings.showProfile && (
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold tracking-wider">{profile.name}</h1>
        <div className="flex justify-center items-center gap-x-4 text-xs mt-2 text-gray-600">
          <span>{profile.phone}</span>
          <span className="text-gray-400">•</span>
          <a href={`mailto:${profile.email}`} className="text-blue-600 hover:underline">{profile.email}</a>
          <span className="text-gray-400">•</span>
          <span>{profile.address}</span>
        </div>
        <hr className="mt-6 mb-0"/>
      </header>
    ),
    summary: settings.showSummary && summary && (
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">{t('summary')}</h2>
        <p className="text-sm leading-relaxed">{summary}</p>
      </section>
    ),
    experience: settings.showExperience && experience.length > 0 && (
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">{t('experience')}</h2>
        <div className="space-y-4">
          {experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-md font-semibold">{exp.title}</h3>
                <div className="text-xs text-gray-600 text-right">
                  <div>{exp.startDate} - {exp.endDate}</div>
                  <div>{exp.location}</div>
                </div>
              </div>
              <h4 className="text-sm font-medium italic text-gray-700">{exp.company}</h4>
              <ul className="mt-1 list-disc list-inside text-sm leading-relaxed space-y-1 pl-2">
                 {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    ),
    education: settings.showEducation && education.length > 0 && (
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">{t('education')}</h2>
        <div className="space-y-2">
          {education.map(edu => (
            <div key={edu.id} className="flex justify-between items-baseline">
              <div>
                <h3 className="text-md font-semibold">{edu.institution}</h3>
                <p className="text-sm italic text-gray-700">{edu.degree}</p>
              </div>
              <div className="text-xs text-gray-600 text-right">
                <div>{edu.startDate} - {edu.endDate}</div>
                <div>{edu.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    ),
    projects: settings.showProjects && projects && projects.length > 0 && (
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">{t('projects')}</h2>
        <div className="space-y-4">
          {projects.map(proj => (
            <div key={proj.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-md font-semibold">{proj.name}</h3>
                <div className="text-xs text-gray-600">{proj.date}</div>
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
        <section key={sec.id} className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">{sec.title}</h2>
          <ul className="mt-1 list-disc list-inside text-sm leading-relaxed space-y-1 pl-2">
            {sec.content.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
          </ul>
        </section>
      ))
    ),
    skills: settings.showSkills && skills.length > 0 && (
      <section>
        <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">{t('skills')}</h2>
        <div className="grid grid-cols-3 gap-x-8">
            {skillColumns.map((column, colIndex) => (
                <ul key={colIndex} className="list-disc list-inside text-sm space-y-1">
                    {column.map((skill, skillIndex) => (
                        <li key={skillIndex}>{skill}</li>
                    ))}
                </ul>
            ))}
        </div>
      </section>
    ),
  };

  const visibleSections = sections.filter(section => {
    if (section === 'profile') return settings.showProfile;
    if (section === 'summary') return settings.showSummary && summary;
    if (section === 'experience') return settings.showExperience && experience.length > 0;
    if (section === 'education') return settings.showEducation && education.length > 0;
    if (section === 'projects') return settings.showProjects && projects.length > 0;
    if (section === 'skills') return settings.showSkills && skills.length > 0;
    if (section === 'customSections') return settings.showCustomSections && customSections.some(s => s.content);
    return false;
  });

  return (
    <div 
      id="resume-preview" 
      className="page-preview bg-white text-gray-800 shadow-2xl w-full max-w-[800px] overflow-auto font-sans transform scale-[0.8] lg:scale-100 origin-top"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '16mm',
        boxSizing: 'border-box',
        fontSize: '10pt',
      }}
    >
      {visibleSections.map(sectionId => (
        <React.Fragment key={sectionId}>
          {sectionComponents[sectionId]}
        </React.Fragment>
      ))}
    </div>
  );
}
