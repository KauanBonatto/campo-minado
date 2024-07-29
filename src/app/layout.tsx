import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campo Minado",
  description: "Jogo do campo minado",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" className="dark">
      <body className={sora.className}>{children}</body>
    </html>
  );
}
