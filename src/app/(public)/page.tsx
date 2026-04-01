import { LandingNavbar } from "@/components/layout/landing-navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ProfileSection } from "@/components/sections/profile-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { EducationSection } from "@/components/sections/education-section";
import { OrganizationalSection } from "@/components/sections/organizational-section";
import { KnowledgeSection } from "@/components/sections/knowledge-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { BlogPreviewSection } from "@/components/sections/blog-preview-section";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata = {
  title: "Septiya Yutantri | Portfolio & Resume",
  description: "IT Service Management Officer | System Implementation Specialist - Portfolio and CV of Septiya Yutantri",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white scroll-smooth">
      <LandingNavbar />
      <main>
        <HeroSection />
        <ProfileSection />
        <ExperienceSection />
        <EducationSection />
        <OrganizationalSection />
        <KnowledgeSection />
        <SkillsSection />
        <BlogPreviewSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
