export interface ModelCooldownErrorPayload {
  error: {
    message: string;
    type: "rate_limit_error";
    code: "model_cooldown";
    model?: string;
    reset_seconds: number;
    retry_after?: string;
    credentials_cooling?: number;
  };
}
