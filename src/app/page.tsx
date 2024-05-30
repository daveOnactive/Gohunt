import { BuyAndSell, HeroBanner, NavigationBar, OurAsset, OurService } from "@/components";

export default function Home() {
  return (
    <main>
      <NavigationBar>
        <HeroBanner />
        <OurAsset />
        <OurService />
        <BuyAndSell />
      </NavigationBar>
    </main>
  );
}
