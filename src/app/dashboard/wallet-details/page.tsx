import { EditWalletDetails, NavigationBar } from "@/components";
import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { SCREEN_MAX_WIDTH } from "@/constant/width";
import { Box } from "@mui/material";

export default function WalletDetails() {
  return (
    <main>
      <NavigationBar
        isNavBg
        showBreadcrumbs
      >
        <Box sx={{
          maxWidth: { xl: SCREEN_MAX_WIDTH, sm: '100%', xs: '100%' },
          display: 'flex',
          mx: 'auto',
          mt: 8,
          padding: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
        }}>
          <EditWalletDetails />
        </Box>
      </NavigationBar>
    </main>
  )
}