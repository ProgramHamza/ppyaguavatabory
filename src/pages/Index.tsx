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
import ContactForm from "@/components/ContactForm";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import MetaballBackground from "@/components/MetaballBackground";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-[#080808] grid-overlay">
      <MetaballBackground />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <SkillTreeSection />
      <ExperienceGallery />
      <ScheduleSection />
      <ParentsSection />
      <MentorShowcase />
      <SocialProofSection />
      <CTASection />
      <ContactForm />
      <MapSection />
      <Footer />
    </div>
  );
};

export default Index;
