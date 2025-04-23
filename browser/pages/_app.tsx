import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/tiptap/styles.css";
import "@/styles/globals.css";

import HeadTags from "@/components/common/HeadTags";
import { ElectronAPI } from "@/types/preload";
import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Notifications } from "@mantine/notifications";

import type { AppProps } from "next/app";

const queryClient = new QueryClient();

const theme = createTheme({
  /** Put your mantine theme override here */
  primaryColor: "orange",
  defaultGradient: {
    from: "yellow",
    to: "pink",
  },

  headings: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <HeadTags />
      <MantineProvider theme={theme}>
        <Notifications />
        {<Component {...pageProps} />}
      </MantineProvider>
    </QueryClientProvider>
  );
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
