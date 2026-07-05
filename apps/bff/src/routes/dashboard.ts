import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { streamSSE } from 'hono/streaming';
import { z } from 'zod';
import { ProviderSchema } from '@omniroute/api-contracts';

const SettingsSchema = z.object({
  baseUrl: z.string().url(),
  telemetry: z.boolean(),
  autoUpdate: z.boolean(),
  language: z.string(),
  theme: z.enum(['auto', 'light', 'dark']),
});

const KeyCreateSchema = z.object({
  name: z.string().min(1).max(100),
});

const SecuritySchema = z.object({
  csrfEnabled: z.boolean(),
  jwtSecretRotatedAt: z.string().nullable(),
  mitmCertInstalled: z.boolean(),
  sessionSecretStrong: z.boolean(),
  openaiApiKeyLeakage: z.enum(['safe', 'warning', 'unsafe', 'unknown']),
});

export const dashboardRoutes = new Hono()
  .get('/health', (c) => c.json({ status: 'healthy', ts: new Date().toISOString() }))
  .get('/providers', (c) => c.json({ providers: [] }))
  .post('/providers', zValidator('json', ProviderSchema), (c) => c.json({ ok: true, provider: c.req.valid('json') }))
  .get('/usage', (c) => c.json({ rows: [] }))
  .get('/combos', (c) => c.json({ combos: [] }))
  .get('/security', (c) => c.json({
    csrfEnabled: true,
    jwtSecretRotatedAt: '2026-06-15T00:00:00Z',
    mitmCertInstalled: false,
    sessionSecretStrong: true,
    openaiApiKeyLeakage: 'safe' as const,
  } satisfies z.infer<typeof SecuritySchema>))
  .get('/keys', (c) => c.json({ keys: [] }))
  .post('/keys', zValidator('json', KeyCreateSchema), (c) => c.json({
    ok: true,
    key: {
      id: crypto.randomUUID(),
      name: c.req.valid('json').name,
      prefix: 'omni_pk_' + Math.random().toString(36).slice(2, 10),
      createdAt: new Date().toISOString(),
      lastUsedAt: null,
      revoked: false,
    },
  }))
  .post('/keys/:id/revoke', (c) => c.json({ ok: true, id: c.req.param('id') }))
  .get('/settings', (c) => c.json({
    baseUrl: 'http://localhost:20128',
    telemetry: true,
    autoUpdate: true,
    language: 'en',
    theme: 'auto',
  }))
  .post('/settings', zValidator('json', SettingsSchema), (c) => c.json({ ok: true, settings: c.req.valid('json') }))
  .get('/health/stream', (c) => {
    return streamSSE(c, async (stream) => {
      let id = 0;
      const send = async (level: 'info' | 'warn' | 'error', message: string) => {
        await stream.writeSSE({
          id: String(id++),
          event: 'health',
          data: JSON.stringify({ ts: new Date().toISOString(), level, message }),
        });
      };
      await send('info', 'SSE stream connected');
      const interval = setInterval(() => {
        send('info', `heartbeat @ ${new Date().toLocaleTimeString()}`).catch(() => {});
      }, 5000);
      stream.onAbort(() => clearInterval(interval));
      await new Promise<void>((resolve) => stream.onAbort(() => resolve()));
    });
  });
