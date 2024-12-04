export enum OrderType {
  BUY = 'buy',
  SELL = 'sell'
}

export const orderSubject = {
  [OrderType.BUY]: 'Buy Order',
  [OrderType.SELL]: 'Sell Order'
}