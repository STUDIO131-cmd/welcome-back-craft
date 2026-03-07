import HeroSection from "@/components/HeroSection";
import PortfolioDivider from "@/components/PortfolioDivider";
import ClientsCarousel from "@/components/ClientsCarousel";
import CampaignsSection from "@/components/CampaignsSection";
import GalleryScroll from "@/components/GalleryScroll";
import ValueProposition from "@/components/ValueProposition";
import DifferentialsSection from "@/components/DifferentialsSection";
import CtaSection from "@/components/CtaSection";
import ContactForm from "@/components/ContactForm";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ClientsCarousel />
      <CampaignsSection />
      <GalleryScroll />
      <ValueProposition />
      <DifferentialsSection />
      <CtaSection />
      <ContactForm />
      <FooterSection />
    </div>
  );
};

export default Index;
