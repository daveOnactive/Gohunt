'use client'
import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { AssetInput, CurrencyInput } from "../atoms"
import { useRouter } from 'next/navigation'
import { buildQueryParams, formatNumber } from "@/helpers"
import { useContext, useMemo, useState } from "react"
import { AssetContext } from "@/providers"


type IDisplayRate = {
  asset: string;
  rate: number;
  isLoading?: boolean;
}

function DisplayRate({ asset, rate, isLoading }: IDisplayRate) {
  return (
    <Box sx={{ mb: 2, mt: 2.5 }}>
      {
        isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography mb={0.5}>1 {asset}</Typography>
            <Typography>{formatNumber(rate, true)}</Typography>
          </>
        )
      }
    </Box>
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

  function handleAmountChange(value: number) {
    setAmount(value);

    setInputValue(
      value
    );
  };

  function navigateToTrade() {
    const query = {
      asset: assetName,
      tradeType,
      amount: isTradeTypeSell ? String(inputValue) : String(amount)
    }

    const url = buildQueryParams('/trade', query);

    router.push(url, { scroll: false });
  }

  const isTradeTypeSell = tradeType === 'sell';
  const rate = defaultAsset?.rate[tradeType]

  const assetInputValue = isTradeTypeSell ? inputValue : Number(inputValue) / rate;
  const currencyInputValue = isTradeTypeSell ? Number(amount) * rate : amount;

  return (
    <Box>
      <DisplayRate 
        rate={rate}
        asset={defaultAsset?.abbr}
        isLoading={isLoading}
      />

      <Box sx={{
        display: 'flex',
        flexDirection: isTradeTypeSell ? 'column' : 'column-reverse',
        height: '8rem',
        justifyContent: 'space-between',
      }}>
        <AssetInput value={assetInputValue} onInputChange={handleInputChange} onAssetChange={handleAssetInputChange} />
        <CurrencyInput value={currencyInputValue} onChange={handleAmountChange} />
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