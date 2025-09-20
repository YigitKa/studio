
"use client";

import * as React from "react";
import { useResume } from "@/contexts/resume-context";
import type { ResumeData, ResumeSection } from "@/lib/types";

const SectionRenderer: React.FC<{ sectionId: ResumeSection, allSections: ResumeSection[] }> = ({ sectionId, allSections }) => {
    const { resumeData, t } = useResume();
    const { profile, summary, experience, education, skills, projects, customSections, settings } = resumeData;

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
        switch (sectionId) {
            case 'profile':
                return (
                    <header ref={el => sectionRefs.current[sectionId] = el} data-section-id="profile" className="text-center mb-6 break-inside-avoid">
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
                return (
                    <section ref={el => sectionRefs.current[sectionId] = el} data-section-id="summary" className="mb-6 break-inside-avoid">
                        <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">{t('summary')}</h2>
                        <p className="text-sm leading-relaxed">{summary}</p>
                    </section>
                );
            case 'experience':
                return (
                    <section ref={el => sectionRefs.current[sectionId] = el} data-section-id="experience" className="mb-6 break-inside-avoid">
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
                 return (
                    <section ref={el => sectionRefs.current[sectionId] = el} data-section-id="education" className="mb-6 break-inside-avoid">
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
                return (
                    <section ref={el => sectionRefs.current[sectionId] = el} data-section-id="projects" className="mb-6 break-inside-avoid">
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
                return (
                     <div ref={el => sectionRefs.current[sectionId] = el} data-section-id="customSections">
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
                 return (
                    <section ref={el => sectionRefs.current[sectionId] = el} data-section-id="skills" className="break-inside-avoid">
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
    
    const sectionRefs = React.useRef<Record<string, HTMLElement | null>>({});

    if (!isVisible(sectionId)) {
        return null;
    }

    return renderContent();
};

export function ResumePreviewClassic() {
    const { resumeData } = useResume();
    const [isClient, setIsClient] = React.useState(false);
    const [pages, setPages] = React.useState<React.ReactNode[]>([]);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const A4_HEIGHT_PX = 1123; // 297mm at 96 DPI
    const PADDING_PX = 60; // Approximate padding
    const MAX_CONTENT_HEIGHT = A4_HEIGHT_PX - PADDING_PX * 2;


    React.useEffect(() => {
        setIsClient(true);
    }, []);

    React.useEffect(() => {
        if (!isClient || !contentRef.current) return;

        const allVisibleSections = resumeData.sections.filter(sectionId => {
            const sectionData = resumeData[sectionId as keyof ResumeData];
            const settingsKey = `show${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}` as keyof typeof resumeData.settings;
            let isVisible = sectionId === 'profile' || !!resumeData.settings[settingsKey];
            if (!isVisible) return false;
            if (Array.isArray(sectionData) && sectionData.length === 0) return false;
            if (typeof sectionData === 'string' && !sectionData.trim()) return false;
            if (sectionId === 'customSections' && resumeData.customSections.every(s => !s.content.trim())) return false;
            return true;
        });

        const newPages: React.ReactNode[] = [];
        let currentPageSections: ResumeSection[] = [];
        let currentPageHeight = 0;

        const tempRenderDiv = document.createElement('div');
        tempRenderDiv.style.width = '210mm';
        tempRenderDiv.style.position = 'absolute';
        tempRenderDiv.style.visibility = 'hidden';
        document.body.appendChild(tempRenderDiv);

        allVisibleSections.forEach(sectionId => {
            const sectionNode = contentRef.current?.querySelector(`[data-section-id="${sectionId}"]`);
            if (sectionNode) {
                const sectionHeight = sectionNode.scrollHeight;
                if (currentPageHeight + sectionHeight > MAX_CONTENT_HEIGHT && currentPageSections.length > 0) {
                    newPages.push(currentPageSections);
                    currentPageSections = [sectionId];
                    currentPageHeight = sectionHeight;
                } else {
                    currentPageSections.push(sectionId);
                    currentPageHeight += sectionHeight;
                }
            }
        });
        
        if (currentPageSections.length > 0) {
            newPages.push(currentPageSections);
        }

        document.body.removeChild(tempRenderDiv);

        setPages(newPages.map((pageSections, i) => (
             <div key={i} className="a4-page-container">
                <div className="a4-page">
                    <div className="a4-content">
                        {(pageSections as ResumeSection[]).map(sectionId => (
                            <SectionRenderer key={sectionId} sectionId={sectionId} allSections={resumeData.sections} />
                        ))}
                    </div>
                </div>
            </div>
        )));

    }, [resumeData, isClient, MAX_CONTENT_HEIGHT]);


    const allContent = (
         <div ref={contentRef}>
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
            <div className="page-container relative w-[210mm] max-w-full origin-top scale-[0.4] sm:scale-[0.6] md:scale-100">
                {pages.length > 0 ? pages : (
                     <div className="a4-page">
                        <div className="a4-content">
                            {allContent}
                        </div>
                    </div>
                )}
            </div>
            {/* Hidden content for accurate height measurement */}
            <div className="absolute top-[-9999px] left-[-9999px] opacity-0" aria-hidden="true">
                 <div className="a4-page">
                    <div className="a4-content">
                        {allContent}
                    </div>
                </div>
            </div>
        </>
    );
}
