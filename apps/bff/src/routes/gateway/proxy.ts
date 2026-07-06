import { Hono } from 'hono';
import { kbridge, kbridgeAvailable } from '../kbridge/client';

export const gatewayRoutes = new Hono()
  .get('/ping', async (c) => {
    if (!kbridgeAvailable()) return c.json({ ok: false, message: 'gateway socket not configured' }, 503);
    const reply = await kbridge.ping();
    return c.json(reply);
  })
  .get('/health', async (c) => {
    if (!kbridgeAvailable()) return c.json({ ok: false, message: 'gateway socket not configured' }, 503);
    const reply = await kbridge.health();
    return c.json(reply);
  });
