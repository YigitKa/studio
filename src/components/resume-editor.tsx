"use client";

import { useResume } from "@/contexts/resume-context";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Plus, Sparkles, Trash2 } from "lucide-react";
import { PhotoUploader } from "./photo-uploader";
import { useTransition } from "react";
import { enhanceSectionAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

export default function ResumeEditor() {
  const { resumeData, setResumeData, t } = useResume();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

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

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={["profile", "summary", "experience", "education", "projects", "skills"]} className="w-full">
        <AccordionItem value="profile">
          <AccordionTrigger className="text-lg font-semibold">{t('profile')}</AccordionTrigger>
          <AccordionContent className="space-y-4 p-1">
            <PhotoUploader />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">{t('fullName')}</Label>
                <Input id="name" name="name" value={resumeData.profile.name} onChange={handleProfileChange} />
              </div>
              <div>
                <Label htmlFor="title">{t('jobTitle')}</Label>
                <Input id="title" name="title" value={resumeData.profile.title} onChange={handleProfileChange} />
              </div>
              <div>
                <Label htmlFor="phone">{t('phone')}</Label>
                <Input id="phone" name="phone" type="tel" value={resumeData.profile.phone} onChange={handleProfileChange} />
              </div>
              <div>
                <Label htmlFor="email">{t('email')}</Label>
                <Input id="email" name="email" type="email" value={resumeData.profile.email} onChange={handleProfileChange} />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">{t('address')}</Label>
                <Input id="address" name="address" value={resumeData.profile.address} onChange={handleProfileChange} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="summary">
          <AccordionTrigger className="text-lg font-semibold">{t('summary')}</AccordionTrigger>
          <AccordionContent className="space-y-2 p-1">
            <Label htmlFor="summary-text">{t('summary')}</Label>
            <Textarea id="summary-text" placeholder={t('summaryPlaceholder')} value={resumeData.summary} onChange={handleSummaryChange} rows={5} />
            <Button variant="outline" size="sm" onClick={() => handleEnhance(resumeData.summary, (content) => setResumeData(p => ({...p, summary: content})))} disabled={isPending}>
              <Sparkles className="mr-2 h-4 w-4" /> {isPending ? t('enhancing') : t('enhanceWithAI')}
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger className="text-lg font-semibold">{t('experience')}</AccordionTrigger>
          <AccordionContent className="space-y-6 p-1">
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="p-4 border rounded-lg space-y-4 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`exp-title-${index}`}>{t('jobTitle')}</Label>
                    <Input id={`exp-title-${index}`} name="title" value={exp.title} onChange={e => handleExperienceChange(exp.id, e)} />
                  </div>
                  <div>
                    <Label htmlFor={`exp-company-${index}`}>{t('company')}</Label>
                    <Input id={`exp-company-${index}`} name="company" value={exp.company} onChange={e => handleExperienceChange(exp.id, e)} />
                  </div>
                   <div>
                    <Label htmlFor={`exp-location-${index}`}>{t('location')}</Label>
                    <Input id={`exp-location-${index}`} name="location" value={exp.location} onChange={e => handleExperienceChange(exp.id, e)} />
                  </div>
                  <div>
                    <Label htmlFor={`exp-startDate-${index}`}>{t('startDate')}</Label>
                    <Input id={`exp-startDate-${index}`} name="startDate" value={exp.startDate} onChange={e => handleExperienceChange(exp.id, e)} />
                  </div>
                  <div>
                    <Label htmlFor={`exp-endDate-${index}`}>{t('endDate')}</Label>
                    <Input id={`exp-endDate-${index}`} name="endDate" value={exp.endDate} onChange={e => handleExperienceChange(exp.id, e)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`exp-desc-${index}`}>{t('description')}</Label>
                  <Textarea id={`exp-desc-${index}`} name="description" placeholder={t('descriptionPlaceholder')} value={exp.description} onChange={e => handleExperienceChange(exp.id, e)} rows={4} />
                   <Button variant="outline" size="sm" onClick={() => handleEnhance(exp.description, (content) => handleExperienceChange(exp.id, { target: { name: 'description', value: content } } as any))} disabled={isPending}>
                      <Sparkles className="mr-2 h-4 w-4" /> {isPending ? t('enhancing') : t('enhanceWithAI')}
                   </Button>
                </div>
                <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={() => removeExperience(exp.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addExperience}><Plus className="mr-2 h-4 w-4" /> {t('addExperience')}</Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education">
          <AccordionTrigger className="text-lg font-semibold">{t('education')}</AccordionTrigger>
          <AccordionContent className="space-y-6 p-1">
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="p-4 border rounded-lg space-y-4 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`edu-degree-${index}`}>{t('degree')}</Label>
                    <Input id={`edu-degree-${index}`} name="degree" value={edu.degree} onChange={e => handleEducationChange(edu.id, e)} />
                  </div>
                  <div>
                    <Label htmlFor={`edu-institution-${index}`}>{t('institution')}</Label>
                    <Input id={`edu-institution-${index}`} name="institution" value={edu.institution} onChange={e => handleEducationChange(edu.id, e)} />
                  </div>
                  <div>
                    <Label htmlFor={`edu-location-${index}`}>{t('location')}</Label>
                    <Input id={`edu-location-${index}`} name="location" value={edu.location} onChange={e => handleEducationChange(edu.id, e)} />
                  </div>
                  <div>
                    <Label htmlFor={`edu-startDate-${index}`}>{t('startDate')}</Label>
                    <Input id={`edu-startDate-${index}`} name="startDate" value={edu.startDate} onChange={e => handleEducationChange(edu.id, e)} />
                  </div>
                   <div>
                    <Label htmlFor={`edu-endDate-${index}`}>{t('endDate')}</Label>
                    <Input id={`edu-endDate-${index}`} name="endDate" value={edu.endDate} onChange={e => handleEducationChange(edu.id, e)} />
                  </div>
                </div>
                <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={() => removeEducation(edu.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addEducation}><Plus className="mr-2 h-4 w-4" /> {t('addEducation')}</Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="projects">
          <AccordionTrigger className="text-lg font-semibold">{t('projects')}</AccordionTrigger>
          <AccordionContent className="space-y-6 p-1">
            {resumeData.projects.map((proj, index) => (
              <div key={proj.id} className="p-4 border rounded-lg space-y-4 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`proj-name-${index}`}>{t('projectName')}</Label>
                    <Input id={`proj-name-${index}`} name="name" value={proj.name} onChange={e => handleProjectChange(proj.id, e)} />
                  </div>
                  <div>
                    <Label htmlFor={`proj-date-${index}`}>{t('projectDate')}</Label>
                    <Input id={`proj-date-${index}`} name="date" value={proj.date} onChange={e => handleProjectChange(proj.id, e)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`proj-desc-${index}`}>{t('description')}</Label>
                  <Textarea id={`proj-desc-${index}`} name="description" placeholder={t('descriptionPlaceholder')} value={proj.description} onChange={e => handleProjectChange(proj.id, e)} rows={4} />
                   <Button variant="outline" size="sm" onClick={() => handleEnhance(proj.description, (content) => handleProjectChange(proj.id, { target: { name: 'description', value: content } } as any))} disabled={isPending}>
                      <Sparkles className="mr-2 h-4 w-4" /> {isPending ? t('enhancing') : t('enhanceWithAI')}
                   </Button>
                </div>
                <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={() => removeProject(proj.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addProject}><Plus className="mr-2 h-4 w-4" /> {t('addProject')}</Button>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="skills">
          <AccordionTrigger className="text-lg font-semibold">{t('skills')}</AccordionTrigger>
          <AccordionContent className="space-y-4 p-1">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {resumeData.skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                           <Input placeholder={t('skillPlaceholder')} value={skill} onChange={e => handleSkillChange(index, e.target.value)} />
                           <Button variant="ghost" size="icon" onClick={() => removeSkill(index)}>
                               <Trash2 className="h-4 w-4 text-destructive" />
                           </Button>
                      </div>
                  ))}
              </div>
              <Button variant="outline" onClick={addSkill}><Plus className="mr-2 h-4 w-4" /> {t('addSkill')}</Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
