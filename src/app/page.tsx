import { BuyAndSell, HeroBanner, NavigationBar, OurAsset, OurService, WhyChooseUse } from "@/components";

export default function Home() {
  return (
    <main>
      <NavigationBar>
        <HeroBanner />
        <OurAsset />
        <OurService />
        <BuyAndSell />
        <WhyChooseUse />
      </NavigationBar>
    </main>
  );
}
