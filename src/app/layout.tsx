import { NextIntlClientProvider, useMessages } from 'next-intl';
import type { Metadata } from 'next';
import { CookiesProvider } from 'next-client-cookies/server';

export const metadata: Metadata = {
  title: 'Users',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = useMessages();

  return (
    <html lang="en">
      <body>
        <CookiesProvider>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
