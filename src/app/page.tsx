import { 
  BuyAndSell, 
  HeroBanner, 
  NavigationBar, 
  OurAsset, 
  OurService, 
  WhyChooseUse, 
  Testimonial, 
  FAQ,
  Footer
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
        <Footer />
      </NavigationBar>
    </main>
  );
}
