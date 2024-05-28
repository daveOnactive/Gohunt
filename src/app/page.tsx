import { HeroBanner, NavigationBar, OurAsset } from "@/components";

export default function Home() {
  return (
    <main>
      <NavigationBar>
        <HeroBanner />
        <OurAsset />
      </NavigationBar>
    </main>
  );
}
