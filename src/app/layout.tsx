import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from "@/theme";
import '../app/style.css';
import ReactQueryProvider from "./ReactQueryProvider";
import { AssetProvider, SnackbarProvider, ConfirmProvider, ModalProvider, CryptoApiProvider } from "@/providers";
import { Suspense } from "react";

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
                <ModalProvider>
                  <SnackbarProvider>
                    <ConfirmProvider>
                      <AssetProvider>
                        <CryptoApiProvider>
                          {children}
                        </CryptoApiProvider>
                      </AssetProvider>
                    </ConfirmProvider>
                  </SnackbarProvider>
                </ModalProvider>
              </ReactQueryProvider>
            </ThemeProvider>
          </Suspense>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
