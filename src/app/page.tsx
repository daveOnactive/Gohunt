import { BuyAndSell, HeroBanner, NavigationBar, OurAsset, OurService, WhyChooseUse, Testimonial } from "@/components";

export default function Home() {
  return (
    <main>
      <NavigationBar>
        <HeroBanner />
        <OurAsset />
        <OurService />
        <BuyAndSell />
        <WhyChooseUse />
        <Testimonial />
      </NavigationBar>
    </main>
  );
}
