// app/layout.tsx
import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript, createTheme } from "@mantine/core";
import type { Metadata } from "next";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

export const metadata: Metadata = {
  title: "Developer Portfolio",
  description: "My work, projects, and contact info",
};

const theme = createTheme({
  fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <Header />
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
