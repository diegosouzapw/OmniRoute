/**
 * Simple DI Container — Factory-pattern service locator
 *
 * Provides a lightweight dependency injection container using factory
 * functions (no heavy frameworks). Services are lazily instantiated
 * and cached as singletons.
 *
 * Usage:
 *   import { container } from '@/lib/container';
 *   const settings = container.resolve('settings');
 *
 * Registration:
 *   container.register('myService', () => new MyService());
 *
 * @module lib/container
 */

import { evaluateFirstAllowed, evaluateRequest, PolicyEngine } from "../domain/policyEngine";
import { getDbInstance } from "./db/core";
import {
  decrypt,
  decryptConnectionFields,
  encrypt,
  encryptConnectionFields,
} from "./db/encryption";
import { getSettings } from "./localDb";
import { getCircuitBreaker } from "../shared/utils/circuitBreaker";
import { recordTelemetry, RequestTelemetry } from "../shared/utils/requestTelemetry";

type Factory<T = any> = () => T;

class Container {
  private _factories = new Map<string, Factory>();
  private _instances = new Map<string, any>();

  /**
   * Register a factory for a service. Does NOT instantiate until resolve().
   */
  register<T>(name: string, factory: Factory<T>): void {
    this._factories.set(name, factory);
    // Clear cached instance if re-registering (useful for testing)
    this._instances.delete(name);
  }

  /**
   * Resolve a service by name. Lazy-creates via factory on first call,
   * then returns the cached singleton.
   */
  resolve<T = any>(name: string): T {
    if (this._instances.has(name)) {
      return this._instances.get(name) as T;
    }

    const factory = this._factories.get(name);
    if (!factory) {
      throw new Error(`[Container] No factory registered for "${name}"`);
    }

    const instance = factory();
    this._instances.set(name, instance);
    return instance as T;
  }

  /**
   * Check if a service is registered (factory exists).
   */
  has(name: string): boolean {
    return this._factories.has(name);
  }

  /**
   * List all registered service names.
   */
  list(): string[] {
    return Array.from(this._factories.keys());
  }

  /**
   * Reset all factories and instances (for testing).
   */
  reset(): void {
    this._factories.clear();
    this._instances.clear();
  }
}

// ── Singleton container instance ──
export const container = new Container();

// ── Default registrations ──
// Services are still lazily instantiated on first resolve().

container.register("settings", () => {
  return { get: getSettings };
});

container.register("db", () => {
  return getDbInstance();
});

container.register("encryption", () => {
  return {
    encrypt,
    decrypt,
    encryptConnectionFields,
    decryptConnectionFields,
  };
});

container.register("policyEngine", () => {
  return { evaluateRequest, evaluateFirstAllowed, PolicyEngine };
});

container.register("circuitBreaker", () => {
  return { get: getCircuitBreaker };
});

container.register("telemetry", () => {
  return { RequestTelemetry, recordTelemetry };
});

export default container;
