import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/Header/header";
import Footer from "@/components/layout/Footer/footer";
import SessionProvider from "@/components/providers/SessionProvider";
import "./globals.css";
import "@/styles/globals.scss";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Galería Interactiva — Arte Contemporáneo Colombiano",
    template: "%s | Galería Interactiva",
  },
  description:
    "Plataforma digital de galería interactiva que conecta artistas emergentes colombianos con compradores de arte. Explora, descubre y adquiere obras originales y prints de alta calidad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <SessionProvider>
          <Header />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
