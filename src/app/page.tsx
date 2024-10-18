import { 
  BuyAndSell, 
  HeroBanner, 
  NavigationBar, 
  OurAsset, 
  OurService, 
  WhyChooseUse, 
  Testimonial, 
  FAQ,
  Footer,
} from "@/components";
import { SCREEN_MAX_WIDTH } from "@/constant/width";
import { Box } from "@mui/material";

export default async function Home() {
  
  return (
    <Box
      component='main'
      sx={{
        position: 'relative',
        overflowX: 'hidden'
      }}
    >
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

      <Box
        sx={{
          width: '100%',
          height: '50%',
          borderRadius: '2135px',
          background: 'radial-gradient(40.45% 40.45% at 50% 46.16%, rgba(25, 64, 85, 0.90) 3.13%, rgba(14, 17, 32, 0.00) 100%)',
          filter: 'blur(12px)',
          position: 'absolute',
          top: '10%',
          left: '30%',
          zIndex: -1
        }}
      />

      <Box
        sx={{
          width: '100%',
          height: '30%',
          borderRadius: '2135px',
          background: 'radial-gradient(40.45% 40.45% at 50% 46.16%, rgba(25, 64, 85, 0.90) 3.13%, rgba(14, 17, 32, 0.00) 100%)',
          filter: 'blur(12px)',
          position: 'absolute',
          bottom: 0,
          left: '-20%',
          zIndex: -1
        }}
      />
    </Box>
  );
}
