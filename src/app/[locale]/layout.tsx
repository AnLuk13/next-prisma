import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';
import { CookiesProvider } from 'next-client-cookies/server';
import { routing } from '../lib/routing';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Users',
};

export default async function LocaleLayout({
  children,
  params: rawParams,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await rawParams;
  const { locale } = resolvedParams;
  
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <CookiesProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
