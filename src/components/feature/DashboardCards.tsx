"use client"
import { Box, useTheme } from "@mui/material";
import { AssetCard, BankDetailsCard } from "../molecules";
import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { useRouter } from 'next/navigation';
import { useContext } from "react";
import { AssetContext } from "@/providers";
import { DashboardCardSkeleton } from "../skeleton";

export function DashboardCards() {

  const { push } = useRouter();
  const { data, isLoading, bank, isLoadingBank } = useContext(AssetContext);

  const theme = useTheme();  // Use MUI theme to adapt light/dark mode

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: { sm: '1fr 1fr', xs: '1fr' },
      gap: 3,
      width: '100%',
      padding: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
      mt: { xs: 2 },
      bgcolor: theme.palette.background.default,  // Dynamically set the background color
      color: theme.palette.text.primary,  // Text color adapts to the theme mode
      transition: 'background-color 0.3s, color 0.3s'  // Add smooth transition between light and dark mode
    }}>
      {
        isLoading && isLoadingBank ? (
          <DashboardCardSkeleton />
        ) : (
          <>
            {
              data?.map(item => (
                <AssetCard 
                  key={item.id} 
                  data={item} 
                  onClick={() => push(`/dashboard/wallet-details?id=${item.id}&name=${item.abbr}`)} 
                />
              ))
            }
            <BankDetailsCard 
              data={bank} 
              onClick={() => push(`/dashboard/bank-details?id=${bank?.id}`)} 
            />
          </>
        )
      }
    </Box>
  )
}
