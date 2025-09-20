"use client";

import { ResumePreviewClassic } from "./resume-preview-classic";

export default function ResumePreview({ zoom }: { zoom: number }) {
  return (
    <div 
      id="resume-preview-container"
      className="flex items-start justify-center w-full"
    >
      <ResumePreviewClassic zoom={zoom}/>
    </div>
  );
}
