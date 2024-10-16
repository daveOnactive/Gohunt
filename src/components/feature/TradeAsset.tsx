'use client'
import { Box, Button, CircularProgress, Skeleton, Typography } from "@mui/material"
import { AssetInput, CurrencyInput } from "../atoms"
import { useRouter } from 'next/navigation'
import { buildQueryParams, formatNumber } from "@/helpers"
import { useContext, useMemo, useState } from "react"
import { AssetContext } from "@/providers"


type IDisplayRate = {
  asset: string;
  rate: number;
  isLoading?: boolean;
  type: 'Buy' | 'Sell'
}

function DisplayRate({ asset, rate, isLoading, type }: IDisplayRate) {
  return (
    <Box sx={{ mb: 2, mt: 2.5 }}>
      {
        isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <>
            <Typography mb={0.5}><strong>{type} Rate</strong> = {formatNumber(rate, true)}</Typography>
          </>
        )
      }
    </Box>
  )
}

type IBuyInputSection = {
  assetValue?: number;
  currencyValue?: number;
  onChange?: (value: string | number) => void;
  onAssetChange?: ((value: string) => void)
}

function BuyInputSection({ assetValue, currencyValue, onChange, onAssetChange }: IBuyInputSection) {
  return (
    <>
      <AssetInput value={assetValue} onAssetChange={onAssetChange} onInputChange={onChange} />
      <CurrencyInput value={currencyValue} disabled />
    </>
  )
}

type ISellInputSection = {
  assetValue?: number;
  currencyValue?: number;
  onChange?: (value: string | number) => void;
  onAssetChange?: ((value: string) => void)
}

function SellInputSection({ assetValue, currencyValue, onChange, onAssetChange }: ISellInputSection) {
  return (
    <>
      <AssetInput value={assetValue} onInputChange={onChange} onAssetChange={onAssetChange} />
      <CurrencyInput value={currencyValue} disabled />
    </>
  )
}

type IProps = {
  tradeType: 'sell' | 'buy';
}

export function TradeAsset({ tradeType }: IProps) {

  const router = useRouter();

  const { data, filterAssets, isLoading } = useContext(AssetContext);

  const assets = data;

  const [assetName, setAssetName] = useState('BTC');

  const defaultAsset = useMemo(() => filterAssets(assets, assetName), [assetName, assets, filterAssets])

  const [amount, setAmount] = useState<number>();

  const [inputValue, setInputValue] = useState<number>();

  function handleAssetInputChange(name: string) {
    const asset = filterAssets(assets, name);
    setAssetName(asset?.abbr);
  }

  function handleInputChange(value: string | number) {
    setInputValue(value as number);
    setAmount(
      Number(value)
    );
  }

  function navigateToTrade() {

    router.push('/trade', { scroll: false });
  }

  const isTradeTypeSell = tradeType === 'sell';
  const rate = defaultAsset?.rate[tradeType]

  const assetInputValue = inputValue;
  const currencyInputValue = Number(amount) * rate;

  return (
    <Box>
      <DisplayRate 
        rate={rate}
        asset={defaultAsset?.abbr}
        isLoading={isLoading}
        type={isTradeTypeSell ? 'Sell' : 'Buy'}
      />

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '8rem',
        justifyContent: 'space-between',
      }}>

        {
          isTradeTypeSell ? (
            <SellInputSection
              assetValue={assetInputValue}
              currencyValue={currencyInputValue}
              onAssetChange={handleAssetInputChange}
              onChange={handleInputChange}
            />
          ) : (
            <BuyInputSection
              assetValue={assetInputValue}
              currencyValue={currencyInputValue}
              onAssetChange={handleAssetInputChange}
              onChange={handleInputChange}
            />
          )
        }
      </Box>

      <Button 
        fullWidth 
        sx={{ mt: 5 }} 
        variant="contained" 
        size="large"
        onClick={navigateToTrade}
      >
        {tradeType === 'sell' ? 'Sell Now' : 'Buy Now'}
      </Button>
    </Box>
  )
}