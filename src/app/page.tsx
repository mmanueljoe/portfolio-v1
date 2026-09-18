import { AboutSection } from "@/components/sections/AboutSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { WritingSection } from "@/components/sections/WritingSection";

// Contact is the footer, rendered by the root layout.
export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <WorkSection />
      <AboutSection />
      <SkillsSection />
      <WritingSection />
    </main>
  );
}
