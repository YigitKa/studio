
"use client";

import * as React from "react";
import { useResume } from "@/contexts/resume-context";
import type { ResumeData, ResumeSection, ExperienceData, EducationData, ProjectData, CustomSectionData } from "@/lib/types";

const SectionRenderer: React.FC<{ sectionId: ResumeSection }> = ({ sectionId }) => {
    const { resumeData, t } = useResume();
    const { profile, summary, experience, education, skills, projects, customSections, settings } = resumeData;

    const renderContent = () => {
        switch (sectionId) {
            case 'profile':
                return settings.showProfile && (
                    <header data-section-id="profile" className="text-center mb-6">
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
                    <section data-section-id="summary" className="mb-6">
                        <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-2">{t('summary')}</h2>
                        <p className="text-sm leading-relaxed">{summary}</p>
                    </section>
                );
            case 'experience':
                return settings.showExperience && experience.length > 0 && (
                    <section data-section-id="experience" className="mb-6">
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
                    <section data-section-id="education" className="mb-6">
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
                    <section data-section-id="projects" className="mb-6">
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
                    <section data-section-id="skills">
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
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    const content = resumeData.sections.map(sectionId => {
        const sectionData = resumeData[sectionId as keyof ResumeData];
        const settingsKey = `show${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}` as keyof typeof resumeData.settings;
        if (sectionId !== 'profile' && !resumeData.settings[settingsKey]) return null;
        if (Array.isArray(sectionData) && sectionData.length === 0) return null;
        if (typeof sectionData === 'string' && !sectionData) return null;
        if (sectionId === 'customSections' && resumeData.customSections.every(s => !s.content)) return null;

        return <SectionRenderer key={sectionId} sectionId={sectionId} />;
    }).filter(Boolean);

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
            className="page-preview bg-white text-gray-800 shadow-2xl font-sans"
        >
            <div className="a4-content-container">
                {content}
            </div>
        </div>
    );
}
