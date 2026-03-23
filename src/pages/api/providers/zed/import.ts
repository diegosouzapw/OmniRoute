/**
 * API endpoint for importing Zed IDE OAuth credentials
 * 
 * POST /api/providers/zed/import
 * 
 * Discovers and imports OAuth credentials from Zed IDE's keychain storage.
 * Supports all major Zed providers: OpenAI, Anthropic, Google, Mistral, xAI, etc.
 * 
 * Security: Requires authentication. First-time keychain access will prompt user for OS permission.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { discoverZedCredentials, isZedInstalled } from '@/lib/zed-oauth/keychain-reader';

interface ImportResponse {
  success: boolean;
  count?: number;
  providers?: string[];
  error?: string;
  zedInstalled?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImportResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.'
    });
  }

  try {
    // Check if Zed is installed
    const zedInstalled = await isZedInstalled();
    
    if (!zedInstalled) {
      return res.status(404).json({
        success: false,
        error: 'Zed IDE does not appear to be installed on this system.',
        zedInstalled: false
      });
    }

    // Discover credentials from keychain
    console.log('[Zed Import] Discovering Zed credentials from keychain...');
    const credentials = await discoverZedCredentials();

    if (credentials.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        providers: [],
        zedInstalled: true
      });
    }

    // Import discovered credentials
    // TODO: Integrate with OmniRoute's provider registration system
    // For now, return discovered credentials for manual addition
    
    const importedProviders = credentials.map(c => c.provider);
    const uniqueProviders = [...new Set(importedProviders)];

    console.log(`[Zed Import] Discovered ${credentials.length} credentials for ${uniqueProviders.length} providers`);

    return res.status(200).json({
      success: true,
      count: credentials.length,
      providers: uniqueProviders,
      zedInstalled: true
    });

  } catch (error) {
    console.error('[Zed Import] Error importing credentials:', error);
    
    // Check for common keychain access errors
    if (error.message.includes('User canceled') || error.message.includes('denied')) {
      return res.status(403).json({
        success: false,
        error: 'Keychain access denied. Please grant permission when prompted by your OS.'
      });
    }

    if (error.message.includes('not found') || error.message.includes('ENOENT')) {
      return res.status(404).json({
        success: false,
        error: 'Keychain service not available on this system.'
      });
    }

    return res.status(500).json({
      success: false,
      error: `Failed to import credentials: ${error.message}`
    });
  }
}
