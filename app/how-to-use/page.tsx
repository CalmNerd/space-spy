import HowToUseHeader from "./HowToUseHeader";
import HowToUseHero from "./HowToUseHero";
import HowToUseAbout from "./HowToUseAbout";
import HowToUseWorkflow from "./HowToUseWorkflow";
import HowToUseKeyFeatures from "./HowToUseKeyFeatures";
import HowToUseFullTranscriptionInsights from "./HowToUseFullTranscriptionInsights";
import HowToUseFeatures from "./HowToUseFeatures";
export default function HowToUsePage() {
  return (
    <div className="w-full bg-no-repeat  bg-cover px-2 md:px-8" style={{ backgroundImage: "url('/howtousebg.svg')" }}>
      <div className="max-w-full mx-auto flex flex-col gap-6 md:gap-8">
        <HowToUseHeader />
        <HowToUseHero />
        <HowToUseAbout />
        <HowToUseWorkflow />
        <HowToUseKeyFeatures />
        <HowToUseFullTranscriptionInsights />
        <HowToUseFeatures />
      </div>
    </div>
  );
}   