"use client"
import { Box } from "@mui/material";
import Bitcoin from '../../../public/svg/Bitcoin.svg';
import ETH from '../../../public/svg/ETH.svg';
import USDT from '../../../public/svg/USDT.svg';
import { AssetCard, BankDetailsCard } from "../molecules";
import { DESKTOP_CONTAINER_PADDING, MOBILE_CONTAINER_PADDING } from "@/constant/padding";

enum AssetCardType {
  ASSET = 'asset',
  BANK = 'bank'
} 

export function DashboardCards() {

  const assetCards = [
    {
      walletAddress: '1JWRoquJwe46mOtrC6UlZSDoquJwe46Jwe46mO',
      assetName: 'Bitcoin',
      icon: Bitcoin,
      lastUpdated: '22-01-2024',
      rate: {
        buy: 1000,
        sell: 1000,
      },
      type: AssetCardType.ASSET
    },
    {
      walletAddress: '1JWRoquJwe46mOtrC6UlZSDoquJwe46Jwe46mO',
      assetName: 'Tether',
      icon: USDT,
      lastUpdated: '22-01-2024',
      rate: {
        buy: 1000,
        sell: 1000,
      },
      type: AssetCardType.ASSET
    },
    {
      walletAddress: '1JWRoquJwe46mOtrC6UlZSDoquJwe46Jwe46mO',
      assetName: 'Ethereum',
      icon: ETH,
      lastUpdated: '22-01-2024',
      rate: {
        buy: 1000,
        sell: 1000,
      },
      type: AssetCardType.ASSET
    },
    {
      bankName: 'Access Bank',
      accountNumber: '009844766655',
      holdersName: 'Mark Jason',
      type: AssetCardType.BANK
    }
  ]

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: {sm: '1fr 1fr', xs: '1fr'},
      gap: 3,
      width: '100%',
      padding: { sm: DESKTOP_CONTAINER_PADDING, xs: MOBILE_CONTAINER_PADDING },
    }}>
      {
        assetCards.map((card) => card.type === AssetCardType.ASSET ? <AssetCard data={card} onClick={() => null} key={card.assetName} /> : <BankDetailsCard data={card} onClick={() => null} key={card.bankName} />)
      }
    </Box>
  )
}