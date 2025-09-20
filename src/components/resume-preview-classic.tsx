
"use client";

import * as React from "react";
import { useResume } from "@/contexts/resume-context";
import type { ResumeData, ResumeSection, ExperienceData, EducationData, ProjectData, CustomSectionData } from "@/lib/types";

const A4_HEIGHT_PX = 950; // Approximate height for content area in pixels (297mm - 32mm margins)
const SECTION_TOP_MARGIN = 24; // Corresponds to mb-6
const ITEM_SPACING = 16; // Corresponds to space-y-4

// Function to chunk skills into multiple arrays for columns
const chunkArray = (arr: any[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const SectionRenderer: React.FC<{ sectionId: ResumeSection; content?: any }> = ({ sectionId, content }) => {
    const { resumeData, t } = useResume();
    const { profile, summary, experience, education, skills, projects, customSections, settings } = resumeData;
    const sectionRef = React.useRef<HTMLDivElement>(null);

    const renderContent = () => {
        switch (sectionId) {
            case 'profile':
                return settings.showProfile && (
                    <header ref={sectionRef} data-section-id="profile" className="text-center mb-6">
                        <h1 className="text-4xl font-bold tracking-wider">{profile.name}</h1>
                        <p className="text-lg font-medium text-gray-700 mt-1">{profile.title}</p>
                        <div className="flex justify-center items-center gap-x-4 text-xs mt-2 text-gray-600">
                            <span>{profile.phone}</span>
                            <span className="text-gray-400">•</span>
                            <a href={`mailto:${profile.email}`} className="text-blue-600 hover:underline">{profile.email}</a>
                            <span className="text-gray-400">•</span>
                            <span>{profile.address}</span>
                        </div>
                        <hr className="mt-6 mb-0" />
                    </header>
                );
            case 'summary':
                return settings.showSummary && summary && (
                    <section ref={sectionRef} data-section-id="summary" className="mb-6">
                        <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">{t('summary')}</h2>
                        <p className="text-sm leading-relaxed">{summary}</p>
                    </section>
                );
            case 'experience':
                return settings.showExperience && experience.length > 0 && (
                    <section ref={sectionRef} data-section-id="experience" className="mb-6">
                        <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">{t('experience')}</h2>
                        <div className="space-y-4">
                            {(content as ExperienceData[] || experience).map(exp => (
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
                );
            case 'education':
                 return settings.showEducation && education.length > 0 && (
                    <section ref={sectionRef} data-section-id="education" className="mb-6">
                        <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">{t('education')}</h2>
                        <div className="space-y-2">
                            {(content as EducationData[] || education).map(edu => (
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
                );
            case 'projects':
                return settings.showProjects && projects.length > 0 && (
                    <section ref={sectionRef} data-section-id="projects" className="mb-6">
                        <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">{t('projects')}</h2>
                        <div className="space-y-4">
                            {(content as ProjectData[] || projects).map(proj => (
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
                );
            case 'customSections':
                return settings.showCustomSections && customSections.length > 0 && (
                     <div ref={sectionRef} data-section-id="customSections">
                        {(content as CustomSectionData[] || customSections).map(sec => sec.content && (
                            <section key={sec.id} className="mb-6">
                                <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">{sec.title}</h2>
                                <ul className="mt-1 list-disc list-inside text-sm leading-relaxed space-y-1 pl-2">
                                    {sec.content.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                                </ul>
                            </section>
                        ))}
                    </div>
                );
            case 'skills':
                 const skillColumns = chunkArray(skills, Math.ceil(skills.length / 3));
                 return settings.showSkills && skills.length > 0 && (
                    <section ref={sectionRef} data-section-id="skills">
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
    const { sections, profile } = resumeData;
    const [pages, setPages] = React.useState<React.ReactNode[][]>([[]]);
    const measuringDivRef = React.useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    const measureAndChunk = React.useCallback(() => {
        if (!measuringDivRef.current || !isClient) return;

        const allPages: React.ReactNode[][] = [];
        let currentPage: React.ReactNode[] = [];
        let currentPageHeight = 0;

        const headerElement = measuringDivRef.current.querySelector('[data-section-id="profile"]');
        const headerHeight = headerElement ? headerElement.clientHeight + SECTION_TOP_MARGIN : 0;
        
        let pageHeader: React.ReactNode = null;
        if (resumeData.settings.showProfile) {
           pageHeader = <SectionRenderer sectionId="profile" />;
        }

        const processSection = (sectionId: ResumeSection) => {
            const sectionWrapper = measuringDivs.get(sectionId);
            if (!sectionWrapper) return;
            
            const sectionElement = sectionWrapper.firstElementChild as HTMLElement;
            if (!sectionElement || sectionElement.clientHeight === 0) return;
            
            const sectionHeight = sectionElement.clientHeight + SECTION_TOP_MARGIN;
            const isSplittable = ['experience', 'projects', 'customSections'].includes(sectionId);

            if (currentPageHeight + sectionHeight <= A4_HEIGHT_PX) {
                currentPage.push(<SectionRenderer key={sectionId} sectionId={sectionId} />);
                currentPageHeight += sectionHeight;
            } else {
                 if (isSplittable) {
                    const items = resumeData[sectionId as 'experience' | 'projects' | 'customSections'];
                    let currentItems: any[] = [];
                    let itemsHeight = sectionElement.querySelector('h2')!.clientHeight + 8; // h2 + pb-1 + mb-2

                    for (const item of items) {
                        const itemDiv = document.createElement('div');
                        measuringDivRef.current!.appendChild(itemDiv);
                        
                        const itemComponent = <SectionRenderer key={`${sectionId}-${item.id}`} sectionId={sectionId} content={[item]} />;
                        const tempDiv = document.createElement('div');
                        measuringDivRef.current!.appendChild(tempDiv);
                        // This is a bit of a hack to render and measure
                        // In a real scenario, you might need a more robust way to measure React components
                        const itemHeight = 50 + (item.description || item.content || '').split('\n').length * 20;

                        if (currentPageHeight + itemsHeight + itemHeight > A4_HEIGHT_PX) {
                            if (currentItems.length > 0) {
                                currentPage.push(<SectionRenderer key={`${sectionId}-chunk-${allPages.length}`} sectionId={sectionId} content={currentItems} />);
                            }
                            allPages.push(currentPage);
                            currentPage = [];
                            currentPageHeight = headerHeight;
                            if (headerHeight > 0) currentPage.push(pageHeader);
                            currentItems = [item];
                            itemsHeight = sectionElement.querySelector('h2')!.clientHeight + 8;
                        } else {
                            currentItems.push(item);
                            itemsHeight += itemHeight + ITEM_SPACING;
                        }
                    }
                    if (currentItems.length > 0) {
                        currentPage.push(<SectionRenderer key={`${sectionId}-chunk-${allPages.length}`} sectionId={sectionId} content={currentItems} />);
                        currentPageHeight += itemsHeight;
                    }

                } else {
                    allPages.push(currentPage);
                    currentPage = [];
                    currentPageHeight = headerHeight;
                    if (headerHeight > 0) currentPage.push(pageHeader);

                    currentPage.push(<SectionRenderer key={sectionId} sectionId={sectionId} />);
                    currentPageHeight += sectionHeight;
                }
            }
        };

        if (headerHeight > 0) {
            currentPageHeight += headerHeight;
        }

        const measuringDivs = new Map<string, HTMLDivElement>();
        sections.forEach(id => {
            if (id === 'profile' && resumeData.settings.showProfile) {
                // already handled
            } else {
                const div = document.createElement('div');
                div.style.position = 'absolute';
                div.style.visibility = 'hidden';
                div.style.width = '186mm'; // 210mm - 2*12mm padding
                measuringDivRef.current!.appendChild(div);
                measuringDivs.set(id, div);
            }
        });

        const tempReactDiv = document.createElement('div');
        measuringDivRef.current!.appendChild(tempReactDiv);

        // This is complex to do correctly with React's rendering cycle
        // For now, let's just do a simple page break logic
        const renderedSections = sections.map(sectionId => {
            if (sectionId === 'profile' && resumeData.settings.showProfile) return pageHeader;
            const sectionData = resumeData[sectionId as keyof ResumeData];
            if (Array.isArray(sectionData) && sectionData.length === 0) return null;
            if (typeof sectionData === 'string' && !sectionData) return null;
            if (!resumeData.settings[`show${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}` as keyof typeof resumeData.settings]) return null;
            
            return <SectionRenderer key={sectionId} sectionId={sectionId} />;
        }).filter(Boolean);

        let tempPage: React.ReactNode[] = [];
        let tempHeight = 0;
        
        if (resumeData.settings.showProfile) {
          const headerEl = <SectionRenderer key="profile" sectionId="profile" />
          tempPage.push(headerEl);
          // approximation
          tempHeight += 120;
        }

        for (const sectionId of sections) {
          if (sectionId === 'profile') continue;
           const sectionData = resumeData[sectionId as keyof ResumeData];
           const settingsKey = `show${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}` as keyof typeof resumeData.settings;
           if (!resumeData.settings[settingsKey]) continue;
           if (Array.isArray(sectionData) && sectionData.length === 0) continue;
           if (typeof sectionData === 'string' && !sectionData) continue;
           if(sectionId === 'customSections' && resumeData.customSections.every(s => !s.content)) continue;


           // Simplified height estimation
           let sectionHeight = 50; // title
           if (sectionId === 'summary') sectionHeight += resumeData.summary.length / 3;
           if (sectionId === 'experience') sectionHeight += resumeData.experience.length * 100;
           if (sectionId === 'education') sectionHeight += resumeData.education.length * 60;
           if (sectionId === 'projects') sectionHeight += resumeData.projects.length * 80;
           if (sectionId === 'skills') sectionHeight += resumeData.skills.length * 8;
           if (sectionId === 'customSections') sectionHeight += resumeData.customSections.length * 80;


           if (tempHeight + sectionHeight > A4_HEIGHT_PX) {
               allPages.push(tempPage);
               tempPage = [];
               tempHeight = 0;
           }
           tempPage.push(<SectionRenderer key={sectionId} sectionId={sectionId} />);
           tempHeight += sectionHeight;
        }
        if (tempPage.length > 0) {
            allPages.push(tempPage);
        }

        setPages(allPages);

        // Cleanup
        measuringDivs.forEach(div => div.remove());
        tempReactDiv.remove();

    }, [resumeData, isClient, sections]);

    React.useEffect(() => {
        // Debounce or use ResizeObserver for better performance
        measureAndChunk();
        window.addEventListener('resize', measureAndChunk);
        return () => window.removeEventListener('resize', measureAndChunk);
    }, [measureAndChunk]);

    if (!isClient) {
        return (
             <div 
                id="resume-preview"
                className="page-preview bg-white text-gray-800 shadow-2xl font-sans"
            >
                <div className="a4-content-container">
                    {/* Render a placeholder or loader */}
                </div>
            </div>
        )
    }

    return (
        <div 
            id="resume-preview" 
            className="page-preview bg-transparent text-gray-800 font-sans flex flex-col gap-8 items-center"
            style={{ minHeight: 0, height: 'auto' }}
        >
           {pages.map((pageContent, i) => (
                <div key={i} className="a4-content-container shadow-2xl">
                    {pageContent}
                </div>
           ))}
           <div ref={measuringDivRef} style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: '210mm', visibility: 'hidden' }}></div>
        </div>
    );
}
