/**
 * Plugin error codes — structured error handling for plugin system.
 *
 * @module plugins/errors
 */

export enum PluginErrorCode {
  PLUGIN_NOT_FOUND = "PLUGIN_NOT_FOUND",
  ALREADY_INSTALLED = "ALREADY_INSTALLED",
  INVALID_MANIFEST = "INVALID_MANIFEST",
  INSTALL_FAILED = "INSTALL_FAILED",
  ACTIVATE_FAILED = "ACTIVATE_FAILED",
  DEACTIVATE_FAILED = "DEACTIVATE_FAILED",
  UNINSTALL_FAILED = "UNINSTALL_FAILED",
  HOOK_TIMEOUT = "HOOK_TIMEOUT",
  HOOK_EXECUTION_ERROR = "HOOK_EXECUTION_ERROR",
  PROCESS_CRASHED = "PROCESS_CRASHED",
  DEPENDENCY_MISSING = "DEPENDENCY_MISSING",
  DEPENDENT_EXISTS = "DEPENDENT_EXISTS",
  PERMISSION_DENIED = "PERMISSION_DENIED",
  RATE_LIMITED = "RATE_LIMITED",
}

export class PluginError extends Error {
  code: PluginErrorCode;
  details?: unknown;

  constructor(code: PluginErrorCode, message: string, details?: unknown) {
    super(message);
    this.name = "PluginError";
    this.code = code;
    this.details = details;
  }
}

export function isPluginError(err: unknown): err is PluginError {
  return err instanceof PluginError;
}
