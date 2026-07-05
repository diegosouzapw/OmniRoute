import { redirect, type Handle } from '@sveltejs/kit';

const UPSTREAM = process.env.NEXTJS_UPSTREAM ?? 'http://localhost:20128';
const DEFAULT_ROLLOUT = Number(process.env.OMNI_WEB_STACK_ROLLOUT ?? '100');

function bucketForUser(cookie: string | undefined): number {
  // Simple consistent bucket from cookie or random for anonymous
  const seed = cookie ? hash(cookie) : Math.floor(Math.random() * 1e9);
  return seed % 100;
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export const handle: Handle = async ({ event, resolve }) => {
  const url = new URL(event.request.url);
  const webStack = event.cookies.get('web_stack');
  const force = url.searchParams.get('web');

  // Per-route force: ?web=svelte sets cookie, ?web=next redirects to upstream
  if (force === 'svelte') {
    event.cookies.set('web_stack', 'svelte', { path: '/', maxAge: 60 * 60 * 24 * 365 });
    const clean = url.pathname + (url.search ? url.search.replace(/[?&]web=svelte/, '').replace(/^&/, '?') : '');
    return redirect(clean || '/dashboard');
  }
  if (force === 'next') {
    event.cookies.set('web_stack', 'next', { path: '/', maxAge: 60 * 60 * 24 * 365 });
    return redirect(302, `${UPSTREAM}${url.pathname}${url.search}`);
  }

  // Sticky override
  if (webStack === 'next') {
    return redirect(302, `${UPSTREAM}${url.pathname}${url.search}`);
  }

  // Default rollout: only serve Svelte if user's bucket <= rollout
  const bucket = bucketForUser(event.cookies.get('session_id'));
  if (webStack !== 'svelte' && bucket >= DEFAULT_ROLLOUT) {
    return redirect(302, `${UPSTREAM}${url.pathname}${url.search}`);
  }

  return resolve(event);
};
