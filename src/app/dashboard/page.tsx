import { auth, BASE_PATH } from "@/auth";
import { DashboardCards, NavigationBar, TransactionHistory } from "@/components";
import { SCREEN_MAX_WIDTH } from "@/constant/width";
import { Box } from "@mui/material";
import { SessionProvider } from "next-auth/react";

export default async function Dashboard() {
  const session = await auth();
  if (session && session.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
    };
  }
  return (
    <main>
      <SessionProvider basePath={BASE_PATH} session={session}>
        <NavigationBar
          isNavBg
          showBreadcrumbs
          isDashboard
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
      </SessionProvider>
    </main>
  )
}