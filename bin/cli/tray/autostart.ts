/**
 * Tray autostart — delegates to autostart.mjs (single implementation).
 */
import { enable, disable, isAutostartEnabled, getAutostartStatus } from "./autostart.mjs";

export async function enableAutoStart(): Promise<boolean> {
  return enable();
}

export async function disableAutoStart(): Promise<boolean> {
  return disable();
}

export async function isAutoStartEnabled(): Promise<boolean> {
  return isAutostartEnabled();
}

export { getAutostartStatus };
