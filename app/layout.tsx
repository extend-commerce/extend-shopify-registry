import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "extend-shopify registry",
  description:
    "Polaris-styled components for Shopify apps, distributed as a shadcn registry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Same InterVariable stylesheet the Shopify admin loads */}
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
