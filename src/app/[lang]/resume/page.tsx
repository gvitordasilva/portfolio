import type { Metadata } from "next";
import { ResumeView } from "@/components/resume/ResumeView";
import { type Locale } from "@/lib/locales";
import { ui2 } from "@/lib/site";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  return { title: ui2.resume.title[lang], robots: { index: true } };
}

export default function ResumePage() {
  return (
    <main>
      <ResumeView />
    </main>
  );
}
