
"use client";

import Header from "@/components/header";
import ResumeEditor from "@/components/resume-editor";
import ResumePreview from "@/components/resume-preview";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      <main className="flex-1 md:grid md:grid-cols-2 gap-8 p-4 md:p-8">
        <div className={cn("font-poppins", isMobile ? "mt-4" : "")}>
          <ResumeEditor />
        </div>
        <div className={cn("flex-col items-center gap-4", isMobile ? "hidden" : "flex")}>
           <ResumePreview />
        </div>
      </main>
    </div>
  );
}
