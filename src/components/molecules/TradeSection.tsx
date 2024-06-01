"use client"

import Image from "next/image";
import { Tabs } from "../atoms";
import { Box, Card } from "@mui/material";
import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { useState } from "react";
import Sell from '../../../public/svg/sell.svg';
import Buy from '../../../public/svg/Buy.svg';
import { SellAsset, BuyAsset } from "../feature";

enum Trade {
  sell = 'Sell Crypto',
  buy = 'Buy Crypto'
}

export function TradeSection() {
  const [currentTab, setCurrentTab] = useState(Trade.sell);

  const icon = {
    [Trade.sell]: Sell,
    [Trade.buy]: Buy
  }

  return (
    <Box sx={{
      paddingTop: '6rem',
      paddingX: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: { sm: 'row', xs: 'column' }
    }}>
      <Box sx={{
        ml: 9,
        width: { sm: '400px' },
        height: { sm: '400px' },
        display: { xs: 'none', sm: 'block' }
      }}>
        <Image
          alt={currentTab}
          src={icon[currentTab as keyof typeof icon]}
          style={{ width: '100%' }}
        />
      </Box>

      <Card sx={{
        width: { sm: '45%', xs: '100%' },
        py: { sm: 2.5, xs: 2 },
        px: { sm: 2.5, xs: 2 },
      }}>
        <Tabs
          tabs={[
            {
              title: Trade.sell,
              content: <SellAsset />
            },
            {
              title: Trade.buy,
              content: <BuyAsset />
            }
          ]}
          handleClick={(tab) => setCurrentTab(tab as Trade)}
        />
      </Card>
    </Box>
  )
}