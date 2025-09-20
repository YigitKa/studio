"use server";

import { enhanceResumeContent } from "@/ai/flows/ai-resume-enhancement";
import type { Language } from "@/lib/types";

export async function enhanceSectionAction(
  resumeSection: string,
  language: Language
): Promise<{ enhancedContent: string } | { error: string }> {
  if (!resumeSection.trim()) {
    return { error: "Content is empty." };
  }

  try {
    const result = await enhanceResumeContent({ resumeSection, language });
    return { enhancedContent: result.enhancedContent };
  } catch (error) {
    console.error("AI enhancement failed:", error);
    return { error: "Failed to enhance content with AI. Please try again." };
  }
}
