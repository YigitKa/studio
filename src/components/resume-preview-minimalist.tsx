"use client";

import { useResume } from "@/contexts/resume-context";
import { Separator } from "./ui/separator";

export function ResumePreviewMinimalist() {
  const { resumeData, t } = useResume();
  const { profile, summary, experience, education, projects, skills, customSections } = resumeData;

  return (
    <div
      id="resume-preview"
      className="page-preview bg-white text-gray-800 shadow-2xl w-full max-w-[800px] overflow-auto font-sans transform scale-[0.8] lg:scale-100 origin-top"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '20mm',
        boxSizing: 'border-box',
        fontSize: '11pt',
      }}
    >
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold tracking-tighter">{profile.name}</h1>
        <h2 className="text-xl text-gray-500 mt-2 font-light tracking-wide">{profile.title}</h2>
        <div className="flex justify-center items-center gap-x-6 text-xs mt-4 text-gray-500">
          <span>{profile.phone}</span>
          <span>{profile.email}</span>
          <span>{profile.address}</span>
        </div>
      </header>

      <section className="mb-8">
        <p className="text-center text-sm leading-relaxed max-w-3xl mx-auto">{summary}</p>
      </section>
      
      <Separator className="my-8" />

      <section className="mb-8">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">{t('experience')}</h3>
        <div className="space-y-6">
          {experience.map(exp => (
            <div key={exp.id} className="grid grid-cols-4 gap-4">
              <div className="col-span-1 text-xs text-gray-500">
                <p>{exp.startDate} - {exp.endDate}</p>
                <p>{exp.location}</p>
              </div>
              <div className="col-span-3">
                <h4 className="font-semibold">{exp.title}</h4>
                <p className="text-sm text-gray-600">{exp.company}</p>
                <ul className="mt-2 list-disc list-inside text-sm leading-relaxed space-y-1">
                   {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {projects && projects.length > 0 && (
        <>
          <Separator className="my-8" />
          <section className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">{t('projects')}</h3>
            <div className="space-y-5">
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
        </>
      )}

      {customSections && customSections.length > 0 && (
        <>
          <Separator className="my-8" />
          {customSections.map(sec => (
            <section key={sec.id} className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">{sec.title}</h3>
              <ul className="mt-1 list-disc list-inside text-sm leading-relaxed space-y-1">
                {sec.content.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
              </ul>
            </section>
          ))}
        </>
      )}

      <Separator className="my-8" />

      <div className="grid grid-cols-2 gap-x-12">
        <section>
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">{t('education')}</h3>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id}>
                <h4 className="font-semibold">{edu.institution}</h4>
                <p className="text-sm text-gray-600">{edu.degree}</p>
                <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">{t('skills')}</h3>
          <ul className="columns-2 text-sm">
            {skills.map((skill, index) => (
              <li key={index} className="mb-1">{skill}</li>
            ))}
          </ul>
        </section>
      </div>

    </div>
  );
}
