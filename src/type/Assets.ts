
type Rate = {
  buy: number;
  sell: number;
}

export type Assets = {
  id: string;
  assetAddress: string;
  assetName: string;
  rate: Rate;
  abbr: string;
}