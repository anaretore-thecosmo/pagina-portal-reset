import HeroSection from "@/components/HeroSection";
import TransformationSection from "@/components/TransformationSection";
import JourneySection from "@/components/JourneySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TransformationSection />
      <JourneySection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
