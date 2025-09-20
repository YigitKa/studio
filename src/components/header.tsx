"use client";

import { useCallback, useMemo, useState } from "react";
import { useResume } from "@/contexts/resume-context";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Languages, Moon, Sparkles, Sun, MoreVertical, Download, Loader2 } from "lucide-react";
import type { Language } from "@/lib/types";
import { useTheme } from "@/contexts/theme-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { downloadResumePdf } from "@/lib/download-pdf";

const FALLBACK_FILENAME = "resume.pdf";

export default function Header() {
  const { resumeData, language, setLanguage, t } = useResume();
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const pdfFileName = useMemo(() => {
    const name = resumeData.profile.name?.trim();
    if (!name) {
      return FALLBACK_FILENAME;
    }

    const sanitized = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/(^-|-$)/g, "");

    return `${sanitized || "resume"}.pdf`;
  }, [resumeData.profile.name]);

  const handleDownload = useCallback(async () => {
    if (isDownloading) {
      return;
    }

    try {
      setIsDownloading(true);
      await downloadResumePdf({ fileName: pdfFileName });
    } catch (error) {
      console.error("Failed to generate PDF", error);
      toast({
        variant: "destructive",
        title: "Download failed",
        description: "We couldn't prepare the PDF. Please try again.",
      });
    } finally {
      setIsDownloading(false);
    }
  }, [isDownloading, pdfFileName, toast]);
  
  const downloadLabel = t("downloadPdf");

  const desktopMenu = (
    <>
      <Button
        type="button"
        onClick={handleDownload}
        disabled={isDownloading}
        aria-busy={isDownloading}
        className="min-w-[150px]"
      >
        {isDownloading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        <span>{downloadLabel}</span>
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label="Toggle theme"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
    </>
  );

  const mobileMenu = (
     <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            handleDownload();
          }}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          <span>{downloadLabel}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun className="mr-2"/> : <Moon className="mr-2"/>}
          <span>Toggle Theme</span>
        </DropdownMenuItem>
         <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Languages className="mr-2" />
              <span>Language</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                 <DropdownMenuItem onSelect={() => setLanguage('en')}>English</DropdownMenuItem>
                 <DropdownMenuItem onSelect={() => setLanguage('tr')}>Türkçe</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-accent" />
        <h1 className="text-xl font-bold text-foreground">{t("title")}</h1>
      </div>
      <div className="flex items-center gap-4">
        {isMobile ? mobileMenu : desktopMenu}
      </div>
    </header>
  );
}
