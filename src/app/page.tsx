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
import { SCREEN_MAX_WIDTH } from "@/constant/width";
import { Box } from "@mui/material";

export default async function Home() {
  
  return (
    <main>
      <NavigationBar>
        <HeroBanner />
        <Box sx={{
          maxWidth: { xl: SCREEN_MAX_WIDTH , sm: '100%', xs: '100%'},
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mx: 'auto'
        }}>
          <OurAsset />
          <BuyAndSell />
          <OurService />
          <WhyChooseUse />
          <Testimonial />
          <FAQ />
          <Footer />
        </Box>
      </NavigationBar>
    </main>
  );
}
