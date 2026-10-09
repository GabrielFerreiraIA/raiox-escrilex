import { next } from '@vercel/functions';
import { readSessionCookie, verifySession } from './lib/auth.js';

const PUBLIC_PATHS = new Set(['/login', '/login.html', '/login.css', '/login.js', '/api/login', '/api/logout']);

export default async function middleware(request) {
  const url = new URL(request.url);
  const isPublicAsset = url.pathname.startsWith('/assets/');
  if (PUBLIC_PATHS.has(url.pathname) || isPublicAsset) return next();

  const password = process.env.CLIENT_PASSWORD;
  const secret = process.env.SESSION_SECRET;
  const session = readSessionCookie(request);

  if (await verifySession(session, secret, password)) {
    return next({
      headers: {
        'Cache-Control': 'private, no-store, max-age=0',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    });
  }

  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('next', `${url.pathname}${url.search}`);
  if (!password || !secret) loginUrl.searchParams.set('config', 'missing');
  return Response.redirect(loginUrl, 303);
}
