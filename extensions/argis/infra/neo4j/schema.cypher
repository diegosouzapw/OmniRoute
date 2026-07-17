// Neo4j Multi-Tenant Schema for Shared Aura Free Instance
// ============================================================================
// Each project uses label prefixes: bifrost_Model, vibeproxy_Model, etc.
// This allows complete isolation while sharing one database.
// ============================================================================

// ============================================================================
// BIFROST PROJECT SCHEMA
// ============================================================================

// Node Types
// CREATE CONSTRAINT bifrost_model_id IF NOT EXISTS FOR (n:bifrost_Model) REQUIRE n.id IS UNIQUE;
// CREATE CONSTRAINT bifrost_role_id IF NOT EXISTS FOR (n:bifrost_Role) REQUIRE n.id IS UNIQUE;
// CREATE CONSTRAINT bifrost_tool_id IF NOT EXISTS FOR (n:bifrost_Tool) REQUIRE n.id IS UNIQUE;
// CREATE CONSTRAINT bifrost_trait_name IF NOT EXISTS FOR (n:bifrost_Trait) REQUIRE n.name IS UNIQUE;
// CREATE CONSTRAINT bifrost_aspect_name IF NOT EXISTS FOR (n:bifrost_Aspect) REQUIRE n.name IS UNIQUE;
// CREATE CONSTRAINT bifrost_policy_id IF NOT EXISTS FOR (n:bifrost_Policy) REQUIRE n.id IS UNIQUE;
// CREATE CONSTRAINT bifrost_user_id IF NOT EXISTS FOR (n:bifrost_User) REQUIRE n.id IS UNIQUE;

// Indexes for common lookups
// CREATE INDEX bifrost_model_name IF NOT EXISTS FOR (n:bifrost_Model) ON (n.name);
// CREATE INDEX bifrost_role_name IF NOT EXISTS FOR (n:bifrost_Role) ON (n.name);
// CREATE INDEX bifrost_tool_name IF NOT EXISTS FOR (n:bifrost_Tool) ON (n.name);

// ============================================================================
// RELATIONSHIP TYPES (shared across namespaces)
// ============================================================================
// 
// Model relationships:
//   (Model)-[:HAS_TRAIT {weight: 0.0-1.0}]->(Trait)
//   (Model)-[:HAS_ASPECT {value: numeric}]->(Aspect)
//   (Model)-[:PERFORMS_ON {score: 0.0-1.0, samples: int}]->(Role)
//
// Tool relationships:
//   (Tool)-[:SUITABLE_FOR {score: 0.0-1.0}]->(Role)
//   (Tool)-[:HAS_TRAIT]->(Trait)
//   (Tool)-[:REQUIRES_MODEL]->(Model)
//
// Policy relationships:
//   (User)-[:HAS_POLICY]->(Policy)
//   (Org)-[:HAS_POLICY]->(Policy)
//   (Policy)-[:APPLIES_TO]->(Role|Model|Tool)
//   (Policy)-[:BLOCKS]->(Model|Tool)
//   (Role)-[:BLOCKED_BY]->(Policy)
//
// Role hierarchy:
//   (Role)-[:INHERITS]->(Role)
//   (Role)-[:HAS_ACCESS]->(Model)
//
// Learning relationships:
//   (Model)-[:OUTPERFORMED {context: string, samples: int}]->(Model)
//   (User)-[:PREFERS {task: string, confidence: float}]->(Model)
//   (Session)-[:USED]->(Model)

// ============================================================================
// SAMPLE DATA STRUCTURE
// ============================================================================

// -- Create Traits
// CREATE (:bifrost_Trait {name: 'fast', type: 'performance'})
// CREATE (:bifrost_Trait {name: 'cheap', type: 'cost'})
// CREATE (:bifrost_Trait {name: 'accurate', type: 'quality'})
// CREATE (:bifrost_Trait {name: 'concise', type: 'style'})
// CREATE (:bifrost_Trait {name: 'verbose', type: 'style'})
// CREATE (:bifrost_Trait {name: 'creative', type: 'capability'})
// CREATE (:bifrost_Trait {name: 'analytical', type: 'capability'})

// -- Create Aspects (measurable properties)
// CREATE (:bifrost_Aspect {name: 'latency_ms', unit: 'milliseconds'})
// CREATE (:bifrost_Aspect {name: 'cost_per_1k', unit: 'usd'})
// CREATE (:bifrost_Aspect {name: 'context_window', unit: 'tokens'})
// CREATE (:bifrost_Aspect {name: 'hallucination_risk', unit: 'score'})
// CREATE (:bifrost_Aspect {name: 'code_quality', unit: 'score'})

// -- Create Roles
// CREATE (:bifrost_Role {id: uuid(), name: 'code_review', risk_level: 'medium'})
// CREATE (:bifrost_Role {id: uuid(), name: 'creative_writing', risk_level: 'low'})
// CREATE (:bifrost_Role {id: uuid(), name: 'data_analysis', risk_level: 'low'})
// CREATE (:bifrost_Role {id: uuid(), name: 'tool_execution', risk_level: 'high'})

// -- Create Models
// CREATE (:bifrost_Model {id: uuid(), name: 'gpt-4o', provider: 'openai'})
// CREATE (:bifrost_Model {id: uuid(), name: 'claude-3-5-sonnet', provider: 'anthropic'})
// CREATE (:bifrost_Model {id: uuid(), name: 'gemini-2.0-flash', provider: 'google'})

// -- Create Relationships
// MATCH (m:bifrost_Model {name: 'gpt-4o'}), (t:bifrost_Trait {name: 'fast'})
// CREATE (m)-[:HAS_TRAIT {weight: 0.8}]->(t)

// MATCH (m:bifrost_Model {name: 'gpt-4o'}), (r:bifrost_Role {name: 'code_review'})
// CREATE (m)-[:PERFORMS_ON {score: 0.92, samples: 1500}]->(r)

// ============================================================================
// QUERY EXAMPLES
// ============================================================================

// -- Find best models for a role
// MATCH (m:bifrost_Model)-[rel:PERFORMS_ON]->(r:bifrost_Role {name: 'code_review'})
// RETURN m.name, rel.score ORDER BY rel.score DESC LIMIT 5

// -- Find models with specific traits
// MATCH (m:bifrost_Model)-[:HAS_TRAIT]->(t:bifrost_Trait)
// WHERE t.name IN ['fast', 'cheap']
// RETURN m.name, collect(t.name) as traits

// -- Check if user can access model
// MATCH (u:bifrost_User {id: $userId})-[:HAS_POLICY]->(p:bifrost_Policy)-[:APPLIES_TO]->(m:bifrost_Model {name: $modelName})
// WHERE NOT EXISTS { (p)-[:BLOCKS]->(m) }
// RETURN count(p) > 0 as hasAccess

// -- Get role hierarchy
// MATCH (r:bifrost_Role {name: $roleName})-[:INHERITS*0..]->(parent:bifrost_Role)
// RETURN parent.name, length(path) as depth

// -- Cross-project query (admin only)
// MATCH (m)-[:PERFORMS_ON]->(r)
// WHERE any(label IN labels(m) WHERE label ENDS WITH '_Model')
// RETURN labels(m)[0] as project, m.name, r.name

