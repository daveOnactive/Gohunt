import { NavigationBar, TradeSection } from "@/components";
import { SCREEN_MAX_WIDTH } from "@/constant/width";
import { Box } from "@mui/material";

export default function Trade() {
  return (
    <main>
      <NavigationBar
        isNavBg
      >
        <Box sx={{
          maxWidth: { xl: SCREEN_MAX_WIDTH, sm: '100%', xs: '100%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mx: 'auto'
        }}>
          <TradeSection />
        </Box>
      </NavigationBar>
    </main>
  )
}