import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import SkillTreeSection from "@/components/SkillTreeSection";
import ExperienceGallery from "@/components/ExperienceGallery";
import MentorShowcase from "@/components/MentorShowcase";
import SocialProofSection from "@/components/SocialProofSection";
import ParentsSection from "@/components/ParentsSection";
import ScheduleSection from "@/components/ScheduleSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div id="program" className="space-y-0">
        <FeaturesSection />
        <SkillTreeSection />
      </div>
      <ExperienceGallery />
      <div id="terminy">
        <ScheduleSection />
      </div>
      <ParentsSection />
      <MentorShowcase />
      <SocialProofSection />
      <div id="prihlaska">
        <CTASection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
