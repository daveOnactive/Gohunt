'use client'
import { sendEmail } from "@/services";
import { emailTemplate } from "@/templates";
import { orderSubject, OrderType, Transaction } from "@/type";
import { createContext, PropsWithChildren } from "react";

type IEmailContext = {
  orderPlaced(type: OrderType, data: Transaction): void
  orderConfirm(type: OrderType, data: Transaction): void
}

export const EmailContext = createContext<Partial<IEmailContext>>({})


export function EmailProvider(props: PropsWithChildren) {

  function orderPlaced(type: OrderType, data: Transaction) {
    sendEmail(orderSubject[type], emailTemplate(data))
  }

  function orderConfirm(type: OrderType, data: Transaction) {
    sendEmail(`${orderSubject[type]} Confirmed`, emailTemplate(data, true))
  }

  return (
    <EmailContext.Provider
      value={{
        orderPlaced,
        orderConfirm
      }}
    >
      {props.children}
    </EmailContext.Provider>
  )
};