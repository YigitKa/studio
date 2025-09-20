
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
import { Languages, Moon, Sparkles, Sun, MoreVertical, Download } from "lucide-react";
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

export default function Header() {
  const { language, setLanguage, t } = useResume();
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();

  const handlePrint = () => {
    window.print();
  };
  
  const desktopMenu = (
    <>
      <Button 
        variant="outline"
        onClick={handlePrint}
      >
        <Download className="mr-2 h-4 w-4" />
        {t("downloadPdf")}
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
        <DropdownMenuItem onClick={handlePrint}>
            <Download className="mr-2"/>
            <span>{t('downloadPdf')}</span>
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
    <header className="flex items-center justify-between p-4 border-b bg-background no-print sticky top-0 z-10">
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
