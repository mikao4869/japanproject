"use client"

import "../i18n/i18n";
import { useTranslation } from "react-i18next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <html lang="ko">
      <body>
        <header className="p-4 bg-gray-100">
        
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
