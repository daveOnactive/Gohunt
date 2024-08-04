import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from "@/theme";
import '../app/style.css';
import ReactQueryProvider from "./ReactQueryProvider";
import { AssetProvider, SnackbarProvider, ConfirmProvider, ModalProvider, CryptoApiProvider, BankVerificationProvider } from "@/providers";
import { Suspense } from "react";
import { TransactionProvider } from "@/providers/TransactionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gohunt",
  description: "Best Crypto exchange platform",
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
            <ThemeProvider theme={theme}>
              <ReactQueryProvider>
                <TransactionProvider>
                  <ModalProvider>
                    <SnackbarProvider>
                      <ConfirmProvider>
                        <AssetProvider>
                          <CryptoApiProvider>
                            <BankVerificationProvider>
                              {children}
                            </BankVerificationProvider>
                          </CryptoApiProvider>
                        </AssetProvider>
                      </ConfirmProvider>
                    </SnackbarProvider>
                  </ModalProvider>
                </TransactionProvider>
              </ReactQueryProvider>
            </ThemeProvider>
          </Suspense>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
