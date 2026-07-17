// Package neo4j provides a Neo4j client for policy graph queries.
// This is used for governance, role hierarchies, and access control.
package neo4j

import (
	"context"
	"fmt"
	"sync"

	"github.com/neo4j/neo4j-go-driver/v5/neo4j"
)

// Config configures the Neo4j client
type Config struct {
	URI      string `json:"uri"`      // bolt://localhost:7687 or neo4j+s://xxx.auradb.io
	Username string `json:"username"`
	Password string `json:"password"`
	Database string `json:"database"` // defaults to "neo4j"
}

// Client is a Neo4j client for policy graph queries
type Client struct {
	driver   neo4j.DriverWithContext
	database string
	mu       sync.RWMutex
}

// New creates a new Neo4j client
func New(config Config) (*Client, error) {
	driver, err := neo4j.NewDriverWithContext(
		config.URI,
		neo4j.BasicAuth(config.Username, config.Password, ""),
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create neo4j driver: %w", err)
	}

	database := config.Database
	if database == "" {
		database = "neo4j"
	}

	return &Client{
		driver:   driver,
		database: database,
	}, nil
}

// Close closes the Neo4j connection
func (c *Client) Close(ctx context.Context) error {
	return c.driver.Close(ctx)
}

// VerifyConnectivity checks if the connection is working
func (c *Client) VerifyConnectivity(ctx context.Context) error {
	return c.driver.VerifyConnectivity(ctx)
}

// PolicyNode represents a node in the policy graph
type PolicyNode struct {
	ID         string                 `json:"id"`
	Type       string                 `json:"type"` // role, permission, policy, model, tool
	Name       string                 `json:"name"`
	Properties map[string]interface{} `json:"properties"`
}

// PolicyRelation represents a relationship in the policy graph
type PolicyRelation struct {
	From       string                 `json:"from"`
	To         string                 `json:"to"`
	Type       string                 `json:"type"` // HAS_ACCESS, INHERITS, REQUIRES, BLOCKED_BY
	Properties map[string]interface{} `json:"properties"`
}

// AccessDecision represents an access control decision
type AccessDecision struct {
	Allowed     bool     `json:"allowed"`
	Reason      string   `json:"reason"`
	PolicyChain []string `json:"policy_chain"` // policies that led to decision
}

// GetRoleHierarchy returns the role hierarchy for a given role
func (c *Client) GetRoleHierarchy(ctx context.Context, roleID string) ([]PolicyNode, error) {
	session := c.driver.NewSession(ctx, neo4j.SessionConfig{DatabaseName: c.database})
	defer session.Close(ctx)

	result, err := session.Run(ctx, `
		MATCH (r:Role {id: $roleId})-[:INHERITS*0..]->(parent:Role)
		RETURN parent.id as id, parent.name as name, labels(parent) as labels
	`, map[string]interface{}{"roleId": roleID})
	if err != nil {
		return nil, err
	}

	var nodes []PolicyNode
	for result.Next(ctx) {
		record := result.Record()
		id, _ := record.Get("id")
		name, _ := record.Get("name")
		nodes = append(nodes, PolicyNode{
			ID:   id.(string),
			Type: "role",
			Name: name.(string),
		})
	}

	return nodes, result.Err()
}

// CheckAccess checks if a role has access to a resource
func (c *Client) CheckAccess(ctx context.Context, roleID, resourceType, resourceID string) (*AccessDecision, error) {
	session := c.driver.NewSession(ctx, neo4j.SessionConfig{DatabaseName: c.database})
	defer session.Close(ctx)

	// Check for BLOCKED_BY first (deny takes precedence)
	blocked, err := c.checkBlocked(ctx, session, roleID, resourceType, resourceID)
	if err != nil {
		return nil, err
	}
	if blocked != nil {
		return blocked, nil
	}

	// Check for HAS_ACCESS
	result, err := session.Run(ctx, `
		MATCH (r:Role {id: $roleId})-[:INHERITS*0..]->(ancestor:Role)
		MATCH (ancestor)-[access:HAS_ACCESS]->(resource)
		WHERE resource.id = $resourceId OR resource.type = $resourceType
		RETURN access, resource.id as resourceId
		LIMIT 1
	`, map[string]interface{}{
		"roleId":       roleID,
		"resourceType": resourceType,
		"resourceId":   resourceID,
	})
	if err != nil {
		return nil, err
	}

	if result.Next(ctx) {
		return &AccessDecision{
			Allowed: true,
			Reason:  "access granted via role hierarchy",
		}, nil
	}

	return &AccessDecision{
		Allowed: false,
		Reason:  "no access path found",
	}, result.Err()
}

// checkBlocked checks for BLOCKED_BY relationships
func (c *Client) checkBlocked(ctx context.Context, session neo4j.SessionWithContext, roleID, resourceType, resourceID string) (*AccessDecision, error) {
	result, err := session.Run(ctx, `
		MATCH (r:Role {id: $roleId})-[:INHERITS*0..]->(ancestor:Role)
		MATCH (ancestor)-[:BLOCKED_BY]->(policy:Policy)-[:BLOCKS]->(resource)
		WHERE resource.id = $resourceId OR resource.type = $resourceType
		RETURN policy.name as policyName
		LIMIT 1
	`, map[string]interface{}{
		"roleId":       roleID,
		"resourceType": resourceType,
		"resourceId":   resourceID,
	})
	if err != nil {
		return nil, err
	}

	if result.Next(ctx) {
		record := result.Record()
		policyName, _ := record.Get("policyName")
		return &AccessDecision{
			Allowed:     false,
			Reason:      fmt.Sprintf("blocked by policy: %v", policyName),
			PolicyChain: []string{policyName.(string)},
		}, nil
	}

	return nil, result.Err()
}

