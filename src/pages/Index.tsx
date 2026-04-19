import { lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import ClientsCarousel from "@/components/ClientsCarousel";
import CampaignCTA from "@/components/CampaignCTA";
import DifferentialsSection from "@/components/DifferentialsSection";
import CtaSection from "@/components/CtaSection";
import ContactForm from "@/components/ContactForm";
import FooterSection from "@/components/FooterSection";
import pageBg from "@/assets/page-bg.webp";

// Heavy sections deferred until after first paint
const CampaignsSection = lazy(() => import("@/components/CampaignsSection"));
const BastidoresSection = lazy(() => import("@/components/BastidoresSection"));

const SectionFallback = () => (
  <div className="min-h-[60vh] w-full" aria-hidden="true" />
);

const Index = () => {
  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center" style={{ backgroundImage: `url(${pageBg})` }}>
      <HeroSection />
      <Suspense fallback={<SectionFallback />}>
        <CampaignsSection />
      </Suspense>
      <CampaignCTA />
      <Suspense fallback={<SectionFallback />}>
        <BastidoresSection />
      </Suspense>
      <ClientsCarousel />
      <DifferentialsSection />
      <CtaSection />
      <ContactForm />
      <FooterSection />
    </div>
  );
};

export default Index;
