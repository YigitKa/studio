"use client";

import { useResume } from "@/contexts/resume-context";
import { ResumePreviewModern } from "./resume-preview-modern";
import { ResumePreviewClassic } from "./resume-preview-classic";
import { ResumePreviewCreative } from "./resume-preview-creative";
import { ResumePreviewMinimalist } from "./resume-preview-minimalist";

export default function ResumePreview() {
  const { template } = useResume();

  const renderTemplate = () => {
    switch (template) {
      case 'classic':
        return <ResumePreviewClassic />;
      case 'creative':
        return <ResumePreviewCreative />;
      case 'minimalist':
        return <ResumePreviewMinimalist />;
      case 'modern':
      default:
        return <ResumePreviewModern />;
    }
  };

  return (
    <div 
      id="resume-preview-container"
      className="flex items-start justify-center w-full"
    >
      {renderTemplate()}
    </div>
  );
}
