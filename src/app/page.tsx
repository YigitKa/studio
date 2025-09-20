
"use client";

import Header from "@/components/header";
import ResumeEditor from "@/components/resume-editor";
import ResumePreview from "@/components/resume-preview";
import { cn } from "@/lib/utils";

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      <main className="flex-1 md:grid md:grid-cols-2 gap-8 p-4 md:p-8 print-container">
        {/* Mobile View - Editor Only */}
        <div className="md:hidden no-print font-poppins mt-4">
          <ResumeEditor />
        </div>

        {/* Desktop View */}
        <div className={cn("hidden md:block no-print font-poppins")}>
          <ResumeEditor />
        </div>
        <div className="hidden md:flex flex-col items-center gap-4">
          <ResumePreview />
        </div>
      </main>
    </div>
  );
}
