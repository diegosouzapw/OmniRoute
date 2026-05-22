export interface MitmTarget {
  id: string;
  name: string;
  description: string;
  targetHost: string;
  targetPort: number;
  localPort: number;
  userAgentPattern: string | null;
  apiEndpoints: string[];
  authHeader: string;
  additionalHosts?: string[];
  instructions: string[];
  referenceIde?: string;
}

export const ANTIGRAVITY_MITM_PROFILE: MitmTarget = {
  id: "antigravity",
  name: "Antigravity IDE",
  description:
    "Intercepts Antigravity IDE requests to cloudcode-pa.googleapis.com and routes them through OmniRoute.",
  targetHost: "daily-cloudcode-pa.googleapis.com",
  targetPort: 443,
  localPort: 443,
  userAgentPattern: null,
  apiEndpoints: [
    "/v1internal:generateContent",
    "/v1internal:streamGenerateContent",
    "/v1internal:loadCodeAssist",
    "/v1internal:onboardUser",
  ],
  authHeader: "authorization",
  additionalHosts: ["cloudcode-pa.googleapis.com", "daily-cloudcode-pa.sandbox.googleapis.com"],
  instructions: [
    "1. Install OmniRoute's root certificate",
    "2. Start the MITM proxy via Dashboard or CLI",
    "3. Configure model mappings in Dashboard → CLI Tools → Antigravity",
    "4. Open Antigravity IDE — API calls will be routed through OmniRoute",
  ],
};
