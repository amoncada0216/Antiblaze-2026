import type { ReactNode } from "react";

import { routing } from "@/i18n/routing";

const redirectTarget = `./${routing.defaultLocale}/`;

type RedirectLayoutProps = {
  children: ReactNode;
};

export default function RedirectLayout({ children }: RedirectLayoutProps) {
  return (
    <html lang={routing.defaultLocale}>
      <head>
        <title>Antiblaze | Duracol</title>
        <meta httpEquiv="refresh" content={`0; url=${redirectTarget}`} />
      </head>
      <body>{children}</body>
    </html>
  );
}
