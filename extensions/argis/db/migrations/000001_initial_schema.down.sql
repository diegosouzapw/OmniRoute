-- Rollback migration: initial_schema
-- Drops all tables, indexes, and extensions created in the initial schema

-- Drop indexes
DROP INDEX IF EXISTS idx_conversation_segments_conv;
DROP INDEX IF EXISTS idx_bandit_model_role;
DROP INDEX IF EXISTS idx_routing_events_user;
DROP INDEX IF EXISTS idx_routing_events_created;
DROP INDEX IF EXISTS idx_models_status;
DROP INDEX IF EXISTS idx_models_provider;
DROP INDEX IF EXISTS idx_document_embedding;
DROP INDEX IF EXISTS idx_conversation_embedding;
DROP INDEX IF EXISTS idx_tool_semantic_embedding;
DROP INDEX IF EXISTS idx_model_semantic_embedding;

-- Drop tables (in reverse dependency order)
DROP TABLE IF EXISTS document_chunks;
DROP TABLE IF EXISTS conversation_segments;
DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS routing_events;
DROP TABLE IF EXISTS bandit_state;
DROP TABLE IF EXISTS tool_role_scores;
DROP TABLE IF EXISTS model_role_scores;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS tool_metrics;
DROP TABLE IF EXISTS tool_semantic_profiles;
DROP TABLE IF EXISTS tools;
DROP TABLE IF EXISTS model_semantic_profiles;
DROP TABLE IF EXISTS model_abilities;
DROP TABLE IF EXISTS model_metrics;
DROP TABLE IF EXISTS models;

-- Drop extensions
DROP EXTENSION IF EXISTS "vector";
DROP EXTENSION IF EXISTS "uuid-ossp";
