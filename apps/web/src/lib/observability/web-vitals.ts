import { onLCP, onFID, onCLS, onINP, onTTFB, onFCP, type Metric } from 'web-vitals';

const ENDPOINT = '/api/v1/telemetry/web-vitals';

export function reportMetric(metric: Metric) {
  try {
    const body = JSON.stringify({
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      navigationType: metric.navigationType,
      ts: Date.now(),
    });
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, body);
    } else if (typeof fetch !== 'undefined') {
      fetch(ENDPOINT, { method: 'POST', body, keepalive: true, headers: { 'content-type': 'application/json' } }).catch(() => {});
    }
  } catch {
    // never throw
  }
}

export function initWebVitals() {
  if (typeof window === 'undefined') return;
  try {
    onLCP(reportMetric);
    onFID(reportMetric);
    onCLS(reportMetric);
    onINP(reportMetric);
    onTTFB(reportMetric);
    onFCP(reportMetric);
  } catch {
    // web-vitals not loaded
  }
}
