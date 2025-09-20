"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import type { ResumeData, Language } from "@/lib/types";
import { initialDataEn, initialDataTr } from "@/lib/initial-data";
import { getTranslator } from "@/lib/translations";

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: any) => string;
  resetResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  const browserLang = navigator.language.split('-')[0];
  if (browserLang === 'tr') {
    return 'tr';
  }
  return 'en';
};

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [resumeData, setResumeData] = useState<ResumeData>(initialDataEn);

  useEffect(() => {
    const initialLang = getInitialLanguage();
    setLanguageState(initialLang);
    setResumeData(initialLang === 'en' ? initialDataEn : initialDataTr);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setResumeData(lang === "en" ? initialDataEn : initialDataTr);
  };
  
  const resetResume = () => {
    setResumeData(language === "en" ? initialDataEn : initialDataTr);
  };

  const t = getTranslator(language);

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, language, setLanguage, t, resetResume }}>
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
