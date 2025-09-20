
"use client";

import * as React from "react";
import { useResume } from "@/contexts/resume-context";
import type { ResumeData, ResumeSection } from "@/lib/types";
import { cn } from "@/lib/utils";

const SectionRenderer: React.FC<{ sectionId: ResumeSection }> = ({ sectionId }) => {
    const { resumeData, t } = useResume();
    const { profile, summary, experience, education, skills, projects, customSections, settings } = resumeData;

    const renderContent = () => {
        switch (sectionId) {
            case 'profile':
                return settings.showProfile && (
                    <header data-section-id="profile" className="text-center mb-6 break-inside-avoid">
                        {profile.photoUrl && <img src={profile.photoUrl} alt={profile.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />}
                        <h1 className="text-4xl font-bold tracking-wider">{profile.name}</h1>
                        <p className="text-lg font-medium text-gray-700 mt-1">{profile.title}</p>
                        <div className="flex justify-center items-center flex-wrap gap-x-4 text-xs mt-2 text-gray-600">
                            <span>{profile.phone}</span>
                            <span className="text-gray-400 hidden sm:inline">•</span>
                            <a href={`mailto:${profile.email}`} className="text-blue-600 hover:underline">{profile.email}</a>
                            <span className="text-gray-400 hidden sm:inline">•</span>
                            <span>{profile.address}</span>
                        </div>
                        <hr className="mt-6 mb-0" />
                    </header>
                );
            case 'summary':
                return settings.showSummary && summary && (
                    <section data-section-id="summary" className="mb-6 break-inside-avoid">
                        <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">{t('summary')}</h2>
                        <p className="text-sm leading-relaxed">{summary}</p>
                    </section>
                );
            case 'experience':
                return settings.showExperience && experience.length > 0 && (
                    <section data-section-id="experience" className="mb-6 break-inside-avoid">
                        <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">{t('experience')}</h2>
                        <div className="space-y-4">
                            {experience.map(exp => (
                                <div key={exp.id} className="break-inside-avoid">
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
                );
            case 'education':
                 return settings.showEducation && education.length > 0 && (
                    <section data-section-id="education" className="mb-6 break-inside-avoid">
                        <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">{t('education')}</h2>
                        <div className="space-y-2">
                            {education.map(edu => (
                                <div key={edu.id} className="flex justify-between items-baseline break-inside-avoid">
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
                );
            case 'projects':
                return settings.showProjects && projects.length > 0 && (
                    <section data-section-id="projects" className="mb-6 break-inside-avoid">
                        <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">{t('projects')}</h2>
                        <div className="space-y-4">
                            {projects.map(proj => (
                                <div key={proj.id} className="break-inside-avoid">
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
                );
            case 'customSections':
                return settings.showCustomSections && customSections.length > 0 && customSections.some(s => s.content) && (
                     <div data-section-id="customSections">
                        {customSections.map(sec => sec.content && (
                            <section key={sec.id} className="mb-6 break-inside-avoid">
                                <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">{sec.title}</h2>
                                <ul className="mt-1 list-disc list-inside text-sm leading-relaxed space-y-1 pl-2">
                                    {sec.content.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                                </ul>
                            </section>
                        ))}
                    </div>
                );
            case 'skills':
                 const skillColumns = Array.from({ length: 3 }, (_, i) => skills.filter((__, index) => index % 3 === i));
                 return settings.showSkills && skills.length > 0 && (
                    <section data-section-id="skills" className="break-inside-avoid">
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
                );
            default:
                return null;
        }
    };

    return renderContent();
};

export function ResumePreviewClassic() {
    const { resumeData } = useResume();
    const [pages, setPages] = React.useState<React.ReactNode[]>([]);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    React.useEffect(() => {
        if (!isClient || !contentRef.current) return;

        const contentEl = contentRef.current;
        const A4_HEIGHT_PX = 1122.5; 
        const PADDING_PX = 60.5;
        const USABLE_HEIGHT = A4_HEIGHT_PX - PADDING_PX * 2;
        
        const allSections = Array.from(contentEl.children) as HTMLElement[];
        let currentPage: HTMLElement[] = [];
        let currentPageHeight = 0;
        const newPages: React.ReactNode[] = [];

        const createPage = (nodes: HTMLElement[], key: number) => (
            <div key={key} className="a4-page">
                <div className="a4-content" dangerouslySetInnerHTML={{ __html: nodes.map(n => n.outerHTML).join('') }} />
            </div>
        );

        allSections.forEach((section) => {
            const sectionHeight = section.offsetHeight;
            if (currentPageHeight + sectionHeight > USABLE_HEIGHT && currentPage.length > 0) {
                newPages.push(createPage(currentPage, newPages.length));
                currentPage = [];
                currentPageHeight = 0;
            }
            currentPage.push(section);
            currentPageHeight += sectionHeight;
        });

        if (currentPage.length > 0) {
            newPages.push(createPage(currentPage, newPages.length));
        }

        setPages(newPages);

    }, [resumeData, isClient]);

    const allContent = (
        <>
            {resumeData.sections.map(sectionId => {
                const sectionData = resumeData[sectionId as keyof ResumeData];
                const settingsKey = `show${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}` as keyof typeof resumeData.settings;
                
                let isVisible = true;
                if (sectionId !== 'profile') {
                    isVisible = !!resumeData.settings[settingsKey];
                }

                if (!isVisible) return null;

                if (Array.isArray(sectionData) && sectionData.length === 0) return null;
                if (typeof sectionData === 'string' && !sectionData) return null;
                if (sectionId === 'customSections' && resumeData.customSections.every(s => !s.content)) return null;

                return <SectionRenderer key={sectionId} sectionId={sectionId} />;
            })}
        </>
    );

    if (!isClient) {
        return (
             <div className="page-container">
                <div className="a4-page">
                    <div className="a4-content">
                        {/* Render a placeholder or loader */}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div ref={contentRef} className="absolute -z-50 opacity-0 pointer-events-none w-[210mm] p-[16mm] box-border">
                {allContent}
            </div>
            <div id="resume-preview" className="page-container space-y-4">
                {pages.length > 0 ? pages : (
                    <div className="a4-page">
                        <div className="a4-content">
                            {/* Loading or empty state */}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
