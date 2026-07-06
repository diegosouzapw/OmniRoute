import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { dashboardRoutes } from './routes/dashboard';
import { proxyRoutes } from './routes/proxy';
import { gatewayRoutes } from './routes/gateway/proxy';
import { trpcRoutes } from './trpc/hono';

const app = new Hono();

app.use('*', logger());
app.use('*', cors({ origin: ['http://localhost:4321'], credentials: true }));

app.get('/healthz', (c) => c.json({ status: 'ok', service: 'omniroute-bff' }));

app.route('/api/dashboard', dashboardRoutes);
app.route('/api/v1', proxyRoutes);
app.route('/api/dashboard/gateway', gatewayRoutes);
app.route('/api/trpc', trpcRoutes);

export type AppType = typeof app;
export default app;
