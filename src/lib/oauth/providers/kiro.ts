import { KIRO_CONFIG, AWS_REGION_PATTERN, assertValidAwsRegion } from "../constants/oauth";
import { discoverKiroProfileArnAcrossRegions } from "@omniroute/open-sse/services/kiroRegion.ts";

export const kiro = {
  config: KIRO_CONFIG,
  flowType: "device_code",
  requestDeviceCode: async (config) => {
    const regionMatch = String(config.tokenUrl || "").match(/oidc\.([a-z0-9-]+)\.amazonaws\.com/i);
    const candidateRegion = regionMatch?.[1] || "us-east-1";
    // Region is sourced from KIRO_CONFIG.tokenUrl (trusted constant) but defensively
    // re-validate before letting it influence later fetches (GHSA-6mwv-4mrm-5p3m).
    const resolvedRegion = AWS_REGION_PATTERN.test(candidateRegion) ? candidateRegion : "us-east-1";
    const registerPayload: {
      clientName: string;
      clientType: string;
      scopes: string[];
      grantTypes: string[];
      issuerUrl?: string;
    } = {
      clientName: config.clientName,
      clientType: config.clientType,
      scopes: config.scopes,
      grantTypes: config.grantTypes,
    };

    // For enterprise IDC custom startUrl flows, issuerUrl can differ per tenant.
    // Sending a fixed issuerUrl often causes invalid_request during device auth.
    if (config.issuerUrl && !config.skipIssuerUrlForRegistration) {
      registerPayload.issuerUrl = config.issuerUrl;
    }

    // Step 1: Register client with AWS SSO OIDC
    const registerRes = await fetch(config.registerClientUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(registerPayload),
    });

    if (!registerRes.ok) {
      const error = await registerRes.text();
      throw new Error(`Client registration failed: ${error}`);
    }

    const clientInfo = await registerRes.json();

    // Step 2: Request device authorization
    const deviceRes = await fetch(config.deviceAuthUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        clientId: clientInfo.clientId,
        clientSecret: clientInfo.clientSecret,
        startUrl: config.startUrl,
      }),
    });

    if (!deviceRes.ok) {
      const error = await deviceRes.text();
      throw new Error(`Device authorization failed: ${error}`);
    }

    const deviceData = await deviceRes.json();

    return {
      device_code: deviceData.deviceCode,
      user_code: deviceData.userCode,
      verification_uri: deviceData.verificationUri,
      verification_uri_complete: deviceData.verificationUriComplete,
      expires_in: deviceData.expiresIn,
      interval: deviceData.interval || 5,
      _clientId: clientInfo.clientId,
      _clientSecret: clientInfo.clientSecret,
      _region: resolvedRegion,
    };
  },
  pollToken: async (config, deviceCode, codeVerifier, extraData) => {
    const tokenRegion = String(extraData?._region || "us-east-1").toLowerCase();
    assertValidAwsRegion(tokenRegion);
    const tokenUrl = `https://oidc.${tokenRegion}.amazonaws.com/token`;

    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        clientId: extraData?._clientId,
        clientSecret: extraData?._clientSecret,
        deviceCode: deviceCode,
        grantType: "urn:ietf:params:oauth:grant-type:device_code",
      }),
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      const text = await response.text();
      data = { error: "invalid_response", error_description: text };
    }

    if (data.accessToken) {
      return {
        ok: true,
        data: {
          access_token: data.accessToken,
          refresh_token: data.refreshToken,
          expires_in: data.expiresIn,
          _clientId: extraData?._clientId,
          _clientSecret: extraData?._clientSecret,
          _region: tokenRegion,
        },
      };
    }

    return {
      ok: false,
      data: {
        error: data.error || "authorization_pending",
        error_description: data.error_description || data.message,
      },
    };
  },
  // Enterprise IAM Identity Center accounts require a region-bound Q Developer profileArn on every
  // CodeWhisperer call; without it AWS returns 403 "User is not authorized to make this call". The
  // device-code flow does not return one, so discover it here via ListAvailableProfiles.
  //
  // The IdC/token region (`_region`, e.g. eu-north-1) is NOT where the Q Developer profile lives —
  // AWS only hosts the profile (and its runtime) in us-east-1 / eu-central-1. So probe those
  // profile regions with the freshly-minted SSO token (which works cross-region against the
  // profile's home region), NOT q.{idcRegion} which does not resolve. Best-effort: AWS Builder ID
  // accounts have no profile and this simply yields none; failures never block login.
  postExchange: async (tokenData) => {
    const accessToken = tokenData?.access_token;
    if (!accessToken) return null;
    const storedRegion = typeof tokenData?._region === "string" ? tokenData._region : undefined;
    const arn = await discoverKiroProfileArnAcrossRegions(accessToken, storedRegion);
    return arn ? { profileArn: arn } : null;
  },
  mapTokens: (tokens, extra) => ({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresIn: tokens.expires_in,
    providerSpecificData: {
      clientId: tokens._clientId,
      clientSecret: tokens._clientSecret,
      region: tokens._region,
      ...(extra?.profileArn ? { profileArn: extra.profileArn } : {}),
    },
  }),
};
