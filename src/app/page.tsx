import Header from "@/components/header";
import ResumeEditor from "@/components/resume-editor";
import ResumePreview from "@/components/resume-preview";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 md:p-8 print-container">
        <div className={cn("no-print lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto pr-4 font-poppins")}>
          <ResumeEditor />
        </div>
        <div className="flex items-start justify-center">
          <ResumePreview />
        </div>
      </main>
    </div>
  );
}
