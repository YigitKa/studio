
"use client";

import { useState } from "react";
import Header from "@/components/header";
import ResumeEditor from "@/components/resume-editor";
import ResumePreview from "@/components/resume-preview";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useResume } from "@/contexts/resume-context";

export default function Home() {
  const [activeTab, setActiveTab] = useState("editor");
  const { t } = useResume();

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      <main className="flex-1 md:grid md:grid-cols-2 gap-8 p-4 md:p-8 print-container">
        {/* Mobile View */}
        <div className="md:hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="editor">
              <div className={cn("no-print pr-4 font-poppins mt-4")}>
                <ResumeEditor />
              </div>
            </TabsContent>
            <TabsContent value="preview">
              <div className="flex items-start justify-center mt-4">
                <ResumePreview />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop View */}
        <div className={cn("hidden md:block no-print pr-4 font-poppins")}>
          <ResumeEditor />
        </div>
        <div className="hidden md:flex items-start justify-center">
          <ResumePreview />
        </div>
      </main>
    </div>
  );
}
