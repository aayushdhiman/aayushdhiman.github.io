// app/layout.tsx
import "@mantine/core/styles.css";
import {
  MantineProvider,
  ColorSchemeScript,
  createTheme,
  AppShell,
  AppShellHeader,   // ← direct components
  AppShellMain,     // ← direct components
} from "@mantine/core";
import type { Metadata } from "next";
import Header from "~/app/_components/Header";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
  title: "Aayush Dhiman",
  description: "Portfolio",
};

const theme = createTheme({});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <AppShell header={{ height: 56 }} padding="lg">
            <AppShellHeader>
              <Header />
            </AppShellHeader>
            <AppShellMain>{children}</AppShellMain>
            <AppShell footer={{ height: 56 }} padding="lg">
              <Footer />
            </AppShell>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
