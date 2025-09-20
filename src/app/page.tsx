
"use client";

import { useState } from "react";
import Header from "@/components/header";
import ResumeEditor from "@/components/resume-editor";
import ResumePreview from "@/components/resume-preview";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useResume } from "@/contexts/resume-context";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const [activeTab, setActiveTab] = useState("editor");
  const isMobile = useIsMobile();
  const [zoom, setZoom] = useState(isMobile ? 0.5 : 0.7);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.2));

  const zoomControls = (
    <div className="flex items-center gap-2 bg-background p-2 rounded-lg border shadow-sm sticky top-[80px] md:top-[80px] z-10 no-print">
      <Button variant="outline" size="icon" onClick={handleZoomOut}>
        <ZoomOut className="h-4 w-4" />
      </Button>
      <span className="text-sm font-medium w-12 text-center">{Math.round(zoom * 100)}%</span>
      <Button variant="outline" size="icon" onClick={handleZoomIn}>
        <ZoomIn className="h-4 w-4" />
      </Button>
    </div>
  );

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
              <div className={cn("no-print font-poppins mt-4")}>
                <ResumeEditor />
              </div>
            </TabsContent>
            <TabsContent value="preview">
               <div className="flex flex-col items-center gap-4 mt-4">
                {zoomControls}
                <ResumePreview zoom={zoom} />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop View */}
        <div className={cn("hidden md:block no-print font-poppins")}>
          <ResumeEditor />
        </div>
        <div className="hidden md:flex flex-col items-center gap-4">
          {zoomControls}
          <ResumePreview zoom={zoom} />
        </div>
      </main>
    </div>
  );
}
