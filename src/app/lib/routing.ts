import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'ro'];
export const defaultLocale = 'en';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'never',
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
