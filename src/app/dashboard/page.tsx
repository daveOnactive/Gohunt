import { DashboardCards, NavigationBar, TransactionHistory } from "@/components";
import { SCREEN_MAX_WIDTH } from "@/constant/width";
import { Box } from "@mui/material";

export default function Dashboard() {
  return (
    <main>
      <NavigationBar
        isNavBg
        showBreadcrumbs
      >
        <Box sx={{
          maxWidth: { xl: SCREEN_MAX_WIDTH, sm: '100%', xs: '100%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space',
          alignItems: 'center',
          mx: 'auto',
          mt: 8,
        }}>
          <DashboardCards />
          <TransactionHistory />
        </Box>
      </NavigationBar>
    </main>
  )
}