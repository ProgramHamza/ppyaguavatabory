import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProgramSection from "@/components/FeaturesSection";
import PartnersSection from "@/components/SocialProofSection";
import AboutSection from "@/components/ExperienceGallery";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { BackgroundCanvas } from "../components/BackgroundCanvas";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <BackgroundCanvas />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ProgramSection />
        <PartnersSection />
        <AboutSection />
        <ContactForm />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
