import { AGY_CONFIG } from "../constants/oauth";
import { createAntigravityOAuthProvider } from "./antigravity";

/** Official Antigravity CLI OAuth flow with an explicit CLI client identity. */
export const agy = createAntigravityOAuthProvider(AGY_CONFIG, "cli");
