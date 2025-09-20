"use client";

import { useResume } from "@/contexts/resume-context";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { GripVertical, Plus, Sparkles, Trash2 } from "lucide-react";
import { PhotoUploader } from "./photo-uploader";
import { useTransition, useState, useEffect } from "react";
import { enhanceSectionAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "./ui/switch";
import type { ResumeSection, ResumeSettings } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';

const SortableCard = ({ id, children }: { id: string, children: React.ReactNode }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card>
        <div className="relative">
          <button {...attributes} {...listeners} className="absolute top-4 right-3 text-muted-foreground cursor-grab p-2 z-10 hidden md:block">
            <GripVertical />
          </button>
          {children}
        </div>
      </Card>
    </div>
  );
};


export default function ResumeEditor() {
  const { resumeData, setResumeData, t } = useResume();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, profile: { ...prev.profile, [name]: value } }));
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData(prev => ({ ...prev, summary: e.target.value }));
  };
  
  const handleExperienceChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => (exp.id === id ? { ...exp, [name]: value } : exp)),
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: `exp${Date.now()}`, title: '', company: '', location: '', startDate: '', endDate: '', description: '' }],
    }));
  };
  
  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id),
    }));
  };

  const clearAllExperience = () => {
    setResumeData(prev => ({ ...prev, experience: [] }));
  };
  
  const handleEducationChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => (edu.id === id ? { ...edu, [name]: value } : edu)),
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { id: `edu${Date.now()}`, degree: '', institution: '', location: '', startDate: '', endDate: '' }],
    }));
  };
  
  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id),
    }));
  };

  const clearAllEducation = () => {
    setResumeData(prev => ({ ...prev, education: [] }));
  };

  const handleProjectChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => (proj.id === id ? { ...proj, [name]: value } : proj)),
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { id: `proj${Date.now()}`, name: '', date: '', description: '' }],
    }));
  };

  const removeProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id),
    }));
  };

  const clearAllProjects = () => {
    setResumeData(prev => ({ ...prev, projects: [] }));
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = value;
    setResumeData(prev => ({ ...prev, skills: newSkills }));
  };

  const addSkill = () => {
    setResumeData(prev => ({ ...prev, skills: [...prev.skills, ''] }));
  };
  
  const removeSkill = (index: number) => {
    setResumeData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  };

  const clearAllSkills = () => {
    setResumeData(prev => ({ ...prev, skills: [] }));
  };

  const handleCustomSectionChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.map(sec => (sec.id === id ? { ...sec, [name]: value } : sec)),
    }));
  };

  const addCustomSection = () => {
    setResumeData(prev => ({
      ...prev,
      customSections: [...(prev.customSections || []), { id: `custom${Date.now()}`, title: '', content: '' }],
    }));
  };

  const removeCustomSection = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.filter(sec => sec.id !== id),
    }));
  };

  const handleEnhance = (
    content: string,
    updater: (enhancedContent: string) => void
  ) => {
    startTransition(async () => {
      const result = await enhanceSectionAction(content, "en");
      if ("enhancedContent" in result) {
        updater(result.enhancedContent);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      }
    });
  };

  const handleToggleSection = (section: keyof ResumeSettings) => {
    setResumeData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [section]: !prev.settings[section],
      },
    }));
  };
  
  const SectionHeader = ({ title, sectionKey, onDrag }: { title: string; sectionKey: keyof ResumeSettings, onDrag?: any }) => (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <button {...onDrag} className="text-muted-foreground cursor-grab p-2 md:hidden">
          <GripVertical />
        </button>
        <CardTitle>{title}</CardTitle>
      </div>
      <div className="flex items-center gap-2 pr-2">
        <Switch
          checked={resumeData.settings[sectionKey]}
          onCheckedChange={() => handleToggleSection(sectionKey)}
          aria-label={`Toggle ${title} section`}
        />
      </div>
    </div>
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setResumeData((prev) => {
        const oldIndex = prev.sections.indexOf(active.id as ResumeSection);
        const newIndex = prev.sections.indexOf(over.id as ResumeSection);
        const newSections = [...prev.sections];
        newSections.splice(oldIndex, 1);
        newSections.splice(newIndex, 0, active.id as ResumeSection);
        return { ...prev, sections: newSections };
      });
    }
  };

  const sectionComponents: Record<ResumeSection, React.ReactNode> = {
    profile: (
      <SortableCard id="profile">
        <CardHeader>
           <SectionHeader title={t('profile')} sectionKey="showProfile" />
        </CardHeader>
        <CardContent className="space-y-4">
          <PhotoUploader />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">{t('fullName')}</Label>
              <Input id="name" name="name" value={resumeData.profile.name} onChange={handleProfileChange} className="text-sm md:text-base"/>
            </div>
            <div>
              <Label htmlFor="title">{t('jobTitle')}</Label>
              <Input id="title" name="title" value={resumeData.profile.title} onChange={handleProfileChange} className="text-sm md:text-base"/>
            </div>
            <div>
              <Label htmlFor="phone">{t('phone')}</Label>
              <Input id="phone" name="phone" type="tel" value={resumeData.profile.phone} onChange={handleProfileChange} className="text-sm md:text-base"/>
            </div>
            <div>
              <Label htmlFor="email">{t('email')}</Label>
              <Input id="email" name="email" type="email" value={resumeData.profile.email} onChange={handleProfileChange} className="text-sm md:text-base"/>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">{t('address')}</Label>
              <Input id="address" name="address" value={resumeData.profile.address} onChange={handleProfileChange} className="text-sm md:text-base"/>
            </div>
          </div>
        </CardContent>
      </SortableCard>
    ),
    summary: (
      <SortableCard id="summary">
        <CardHeader>
           <SectionHeader title={t('summary')} sectionKey="showSummary" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Label htmlFor="summary-text" className="sr-only">{t('summary')}</Label>
          <Textarea id="summary-text" placeholder={t('summaryPlaceholder')} value={resumeData.summary} onChange={handleSummaryChange} rows={5} className="text-sm md:text-base"/>
          <Button variant="outline" size="sm" onClick={() => handleEnhance(resumeData.summary, (content) => setResumeData(p => ({...p, summary: content})))} disabled={isPending}>
            <Sparkles className="mr-2 h-4 w-4" /> {isPending ? t('enhancing') : t('enhanceWithAI')}
          </Button>
        </CardContent>
      </SortableCard>
    ),
    experience: (
      <SortableCard id="experience">
        <CardHeader>
           <SectionHeader title={t('experience')} sectionKey="showExperience" />
        </CardHeader>
        <CardContent>
           <Accordion type="multiple" className="w-full space-y-4">
            {resumeData.experience.map((exp, index) => (
              <AccordionItem value={exp.id} key={exp.id} className="border rounded-lg bg-background">
                <div className="flex items-center p-4">
                  <AccordionTrigger className="p-0 text-sm font-semibold w-full hover:no-underline flex justify-between">
                      <span className="pr-4">{exp.title || t('jobTitle')} at {exp.company || t('company')}</span>
                  </AccordionTrigger>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive shrink-0" onClick={(e) => { e.stopPropagation(); removeExperience(exp.id);}}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <AccordionContent className="space-y-4 p-4 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`exp-title-${index}`}>{t('jobTitle')}</Label>
                      <Input id={`exp-title-${index}`} name="title" value={exp.title} onChange={e => handleExperienceChange(exp.id, e)} className="text-sm md:text-base"/>
                    </div>
                    <div>
                      <Label htmlFor={`exp-company-${index}`}>{t('company')}</Label>
                      <Input id={`exp-company-${index}`} name="company" value={exp.company} onChange={e => handleExperienceChange(exp.id, e)} className="text-sm md:text-base"/>
                    </div>
                     <div>
                      <Label htmlFor={`exp-location-${index}`}>{t('location')}</Label>
                      <Input id={`exp-location-${index}`} name="location" value={exp.location} onChange={e => handleExperienceChange(exp.id, e)} className="text-sm md:text-base"/>
                    </div>
                    <div>
                      <Label htmlFor={`exp-startDate-${index}`}>{t('startDate')}</Label>
                      <Input id={`exp-startDate-${index}`} name="startDate" value={exp.startDate} onChange={e => handleExperienceChange(exp.id, e)} className="text-sm md:text-base"/>
                    </div>
                    <div>
                      <Label htmlFor={`exp-endDate-${index}`}>{t('endDate')}</Label>
                      <Input id={`exp-endDate-${index}`} name="endDate" value={exp.endDate} onChange={e => handleExperienceChange(exp.id, e)} className="text-sm md:text-base"/>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`exp-desc-${index}`}>{t('description')}</Label>
                    <Textarea id={`exp-desc-${index}`} name="description" placeholder={t('descriptionPlaceholder')} value={exp.description} onChange={e => handleExperienceChange(exp.id, e)} rows={4} className="text-sm md:text-base"/>
                     <Button variant="outline" size="sm" onClick={() => handleEnhance(exp.description, (content) => handleExperienceChange(exp.id, { target: { name: 'description', value: content } } as any))} disabled={isPending}>
                        <Sparkles className="mr-2 h-4 w-4" /> {isPending ? t('enhancing') : t('enhanceWithAI')}
                     </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={addExperience}><Plus className="mr-2 h-4 w-4" /> {t('addExperience')}</Button>
              {resumeData.experience.length > 0 && (
                  <Button variant="destructive" onClick={clearAllExperience}><Trash2 className="mr-2 h-4 w-4" /> Clear All</Button>
              )}
          </div>
        </CardContent>
      </SortableCard>
    ),
    education: (
      <SortableCard id="education">
        <CardHeader>
           <SectionHeader title={t('education')} sectionKey="showEducation" />
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full space-y-4">
            {resumeData.education.map((edu, index) => (
               <AccordionItem value={edu.id} key={edu.id} className="border rounded-lg bg-background">
                <div className="flex items-center p-4">
                  <AccordionTrigger className="p-0 text-sm font-semibold w-full hover:no-underline flex justify-between">
                      <span className="pr-4">{edu.degree || t('degree')} at {edu.institution || t('institution')}</span>
                  </AccordionTrigger>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive shrink-0" onClick={(e) => { e.stopPropagation(); removeEducation(edu.id);}}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <AccordionContent className="space-y-4 p-4 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`edu-degree-${index}`}>{t('degree')}</Label>
                      <Input id={`edu-degree-${index}`} name="degree" value={edu.degree} onChange={e => handleEducationChange(edu.id, e)} className="text-sm md:text-base"/>
                    </div>
                    <div>
                      <Label htmlFor={`edu-institution-${index}`}>{t('institution')}</Label>
                      <Input id={`edu-institution-${index}`} name="institution" value={edu.institution} onChange={e => handleEducationChange(edu.id, e)} className="text-sm md:text-base"/>
                    </div>
                    <div>
                      <Label htmlFor={`edu-location-${index}`}>{t('location')}</Label>
                      <Input id={`edu-location-${index}`} name="location" value={edu.location} onChange={e => handleEducationChange(edu.id, e)} className="text-sm md:text-base"/>
                    </div>
                    <div>
                      <Label htmlFor={`edu-startDate-${index}`}>{t('startDate')}</Label>
                      <Input id={`edu-startDate-${index}`} name="startDate" value={edu.startDate} onChange={e => handleEducationChange(edu.id, e)} className="text-sm md:text-base"/>
                    </div>
                     <div>
                      <Label htmlFor={`edu-endDate-${index}`}>{t('endDate')}</Label>
                      <Input id={`edu-endDate-${index}`} name="endDate" value={edu.endDate} onChange={e => handleEducationChange(edu.id, e)} className="text-sm md:text-base"/>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={addEducation}><Plus className="mr-2 h-4 w-4" /> {t('addEducation')}</Button>
              {resumeData.education.length > 0 && (
                  <Button variant="destructive" onClick={clearAllEducation}><Trash2 className="mr-2 h-4 w-4" /> Clear All</Button>
              )}
          </div>
        </CardContent>
      </SortableCard>
    ),
    projects: (
      <SortableCard id="projects">
        <CardHeader>
           <SectionHeader title={t('projects')} sectionKey="showProjects" />
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full space-y-4">
            {resumeData.projects.map((proj, index) => (
              <AccordionItem value={proj.id} key={proj.id} className="border rounded-lg bg-background">
                 <div className="flex items-center p-4">
                    <AccordionTrigger className="p-0 text-sm font-semibold w-full hover:no-underline flex justify-between">
                        <span className="pr-4">{proj.name || t('projectName')}</span>
                    </AccordionTrigger>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive shrink-0" onClick={(e) => { e.stopPropagation(); removeProject(proj.id);}}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
                <AccordionContent className="space-y-4 p-4 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`proj-name-${index}`}>{t('projectName')}</Label>
                      <Input id={`proj-name-${index}`} name="name" value={proj.name} onChange={e => handleProjectChange(proj.id, e)} className="text-sm md:text-base"/>
                    </div>
                    <div>
                      <Label htmlFor={`proj-date-${index}`}>{t('projectDate')}</Label>
                      <Input id={`proj-date-${index}`} name="date" value={proj.date} onChange={e => handleProjectChange(proj.id, e)} className="text-sm md:text-base"/>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`proj-desc-${index}`}>{t('description')}</Label>
                    <Textarea id={`proj-desc-${index}`} name="description" placeholder={t('descriptionPlaceholder')} value={proj.description} onChange={e => handleProjectChange(proj.id, e)} rows={4} className="text-sm md:text-base"/>
                     <Button variant="outline" size="sm" onClick={() => handleEnhance(proj.description, (content) => handleProjectChange(proj.id, { target: { name: 'description', value: content } } as any))} disabled={isPending}>
                        <Sparkles className="mr-2 h-4 w-4" /> {isPending ? t('enhancing') : t('enhanceWithAI')}
                     </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
            </Accordion>
            <div className="flex gap-2 mt-4">
                <Button variant="outline" onClick={addProject}><Plus className="mr-2 h-4 w-4" /> {t('addProject')}</Button>
                {resumeData.projects.length > 0 && (
                    <Button variant="destructive" onClick={clearAllProjects}><Trash2 className="mr-2 h-4 w-4" /> Clear All</Button>
                )}
            </div>
        </CardContent>
      </SortableCard>
    ),
    skills: (
      <SortableCard id="skills">
        <CardHeader>
           <SectionHeader title={t('skills')} sectionKey="showSkills" />
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {resumeData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                         <Input placeholder={t('skillPlaceholder')} value={skill} onChange={e => handleSkillChange(index, e.target.value)} className="text-sm md:text-base"/>
                         <Button variant="ghost" size="icon" onClick={() => removeSkill(index)}>
                             <Trash2 className="h-4 w-4 text-destructive" />
                         </Button>
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={addSkill}><Plus className="mr-2 h-4 w-4" /> {t('addSkill')}</Button>
              {resumeData.skills.length > 0 && (
                  <Button variant="destructive" onClick={clearAllSkills}><Trash2 className="mr-2 h-4 w-4" /> Clear All</Button>
              )}
            </div>
        </CardContent>
      </SortableCard>
    ),
    customSections: (
      <SortableCard id="customSections">
        <CardHeader>
           <SectionHeader title={t('customSections')} sectionKey="showCustomSections" />
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full space-y-4">
             {resumeData.customSections && resumeData.customSections.map((sec, index) => (
              <AccordionItem value={sec.id} key={sec.id} className="border rounded-lg bg-background">
                 <div className="flex items-center p-4">
                    <AccordionTrigger className="p-0 text-sm font-semibold w-full hover:no-underline flex justify-between">
                        <span className="pr-4">{sec.title || t('sectionTitle')}</span>
                    </AccordionTrigger>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive shrink-0" onClick={(e) => { e.stopPropagation(); removeCustomSection(sec.id);}}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
                <AccordionContent className="space-y-4 p-4 pt-0">
                  <div>
                    <Label htmlFor={`custom-title-${index}`}>{t('sectionTitle')}</Label>
                    <Input id={`custom-title-${index}`} name="title" value={sec.title} onChange={e => handleCustomSectionChange(sec.id, e)} className="text-sm md:text-base"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`custom-content-${index}`}>{t('content')}</Label>
                    <Textarea id={`custom-content-${index}`} name="content" value={sec.content} onChange={e => handleCustomSectionChange(sec.id, e)} rows={4} className="text-sm md:text-base"/>
                    <Button variant="outline" size="sm" onClick={() => handleEnhance(sec.content, (content) => handleCustomSectionChange(sec.id, { target: { name: 'content', value: content } } as any))} disabled={isPending}>
                      <Sparkles className="mr-2 h-4 w-4" /> {isPending ? t('enhancing') : t('enhanceWithAI')}
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Button variant="outline" onClick={addCustomSection} className="mt-4"><Plus className="mr-2 h-4 w-4" /> {t('addCustomSection')}</Button>
        </CardContent>
      </SortableCard>
    ),
  };

  const DraggableResumeEditor = () => (
     <DndContext
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
    >
      <SortableContext
        items={resumeData.sections}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-6">
          {resumeData.sections.map((sectionId) => (
            <div key={sectionId}>{sectionComponents[sectionId]}</div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )

  if (!isClient) {
    return (
      <div className="space-y-6">
        {resumeData.sections.map((sectionId) => (
          <div key={sectionId}>{sectionComponents[sectionId]}</div>
        ))}
      </div>
    );
  }

  return <DraggableResumeEditor />;
}
