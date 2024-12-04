import { EmailContext } from "@/providers";
import { OrderType, Transaction } from "@/type";
import { useContext } from "react";

export function useEmail() {
  const { orderConfirm, orderPlaced } = useContext(EmailContext)

  return {
    buyOrderPlaced: (data: Transaction) => orderPlaced?.(OrderType.BUY, data),
    sellOrderPlaced: (data: Transaction) => orderPlaced?.(OrderType.SELL, data),
    buyOrderConfirm: (data: Transaction) => orderConfirm?.(OrderType.BUY, data),
    sellOrderConfirm: (data: Transaction) => orderConfirm?.(OrderType.SELL, data)
  }
}