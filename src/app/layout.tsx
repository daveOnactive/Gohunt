import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../app/style.css';
import ReactQueryProvider from "./ReactQueryProvider";
import { AssetProvider, SnackbarProvider, ConfirmProvider, ModalProvider, CryptoApiProvider, BankVerificationProvider, EmailProvider } from "@/providers";
import { Suspense } from "react";
import { TransactionProvider } from "@/providers/TransactionProvider";
import { InstallPrompt } from "./installPrompt";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gohunt",
  description: "Best Crypto exchange platform",
  keywords: ["crypto", "web3", "exchange", "trading", "crypto exchange", "crypto trading"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <Suspense>
            <ThemeProvider>
              <ReactQueryProvider>
                <EmailProvider>
                  <TransactionProvider>
                    <ModalProvider>
                      <SnackbarProvider>
                        <ConfirmProvider>
                          <AssetProvider>
                            <CryptoApiProvider>
                              <BankVerificationProvider>
                                <InstallPrompt />
                                {children}
                              </BankVerificationProvider>
                            </CryptoApiProvider>
                          </AssetProvider>
                        </ConfirmProvider>
                      </SnackbarProvider>
                    </ModalProvider>
                  </TransactionProvider>
                </EmailProvider>
              </ReactQueryProvider>
            </ThemeProvider>
          </Suspense>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
