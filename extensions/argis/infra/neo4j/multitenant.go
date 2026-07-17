// Package neo4j provides multi-tenant Neo4j support for sharing a single
// Neo4j Aura Free instance across multiple projects using namespace isolation.
package neo4j

import (
	"context"
	"fmt"

	"github.com/neo4j/neo4j-go-driver/v5/neo4j"
)

// ProjectNamespace represents a project's isolated namespace in the shared Neo4j instance
type ProjectNamespace string

const (
	NamespaceBifrost   ProjectNamespace = "bifrost"
	NamespaceVibeProxy ProjectNamespace = "vibeproxy"
	NamespaceJarvis    ProjectNamespace = "jarvis"
	NamespaceTrace     ProjectNamespace = "trace"
	NamespaceDefault   ProjectNamespace = "default"
)

// MultiTenantClient wraps Client with project namespace isolation
type MultiTenantClient struct {
	*Client
	namespace ProjectNamespace
}

// NewMultiTenantClient creates a client with namespace isolation
func NewMultiTenantClient(config Config, namespace ProjectNamespace) (*MultiTenantClient, error) {
	client, err := New(config)
	if err != nil {
		return nil, err
	}
	return &MultiTenantClient{
		Client:    client,
		namespace: namespace,
	}, nil
}

// InitializeNamespace sets up the namespace with constraints and indexes
func (c *MultiTenantClient) InitializeNamespace(ctx context.Context) error {
	session := c.driver.NewSession(ctx, neo4j.SessionConfig{DatabaseName: c.database})
	defer session.Close(ctx)

	// Create namespace-specific constraints
	queries := []string{
		// Unique constraint on project-scoped nodes
		fmt.Sprintf(`CREATE CONSTRAINT IF NOT EXISTS FOR (n:%s_Model) REQUIRE n.id IS UNIQUE`, c.namespace),
		fmt.Sprintf(`CREATE CONSTRAINT IF NOT EXISTS FOR (n:%s_Role) REQUIRE n.id IS UNIQUE`, c.namespace),
		fmt.Sprintf(`CREATE CONSTRAINT IF NOT EXISTS FOR (n:%s_Tool) REQUIRE n.id IS UNIQUE`, c.namespace),
		fmt.Sprintf(`CREATE CONSTRAINT IF NOT EXISTS FOR (n:%s_Policy) REQUIRE n.id IS UNIQUE`, c.namespace),
		fmt.Sprintf(`CREATE CONSTRAINT IF NOT EXISTS FOR (n:%s_User) REQUIRE n.id IS UNIQUE`, c.namespace),

		// Indexes for common lookups
		fmt.Sprintf(`CREATE INDEX IF NOT EXISTS FOR (n:%s_Model) ON (n.name)`, c.namespace),
		fmt.Sprintf(`CREATE INDEX IF NOT EXISTS FOR (n:%s_Role) ON (n.name)`, c.namespace),
		fmt.Sprintf(`CREATE INDEX IF NOT EXISTS FOR (n:%s_Tool) ON (n.name)`, c.namespace),
	}

	for _, q := range queries {
		if _, err := session.Run(ctx, q, nil); err != nil {
			return fmt.Errorf("failed to initialize namespace %s: %w", c.namespace, err)
		}
	}
	return nil
}

// CreateModel creates a model node in this namespace
func (c *MultiTenantClient) CreateModel(ctx context.Context, model ModelNode) error {
	session := c.driver.NewSession(ctx, neo4j.SessionConfig{DatabaseName: c.database})
	defer session.Close(ctx)

	query := fmt.Sprintf(`
		MERGE (m:%s_Model {id: $id})
		SET m.name = $name,
		    m.provider = $provider,
		    m.updatedAt = datetime()
	`, c.namespace)

	_, err := session.Run(ctx, query, map[string]any{
		"id":       model.ID,
		"name":     model.Name,
		"provider": model.Provider,
	})
	return err
}

// CreateRole creates a role node in this namespace
func (c *MultiTenantClient) CreateRole(ctx context.Context, role RoleNode) error {
	session := c.driver.NewSession(ctx, neo4j.SessionConfig{DatabaseName: c.database})
	defer session.Close(ctx)

	query := fmt.Sprintf(`
		MERGE (r:%s_Role {id: $id})
		SET r.name = $name,
		    r.riskLevel = $riskLevel,
		    r.updatedAt = datetime()
	`, c.namespace)

	_, err := session.Run(ctx, query, map[string]any{
		"id":        role.ID,
		"name":      role.Name,
		"riskLevel": role.RiskLevel,
	})
	return err
}

// LinkModelToRole creates a PERFORMS_ON relationship
func (c *MultiTenantClient) LinkModelToRole(ctx context.Context, modelID, roleID string, score float64) error {
	session := c.driver.NewSession(ctx, neo4j.SessionConfig{DatabaseName: c.database})
	defer session.Close(ctx)

	query := fmt.Sprintf(`
		MATCH (m:%s_Model {id: $modelId})
		MATCH (r:%s_Role {id: $roleId})
		MERGE (m)-[rel:PERFORMS_ON]->(r)
		SET rel.score = $score, rel.updatedAt = datetime()
	`, c.namespace, c.namespace)

	_, err := session.Run(ctx, query, map[string]any{
		"modelId": modelID,
		"roleId":  roleID,
		"score":   score,
	})
	return err
}

// GetModelsForRole returns models suitable for a role in this namespace
func (c *MultiTenantClient) GetModelsForRole(ctx context.Context, roleName string) ([]ModelNode, error) {
	session := c.driver.NewSession(ctx, neo4j.SessionConfig{DatabaseName: c.database})
	defer session.Close(ctx)

	query := fmt.Sprintf(`
		MATCH (m:%s_Model)-[rel:PERFORMS_ON]->(r:%s_Role {name: $roleName})
		RETURN m.id AS id, m.name AS name, m.provider AS provider, rel.score AS score
		ORDER BY rel.score DESC
	`, c.namespace, c.namespace)

	result, err := session.Run(ctx, query, map[string]any{"roleName": roleName})
	if err != nil {
		return nil, err
	}

	var models []ModelNode
	for result.Next(ctx) {
		rec := result.Record()
		models = append(models, ModelNode{
			ID:       rec.Values[0].(string),
			Name:     rec.Values[1].(string),
			Provider: rec.Values[2].(string),
		})
	}
	return models, result.Err()
}

// ModelNode represents a model in the graph
type ModelNode struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Provider string `json:"provider"`
}

// RoleNode represents a role in the graph
type RoleNode struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	RiskLevel string `json:"risk_level"`
}

// TraitNode represents a model/tool trait
type TraitNode struct {
	Name string `json:"name"`
	Type string `json:"type"` // performance, cost, quality, style, capability
}

// CreateTrait creates a trait node in this namespace
func (c *MultiTenantClient) CreateTrait(ctx context.Context, trait TraitNode) error {
	session := c.driver.NewSession(ctx, neo4j.SessionConfig{DatabaseName: c.database})
	defer session.Close(ctx)

	query := fmt.Sprintf(`
		MERGE (t:%s_Trait {name: $name})
		SET t.type = $type, t.updatedAt = datetime()
	`, c.namespace)

	_, err := session.Run(ctx, query, map[string]any{
		"name": trait.Name,
		"type": trait.Type,
	})
	return err
}

// LinkModelTrait creates a HAS_TRAIT relationship
func (c *MultiTenantClient) LinkModelTrait(ctx context.Context, modelID, traitName string, weight float64) error {
	session := c.driver.NewSession(ctx, neo4j.SessionConfig{DatabaseName: c.database})
	defer session.Close(ctx)

	query := fmt.Sprintf(`
		MATCH (m:%s_Model {id: $modelId})
		MATCH (t:%s_Trait {name: $traitName})
		MERGE (m)-[rel:HAS_TRAIT]->(t)
		SET rel.weight = $weight, rel.updatedAt = datetime()
	`, c.namespace, c.namespace)

	_, err := session.Run(ctx, query, map[string]any{
		"modelId":   modelID,
		"traitName": traitName,
		"weight":    weight,
	})
	return err
}

// GetModelsByTrait finds models with a specific trait
func (c *MultiTenantClient) GetModelsByTrait(ctx context.Context, traitName string, minWeight float64) ([]ModelNode, error) {
	session := c.driver.NewSession(ctx, neo4j.SessionConfig{DatabaseName: c.database})
	defer session.Close(ctx)

	query := fmt.Sprintf(`
		MATCH (m:%s_Model)-[rel:HAS_TRAIT]->(t:%s_Trait {name: $traitName})
		WHERE rel.weight >= $minWeight
		RETURN m.id AS id, m.name AS name, m.provider AS provider, rel.weight AS weight
		ORDER BY rel.weight DESC
	`, c.namespace, c.namespace)

	result, err := session.Run(ctx, query, map[string]any{
		"traitName": traitName,
		"minWeight": minWeight,
	})
	if err != nil {
		return nil, err
	}

	var models []ModelNode
	for result.Next(ctx) {
		rec := result.Record()
		models = append(models, ModelNode{
			ID:       rec.Values[0].(string),
			Name:     rec.Values[1].(string),
			Provider: rec.Values[2].(string),
		})
	}
	return models, result.Err()
}

// RecordModelOutperformance records when one model outperforms another
func (c *MultiTenantClient) RecordModelOutperformance(ctx context.Context, winnerID, loserID, context string, samples int) error {
	session := c.driver.NewSession(ctx, neo4j.SessionConfig{DatabaseName: c.database})
	defer session.Close(ctx)

	query := fmt.Sprintf(`
		MATCH (winner:%s_Model {id: $winnerId})
		MATCH (loser:%s_Model {id: $loserId})
		MERGE (winner)-[rel:OUTPERFORMED]->(loser)
		ON CREATE SET rel.samples = $samples, rel.context = $context, rel.createdAt = datetime()
		ON MATCH SET rel.samples = rel.samples + $samples, rel.updatedAt = datetime()
	`, c.namespace, c.namespace)

	_, err := session.Run(ctx, query, map[string]any{
		"winnerId": winnerID,
		"loserId":  loserID,
		"context":  context,
		"samples":  samples,
	})
	return err
}
