import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/app/lib/i18n.ts');

const nextConfig: NextConfig = {
  // i18n: {
  //   locales: ['en', 'ro'],
  //   defaultLocale: 'en',
  //   // localeDetection: false,
  // },
};

export default withNextIntl(nextConfig);
