import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/constants";
import "@/styles/globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

type MetadataProps = Pick<LocaleLayoutProps, "params">;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const canonicalPath = `${basePath}/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    applicationName: siteConfig.name,
    icons: {
      icon: `${basePath}/fav-icon.png`,
      shortcut: `${basePath}/fav-icon.png`,
      apple: `${basePath}/fav-icon.png`,
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        es: `${basePath}/es`,
        en: `${basePath}/en`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${manrope.variable} ${ibmPlexMono.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
