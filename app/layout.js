import "@/app/_styles/globals.css";

import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import { DarkModeProvider } from "@/app/_contexts/DarkModeContext";
import Header from "@/app/_components/_NavBar/Header";
import Footer from "@/app/_components/_Footer/Footer";
import AccountOperations from "@/app/_components/_NavBar/AccountOperations";
import ReduxProvider from "@/app/Provider";
import QueryProvider from "@/app/QueryProvider";

import { Josefin_Sans, DM_Serif_Display, Cairo } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-josefin",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-serif",
});

// Load Arabic Font
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-cairo",
});

export const metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "HK Masso | Massothérapie et Massages Sur-Mesure",
    template: "%s | HK Masso",
  },
  description:
    "Découvrez nos soins de massothérapie personnalisés : Massage Deep Tissue, Suédois, Pierres Chaudes, Ayurvédique, et bien plus. Réservez votre séance en ligne.",
  keywords: [
    "HK Masso",
    "Massothérapie",
    "Massage Deep Tissue",
    "Massage Suédois",
    "Massage aux Pierres Chaudes",
    "Massage Ayurvédique",
    "Massage Thérapeutique",
    "Massage Sportif",
    "Massage Détente",
    "Réservation Massage",
  ],
  authors: [{ name: "HK Masso" }],
  creator: "HK Masso",

  // OpenGraph (Social Media Previews)
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://hkmasso.com",
    title: "HK Masso | Soins de Massothérapie & Relaxation",
    description:
      "Profitez d'une expérience de massage unique adaptée à vos besoins : Deep Tissue, Suédois, Ayurvédique, Thérapeutique et plus encore.",
    siteName: "HK Masso",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HK Masso - Cabinet de Massothérapie",
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "HK Masso | Massothérapie et Massages Sur-Mesure",
    description:
      "Réservez votre séance de massage personnalisée en ligne chez HK Masso.",
    images: ["/og-image.jpg"],
  },

  // Search Engine Directives
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }) {
  // Retrieve active locale and translation messages on the server
  const locale = await getLocale();
  const messages = await getMessages();

  // Handle right-to-left orientation for Arabic
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${josefin.variable} ${dmSerif.variable} ${cairo.variable}`}
    >
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <ReduxProvider>
            <QueryProvider>
              <DarkModeProvider>
                <Header>
                  <AccountOperations />
                </Header>
                {children}
                <Footer />
              </DarkModeProvider>
            </QueryProvider>
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
