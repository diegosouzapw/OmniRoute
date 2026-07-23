-- Migration 098: Clear semantic_cache after key-isolation fix (#3740)
-- Old signatures were computed without the API key ID dimension, so existing
-- entries would be shared across users. Truncating forces new scoped entries.
DELETE FROM semantic_cache;
