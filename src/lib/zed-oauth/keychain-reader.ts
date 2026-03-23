/**
 * Zed IDE OAuth Token Extractor
 * 
 * Extracts OAuth credentials from OS keychain where Zed IDE stores them.
 * Supports macOS (Keychain), Windows (Credential Manager), and Linux (libsecret).
 * 
 * @see https://zed.dev/docs/ai/llm-providers - Official Zed documentation confirming keychain storage
 */

import keytar from 'keytar';

export interface ZedCredential {
  provider: string;
  service: string;
  account: string;
  token: string;
}

/**
 * Common service name patterns used by Zed IDE for storing OAuth tokens
 */
const ZED_SERVICE_PATTERNS = [
  // OpenAI
  'zed-openai',
  'ai.zed.openai',
  'zed.openai',
  'Zed-OpenAI',
  
  // Anthropic
  'zed-anthropic',
  'ai.zed.anthropic',
  'zed.anthropic',
  'Zed-Anthropic',
  
  // Google AI
  'zed-google',
  'ai.zed.google',
  'zed.google',
  'Zed-Google',
  
  // Mistral
  'zed-mistral',
  'ai.zed.mistral',
  'zed.mistral',
  'Zed-Mistral',
  
  // xAI
  'zed-xai',
  'ai.zed.xai',
  'zed.xai',
  'Zed-xAI',
  
  // OpenRouter
  'zed-openrouter',
  'ai.zed.openrouter',
  'zed.openrouter',
  'Zed-OpenRouter',
  
  // DeepSeek
  'zed-deepseek',
  'ai.zed.deepseek',
  'zed.deepseek',
  'Zed-DeepSeek'
];

/**
 * Maps Zed service names to OmniRoute provider IDs
 */
function extractProviderFromService(service: string): string {
  const lower = service.toLowerCase();
  if (lower.includes('openai')) return 'openai';
  if (lower.includes('anthropic')) return 'anthropic';
  if (lower.includes('google')) return 'google';
  if (lower.includes('mistral')) return 'mistral';
  if (lower.includes('xai')) return 'xai';
  if (lower.includes('openrouter')) return 'openrouter';
  if (lower.includes('deepseek')) return 'deepseek';
  return 'unknown';
}

/**
 * Discovers all Zed OAuth credentials stored in the system keychain
 * 
 * @returns Array of discovered credentials with provider, service, and token
 */
export async function discoverZedCredentials(): Promise<ZedCredential[]> {
  const credentials: ZedCredential[] = [];
  
  for (const pattern of ZED_SERVICE_PATTERNS) {
    try {
      // Try to find credentials for this service
      const creds = await keytar.findCredentials(pattern);
      
      for (const cred of creds) {
        credentials.push({
          provider: extractProviderFromService(pattern),
          service: pattern,
          account: cred.account,
          token: cred.password
        });
      }
    } catch (error) {
      console.debug(`No credentials found for ${pattern}:`, error.message);
      // Continue to next pattern
    }
  }

  return credentials;
}

/**
 * Gets a specific Zed credential for a provider
 * 
 * @param provider - Provider name (openai, anthropic, google, etc.)
 * @returns The credential if found, null otherwise
 */
export async function getZedCredential(provider: string): Promise<ZedCredential | null> {
  const patterns = ZED_SERVICE_PATTERNS.filter(p => 
    p.toLowerCase().includes(provider.toLowerCase())
  );

  for (const pattern of patterns) {
    try {
      // Try common account names
      const accountNames = ['api-key', 'token', 'oauth', provider];
      
      for (const account of accountNames) {
        const token = await keytar.getPassword(pattern, account);
        if (token) {
          return {
            provider,
            service: pattern,
            account,
            token
          };
        }
      }

      // If no specific account found, try finding all for this service
      const creds = await keytar.findCredentials(pattern);
      if (creds.length > 0) {
        return {
          provider,
          service: pattern,
          account: creds[0].account,
          token: creds[0].password
        };
      }
    } catch (error) {
      console.debug(`Failed to get credential for ${pattern}:`, error.message);
    }
  }

  return null;
}

/**
 * Checks if Zed IDE appears to be installed and configured
 * 
 * @returns true if Zed config directory exists
 */
export async function isZedInstalled(): Promise<boolean> {
  const fs = require('fs');
  const os = require('os');
  const path = require('path');
  
  const homeDir = os.homedir();
  const zedConfigPaths = [
    path.join(homeDir, '.config', 'zed'),  // Linux
    path.join(homeDir, 'Library', 'Application Support', 'Zed'),  // macOS
    path.join(homeDir, 'AppData', 'Roaming', 'Zed')  // Windows
  ];

  for (const configPath of zedConfigPaths) {
    if (fs.existsSync(configPath)) {
      return true;
    }
  }

  return false;
}
