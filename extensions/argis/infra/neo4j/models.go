package neo4j

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"github.com/neo4j/neo4j-go-driver/v5/neo4j"
)

// ModelAccess represents model access information
type ModelAccess struct {
	ModelID       uuid.UUID `json:"model_id"`
	ModelName     string    `json:"model_name"`
	AllowedRoles  []string  `json:"allowed_roles"`
	BlockedRoles  []string  `json:"blocked_roles"`
	RequiredTier  string    `json:"required_tier"` // free, pro, enterprise
	MaxCostPerDay float64   `json:"max_cost_per_day"`
}

// ToolAccess represents tool access information
type ToolAccess struct {
	ToolID        uuid.UUID `json:"tool_id"`
	ToolName      string    `json:"tool_name"`
	AllowedRoles  []string  `json:"allowed_roles"`
	RequiresHuman bool      `json:"requires_human"` // requires human approval
	RiskLevel     string    `json:"risk_level"`     // low, medium, high
}

// GetModelAccessForRole returns models accessible to a role
func (c *Client) GetModelAccessForRole(ctx context.Context, roleID string) ([]ModelAccess, error) {
	session := c.driver.NewSession(ctx, neo4j.SessionConfig{DatabaseName: c.database})
	defer session.Close(ctx)

	result, err := session.Run(ctx, `
		MATCH (r:Role {id: $roleId})-[:INHERITS*0..]->(ancestor:Role)
		MATCH (ancestor)-[:HAS_ACCESS]->(m:Model)
		WHERE NOT EXISTS {
			MATCH (ancestor)-[:BLOCKED_BY]->(:Policy)-[:BLOCKS]->(m)
		}
		RETURN DISTINCT m.id as id, m.name as name, m.requiredTier as tier, m.maxCostPerDay as maxCost
	`, map[string]interface{}{"roleId": roleID})
	if err != nil {
		return nil, err
	}

	var models []ModelAccess
	for result.Next(ctx) {
		record := result.Record()
		id, _ := record.Get("id")
		name, _ := record.Get("name")
		tier, _ := record.Get("tier")
		maxCost, _ := record.Get("maxCost")

		modelID, _ := uuid.Parse(id.(string))
		access := ModelAccess{
			ModelID:   modelID,
			ModelName: name.(string),
		}
		if tier != nil {
			access.RequiredTier = tier.(string)
		}
		if maxCost != nil {
			access.MaxCostPerDay = maxCost.(float64)
		}
		models = append(models, access)
	}

	return models, result.Err()
}

// GetToolAccessForRole returns tools accessible to a role
func (c *Client) GetToolAccessForRole(ctx context.Context, roleID string) ([]ToolAccess, error) {
	session := c.driver.NewSession(ctx, neo4j.SessionConfig{DatabaseName: c.database})
	defer session.Close(ctx)

	result, err := session.Run(ctx, `
		MATCH (r:Role {id: $roleId})-[:INHERITS*0..]->(ancestor:Role)
		MATCH (ancestor)-[:HAS_ACCESS]->(t:Tool)
		WHERE NOT EXISTS {
			MATCH (ancestor)-[:BLOCKED_BY]->(:Policy)-[:BLOCKS]->(t)
		}
		RETURN DISTINCT t.id as id, t.name as name, t.requiresHuman as requiresHuman, t.riskLevel as riskLevel
	`, map[string]interface{}{"roleId": roleID})
	if err != nil {
		return nil, err
	}

	var tools []ToolAccess
	for result.Next(ctx) {
		record := result.Record()
		id, _ := record.Get("id")
		name, _ := record.Get("name")
		requiresHuman, _ := record.Get("requiresHuman")
		riskLevel, _ := record.Get("riskLevel")

		toolID, _ := uuid.Parse(id.(string))
		access := ToolAccess{
			ToolID:   toolID,
			ToolName: name.(string),
		}
		if requiresHuman != nil {
			access.RequiresHuman = requiresHuman.(bool)
		}
		if riskLevel != nil {
			access.RiskLevel = riskLevel.(string)
		}
		tools = append(tools, access)
	}

	return tools, result.Err()
}

// CreateRoleModelAccess creates an access relationship between role and model
func (c *Client) CreateRoleModelAccess(ctx context.Context, roleID string, modelID uuid.UUID) error {
	session := c.driver.NewSession(ctx, neo4j.SessionConfig{DatabaseName: c.database})
	defer session.Close(ctx)

	_, err := session.Run(ctx, `
		MATCH (r:Role {id: $roleId})
		MATCH (m:Model {id: $modelId})
		MERGE (r)-[:HAS_ACCESS]->(m)
	`, map[string]interface{}{
		"roleId":  roleID,
		"modelId": modelID.String(),
	})
	return err
}

// CreatePolicyBlock creates a blocking policy between role and resource
func (c *Client) CreatePolicyBlock(ctx context.Context, policyName, roleID, resourceType, resourceID string) error {
	session := c.driver.NewSession(ctx, neo4j.SessionConfig{DatabaseName: c.database})
	defer session.Close(ctx)

	_, err := session.Run(ctx, `
		MERGE (p:Policy {name: $policyName})
		WITH p
		MATCH (r:Role {id: $roleId})
		MERGE (r)-[:BLOCKED_BY]->(p)
		WITH p
		MATCH (resource {id: $resourceId})
		MERGE (p)-[:BLOCKS]->(resource)
	`, map[string]interface{}{
		"policyName":   policyName,
		"roleId":       roleID,
		"resourceType": resourceType,
		"resourceId":   resourceID,
	})
	if err != nil {
		return fmt.Errorf("failed to create policy block: %w", err)
	}
	return nil
}

