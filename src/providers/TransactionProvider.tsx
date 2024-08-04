'use client'
import { db } from "@/app/api/db";
import { Transaction } from "@/type";
import { onSnapshot, doc, collection } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

export const TransactionContext = createContext<Partial<{
  transactions: Transaction[];
  transaction: Transaction;
}>>({});

export function TransactionProvider({ children }: PropsWithChildren) {
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [transaction, setTransaction] = useState<Transaction>();

  const searchParams = useSearchParams();
  const tradeId = searchParams.get('tradeId');

  useEffect(() => {
    if (tradeId) {
      onSnapshot(doc(db, 'transactions', String(tradeId)), async (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as Transaction;
  
          setTransaction({
            ...data,
            id: snapshot.id,
          });
        }
      });
    }
  }, [tradeId]);

  useEffect(() => {
    const ref = collection(db, 'transactions');
    onSnapshot(ref, async (snapshot) => {
      const assets: Transaction[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        assets.push({ ...data, id: doc.id } as Transaction);
      });
      setTransactions(assets);
    });
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        transaction
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}