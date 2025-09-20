
"use client";

import Header from "@/components/header";
import ResumeEditor from "@/components/resume-editor";
import ResumePreview from "@/components/resume-preview";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, Pencil } from "lucide-react";

export default function Home() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      <main className="flex-1 md:grid md:grid-cols-2 gap-8 p-4 md:p-8 print-container">
        {/* Mobile View */}
        <div className="md:hidden no-print">
          <div className="fixed bottom-4 right-4 z-20">
            <Button
              size="icon"
              onClick={() => setMobileView(mobileView === 'editor' ? 'preview' : 'editor')}
              className="rounded-full h-14 w-14 shadow-lg"
            >
              {mobileView === 'editor' ? <Eye className="h-6 w-6" /> : <Pencil className="h-6 w-6" />}
            </Button>
          </div>
          <div className={cn("font-poppins mt-4", mobileView !== 'editor' && 'hidden')}>
            <ResumeEditor />
          </div>
          {mobileView === 'preview' && (
            <div className="mt-4">
              <ResumePreview />
            </div>
          )}
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
