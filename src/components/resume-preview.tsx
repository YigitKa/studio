
"use client";

import { ResumePreviewClassic } from "./resume-preview-classic";

export default function ResumePreview() {
  return (
    <div 
      id="resume-preview-container"
      className="flex items-start justify-center w-full"
    >
      <ResumePreviewClassic />
    </div>
  );
}
