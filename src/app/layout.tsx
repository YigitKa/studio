import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ResumeProvider } from "@/contexts/resume-context";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Resumify AI",
  description: "Create a professional resume with the help of AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn("antialiased", inter.variable)}>
        <ResumeProvider>
          {children}
          <Toaster />
        </ResumeProvider>
      </body>
    </html>
  );
}
