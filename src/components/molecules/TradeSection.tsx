"use client"

import Image from "next/image";
import { Tabs } from "../atoms";
import { Box, Card } from "@mui/material";
import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";
import { useState } from "react";
import Sell from '../../../public/svg/sell.svg';
import Buy from '../../../public/svg/buy.svg';
import { SellAsset, BuyAsset } from "../feature";
import { useSearchParams } from "next/navigation";
import { useStaggerAnimation } from "@/hooks";

enum Trade {
  sell = 'Sell Crypto',
  buy = 'Buy Crypto'
}

export function TradeSection() {
  const [currentTab, setCurrentTab] = useState(Trade.sell);

  const { scope } = useStaggerAnimation({
    className: ".stagger-trade-section",
    position: 'horizontal'
  });

  const icon = {
    [Trade.sell]: Sell,
    [Trade.buy]: Buy
  }

  const searchParams = useSearchParams();

  const activeTab = {
    sell: 0,
    buy: 1,
  }

  return (
    <Box ref={scope} sx={{
      paddingTop: '6rem',
      paddingX: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: { sm: 'row', xs: 'column' },
      width: '100%'
    }}>
      <Box className="stagger-trade-section" sx={{
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

      <Card className="stagger-trade-section" sx={{
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
          activeTab={activeTab[searchParams.get('tradeType') as keyof typeof activeTab]}
        />
      </Card>
    </Box>
  )
}