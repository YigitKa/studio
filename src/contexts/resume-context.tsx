"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { ResumeData, Language, Template } from "@/lib/types";
import { initialDataEn, initialDataTr } from "@/lib/initial-data";
import { getTranslator } from "@/lib/translations";

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  language: Language;
  setLanguage: (lang: Language) => void;
  template: Template;
  setTemplate: React.Dispatch<React.SetStateAction<Template>>;
  t: (key: any) => string;
  resetResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [template, setTemplate] = useState<Template>("modern");
  const [resumeData, setResumeData] = useState<ResumeData>(initialDataEn);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setResumeData(lang === "en" ? initialDataEn : initialDataTr);
  };
  
  const resetResume = () => {
    setResumeData(language === "en" ? initialDataEn : initialDataTr);
  };

  const t = getTranslator(language);

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, language, setLanguage, template, setTemplate, t, resetResume }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
