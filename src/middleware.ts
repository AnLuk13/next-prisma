import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';

const locales = ['en', 'ro'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const negotiator = new Negotiator({ headers: negotiatorHeaders });
  return negotiator.language(locales) ?? defaultLocale;
}

export function middleware(request: NextRequest) {
  const locale = getLocale(request);
  console.log('✅ Middleware resolved locale:', locale);

  const response = NextResponse.next();

  // ✅ Required: pass locale to next-intl
  response.headers.set('x-next-intl-locale', locale);

  // ✅ Optional: update the cookie for persistence
  response.cookies.set('NEXT_LOCALE', locale);

  return response;
}

export const config = {
  matcher: ['/', '/(.*)'],
};
