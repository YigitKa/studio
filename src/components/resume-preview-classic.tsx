
"use client";

import * as React from "react";
import { useResume } from "@/contexts/resume-context";
import type { ResumeData, ResumeSection } from "@/lib/types";

const SectionRenderer: React.FC<{ sectionId: ResumeSection, allSections: ResumeSection[] }> = ({ sectionId, allSections }) => {
    const { resumeData, t } = useResume();
    const { profile, summary, experience, education, skills, projects, customSections } = resumeData;

    const isVisible = (sectionId: ResumeSection) => {
        const sectionData = resumeData[sectionId as keyof ResumeData];
        const settingsKey = `show${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}` as keyof typeof resumeData.settings;
        
        let isShown = true;
        if (sectionId !== 'profile') {
            isShown = !!resumeData.settings[settingsKey];
        }

        if (!isShown) return false;

        if (Array.isArray(sectionData) && sectionData.length === 0) return false;
        if (typeof sectionData === 'string' && !sectionData) return false;
        if (sectionId === 'customSections' && resumeData.customSections.every(s => !s.content)) return false;

        return true;
    }

    const renderContent = () => {
        const isFirstVisibleSection = allSections.find(isVisible) === sectionId;
        
        const sectionHeader = (title: string) => (
            <div className="mb-2">
                 {!isFirstVisibleSection && <hr className="mb-2" />}
                <h2 className="text-sm font-bold uppercase tracking-widest">{title}</h2>
            </div>
        );

        switch (sectionId) {
            case 'profile':
                return (
                    <header data-section-id="profile" className="text-center mb-4 break-inside-avoid">
                        <h1 className="text-3xl font-bold tracking-wider">{profile.name}</h1>
                        <div className="flex justify-center items-center flex-wrap gap-x-2 text-xs mt-1 text-gray-600">
                            <span>{profile.phone}</span>
                            <span>•</span>
                            <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a>
                             <span>•</span>
                            <span>{profile.address}</span>
                        </div>
                    </header>
                );
            case 'summary':
                return (
                    <section data-section-id="summary" className="mb-4 break-inside-avoid">
                        {sectionHeader(t('summary'))}
                        <p className="text-xs leading-relaxed">{summary}</p>
                    </section>
                );
            case 'experience':
                return (
                    <section data-section-id="experience" className="mb-4 break-inside-avoid">
                        {sectionHeader(t('experience'))}
                        <div className="space-y-3">
                            {experience.map(exp => (
                                <div key={exp.id} className="break-inside-avoid text-xs">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-sm font-semibold">{exp.title}</h3>
                                        <div className="text-xs text-gray-600 text-right">
                                            <div className="font-medium">{exp.startDate} - {exp.endDate}</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                       <h4 className="font-semibold italic text-gray-700">{exp.company}</h4>
                                       <div className="text-xs text-gray-600 text-right">{exp.location}</div>
                                    </div>
                                    <ul className="mt-1 list-disc list-inside leading-relaxed space-y-1">
                                        {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'education':
                 return (
                    <section data-section-id="education" className="mb-4 break-inside-avoid">
                        {sectionHeader(t('education'))}
                        <div className="space-y-2">
                            {education.map(edu => (
                                <div key={edu.id} className="flex justify-between items-start break-inside-avoid text-xs">
                                    <div>
                                        <h3 className="text-sm font-semibold">{edu.institution}</h3>
                                        <p className="italic text-gray-700">{edu.degree}</p>
                                    </div>
                                    <div className="text-xs text-gray-600 text-right shrink-0 ml-4">
                                        <div className="font-medium">{edu.startDate} - {edu.endDate}</div>
                                        <div>{edu.location}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'projects':
                return (
                    <section data-section-id="projects" className="mb-4 break-inside-avoid">
                        {sectionHeader(t('projects'))}
                        <div className="space-y-3">
                            {projects.map(proj => (
                                <div key={proj.id} className="break-inside-avoid text-xs">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-sm font-semibold">{proj.name}</h3>
                                        <div className="text-xs font-medium text-gray-600">{proj.date}</div>
                                    </div>
                                    <ul className="mt-1 list-disc list-inside leading-relaxed space-y-1">
                                        {proj.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                );
            case 'customSections':
                return (
                     <div data-section-id="customSections">
                        {customSections.map(sec => sec.content && (
                            <section key={sec.id} className="mb-4 break-inside-avoid">
                                {sectionHeader(sec.title)}
                                <ul className="mt-1 list-disc list-inside text-xs leading-relaxed space-y-1">
                                    {sec.content.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                                </ul>
                            </section>
                        ))}
                    </div>
                );
            case 'skills':
                 return (
                    <section data-section-id="skills" className="break-inside-avoid">
                        {sectionHeader(t('skills'))}
                        <ul className="columns-3 text-xs list-disc list-inside">
                            {skills.map((skill, index) => (
                                <li key={index} className="break-inside-avoid">{skill}</li>
                            ))}
                        </ul>
                    </section>
                );
            default:
                return null;
        }
    };
    
    if (!isVisible(sectionId)) {
        return null;
    }

    return renderContent();
};

export function ResumePreviewClassic() {
    const { resumeData } = useResume();
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    const allContent = (
         <div>
            {resumeData.sections.map(sectionId => (
                <SectionRenderer key={sectionId} sectionId={sectionId} allSections={resumeData.sections}/>
            ))}
        </div>
    );
    
    if (!isClient) {
        return (
             <div className="page-container relative w-[210mm] max-w-full origin-top scale-[0.4] sm:scale-100">
                <div className="a4-page">
                    <div className="a4-content" />
                </div>
            </div>
        )
    }

    return (
        <>
            <div id="resume-preview-container" className="flex items-start justify-center w-full">
                <div className="page-container relative w-[210mm] max-w-full origin-top scale-[0.4] sm:scale-[0.6] md:scale-100">
                    <div className="a4-page-container">
                        <div className="a4-page">
                            <div className="a4-content font-sans">
                                {allContent}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden content for accurate printing */}
            <div id="print-content" className="hidden print:block">
                 <div className="a4-page">
                     <div className="a4-content font-sans">
                        {allContent}
                    </div>
                </div>
            </div>
        </>
    );
}
