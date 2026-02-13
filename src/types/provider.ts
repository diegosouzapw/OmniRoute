/**
 * Provider connection — a configured cloud AI provider account.
 */
export interface ProviderConnection {
  id: string;
  provider: string;
  label: string;
  url: string;
  apiKey?: string;
  oauthToken?: string;
  oauthRefreshToken?: string;
  oauthExpiresAt?: string;
  isActive: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Provider node — a specific endpoint within a provider.
 */
export interface ProviderNode {
  id: string;
  connectionId: string;
  provider: string;
  model: string;
  baseUrl: string;
  isActive: boolean;
  priority: number;
}
