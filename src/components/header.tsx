"use client";

import { useResume } from "@/contexts/resume-context";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Download, Languages, LayoutTemplate, Sparkles } from "lucide-react";
import type { Language, Template } from "@/lib/types";

export default function Header() {
  const { language, setLanguage, t, template, setTemplate } = useResume();

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="flex items-center justify-between p-4 border-b bg-background no-print sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-accent" />
        <h1 className="text-xl font-bold text-foreground">{t("title")}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <LayoutTemplate className="h-5 w-5 text-muted-foreground" />
          <Select
            value={template}
            onValueChange={(value) => setTemplate(value as Template)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
              <SelectItem value="minimalist">Minimalist</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Languages className="h-5 w-5 text-muted-foreground" />
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value as Language)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="tr">Türkçe</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handlePrint}>
          <Download className="mr-2 h-4 w-4" />
          {t("downloadPdf")}
        </Button>
      </div>
    </header>
  );
}
