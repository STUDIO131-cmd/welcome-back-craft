import HeroSection from "@/components/HeroSection";
import PortfolioDivider from "@/components/PortfolioDivider";
import ClientsCarousel from "@/components/ClientsCarousel";
import CampaignsSection from "@/components/CampaignsSection";

import ValueProposition from "@/components/ValueProposition";
import DifferentialsSection from "@/components/DifferentialsSection";
import CtaSection from "@/components/CtaSection";
import ContactForm from "@/components/ContactForm";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <PortfolioDivider />
      <CampaignsSection />
      <ClientsCarousel />
      
      <ValueProposition />
      <DifferentialsSection />
      <CtaSection />
      <ContactForm />
      <FooterSection />
    </div>
  );
};

export default Index;
