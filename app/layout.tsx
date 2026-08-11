import type { Metadata } from "next";
import "./globals.css";
import { kofunVersion } from "./kofun-release";

const siteBasePath = process.env.KOFUN_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: {
    default: "Kofun — Clear code, native ground",
    template: "%s · Kofun",
  },
  description:
    `Kofun ${kofunVersion} is a research programming language with a ` +
    "Kofun-written bootstrap, a frozen-profile fixed point, and bounded C11, ELF64, and wasm32 checkpoints.",
  keywords: [
    "Kofun",
    "programming language",
    "ownership",
    "functional programming",
    "native compiler",
    "x86-64",
    "AArch64",
  ],
  icons: {
    icon: `${siteBasePath}/kofun-mark.svg`,
  },
  openGraph: {
    title: "Kofun — Clear code, native ground",
    description:
      `Kofun ${kofunVersion}: executable bootstrap evidence and bounded ` +
      "C11, direct static ELF, and wasm32 checkpoints.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
