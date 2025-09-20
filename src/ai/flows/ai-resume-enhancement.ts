'use server';
/**
 * @fileOverview AI-powered resume content enhancement flow.
 *
 * - enhanceResumeContent - A function that enhances the wording and phrasing of resume content.
 * - EnhanceResumeContentInput - The input type for the enhanceResumeContent function.
 * - EnhanceResumeContentOutput - The return type for the enhanceResumeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceResumeContentInputSchema = z.object({
  resumeSection: z.string().describe('The resume section content to enhance.'),
  language: z.enum(['en', 'tr']).default('en').describe('The language of the resume content.'),
});
export type EnhanceResumeContentInput = z.infer<typeof EnhanceResumeContentInputSchema>;

const EnhanceResumeContentOutputSchema = z.object({
  enhancedContent: z.string().describe('The AI-enhanced resume section content.'),
});
export type EnhanceResumeContentOutput = z.infer<typeof EnhanceResumeContentOutputSchema>;

export async function enhanceResumeContent(input: EnhanceResumeContentInput): Promise<EnhanceResumeContentOutput> {
  return enhanceResumeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceResumeContentPrompt',
  input: {schema: EnhanceResumeContentInputSchema},
  output: {schema: EnhanceResumeContentOutputSchema},
  prompt: `You are an AI resume enhancement assistant. Your goal is to improve the wording and phrasing of resume content to make it more impactful and professional.

  Here is the resume content to enhance:
  {{resumeSection}}

  Language: {{language}}

  Please provide the enhanced content. Focus on using strong action verbs and highlighting accomplishments.
  Be concise and professional.
  Do not add or remove information, only rephrase it.
  If the given content is already well-written, return it as is.
  `,
});

const enhanceResumeContentFlow = ai.defineFlow(
  {
    name: 'enhanceResumeContentFlow',
    inputSchema: EnhanceResumeContentInputSchema,
    outputSchema: EnhanceResumeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
