import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/app/lib/i18n.ts');

const nextConfig: NextConfig = {
  // Other config options if needed
};

export default withNextIntl(nextConfig);
