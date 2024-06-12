"use client";

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { PropsWithChildren } from "react";

const ReactQueryProvider = ({ children }: PropsWithChildren) => <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>


export default ReactQueryProvider;