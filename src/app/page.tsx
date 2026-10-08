import { Hero } from "@/components/hero/hero";
import { ServicesSection, FeaturesSection, EcosystemSection, JourneySection, FAQSection } from "@/components/sections";
import { DownloadCTA } from "@/components/downloads";
import { PartnersSection } from "@/components/partners";
export default function Home() {
  return <><Hero /><ServicesSection /><FeaturesSection /><EcosystemSection /><PartnersSection /><JourneySection /><DownloadCTA /><FAQSection /></>;
}
