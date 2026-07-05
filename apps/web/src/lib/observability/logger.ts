type Level = 'debug' | 'info' | 'warn' | 'error';

const LEVELS: Record<Level, number> = { debug: 0, info: 1, warn: 2, error: 3 };
const minLevel: Level = (typeof process !== 'undefined' && (process.env.LOG_LEVEL as Level)) || 'info';

function emit(level: Level, scope: string, message: string, extra?: Record<string, unknown>) {
  if (LEVELS[level] < LEVELS[minLevel]) return;
  const entry = { ts: new Date().toISOString(), level, scope, message, ...extra };
  const line = JSON.stringify(entry);
  if (level === 'error') console.error(line);
  else if (level === 'warn') console.warn(line);
  else console.info(line);
  if (typeof navigator !== 'undefined' && navigator.sendBeacon && level === 'error') {
    try { navigator.sendBeacon('/api/v1/telemetry/errors', line); } catch {}
  }
}

export function getLogger(scope: string) {
  return {
    debug: (message: string, extra?: Record<string, unknown>) => emit('debug', scope, message, extra),
    info: (message: string, extra?: Record<string, unknown>) => emit('info', scope, message, extra),
    warn: (message: string, extra?: Record<string, unknown>) => emit('warn', scope, message, extra),
    error: (message: string, extra?: Record<string, unknown>) => emit('error', scope, message, extra),
  };
}
