import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ProjectsSection />
    </main>
  );
}
