
type Rate = {
  buy: number;
  sell: number;
}

export type Networks = {
  network: string;
  value: string;
}

export type Assets = {
  id: string;
  assetAddress: string;
  assetName: string;
  rate: Rate;
  abbr: string;
  networks: Networks[];
}