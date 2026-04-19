import HeroSection from "@/components/HeroSection";
import ClientsCarousel from "@/components/ClientsCarousel";
import CampaignsSection from "@/components/CampaignsSection";
import CampaignCTA from "@/components/CampaignCTA";
import BastidoresSection from "@/components/BastidoresSection";
import DifferentialsSection from "@/components/DifferentialsSection";
import CtaSection from "@/components/CtaSection";
import ContactForm from "@/components/ContactForm";
import FooterSection from "@/components/FooterSection";
import pageBg from "@/assets/page-bg.webp";

const Index = () => {
  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center" style={{ backgroundImage: `url(${pageBg})` }}>
      <HeroSection />
      <CampaignsSection />
      <CampaignCTA />
      <BastidoresSection />
      <ClientsCarousel />
      <DifferentialsSection />
      <CtaSection />
      <ContactForm />
      <FooterSection />
    </div>
  );
};

export default Index;
