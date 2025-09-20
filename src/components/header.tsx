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
import { Download, Languages, Moon, Sparkles, Sun } from "lucide-react";
import type { Language } from "@/lib/types";
import { useTheme } from "@/contexts/theme-context";

export default function Header() {
  const { language, setLanguage, t } = useResume();
  const { theme, setTheme } = useTheme();

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
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
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
