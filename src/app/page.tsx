import { 
  BuyAndSell, 
  HeroBanner, 
  NavigationBar, 
  OurAsset, 
  OurService, 
  WhyChooseUse, 
  Testimonial, 
  FAQ 
} from "@/components";

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
        <FAQ />
      </NavigationBar>
    </main>
  );
}
