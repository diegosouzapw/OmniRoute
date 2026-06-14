export const RESPONSES_PREVIOUS_RESPONSE_ID_MODES = ["auto", "strip", "preserve"] as const;

export type ResponsesPreviousResponseIdMode = (typeof RESPONSES_PREVIOUS_RESPONSE_ID_MODES)[number];

export const DEFAULT_RESPONSES_PREVIOUS_RESPONSE_ID_MODE: ResponsesPreviousResponseIdMode = "auto";
