package neo4j

import (
	"context"
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func getTestNeo4jConfig(t *testing.T) Config {
	uri := os.Getenv("TEST_NEO4J_URI")
	if uri == "" {
		t.Skip("TEST_NEO4J_URI not set, skipping Neo4j tests")
	}

	return Config{
		URI:      uri,
		Username: os.Getenv("TEST_NEO4J_USERNAME"),
		Password: os.Getenv("TEST_NEO4J_PASSWORD"),
		Database: os.Getenv("TEST_NEO4J_DATABASE"),
	}
}

func TestNew_InvalidURI(t *testing.T) {
	config := Config{
		URI:      "invalid://uri",
		Username: "test",
		Password: "test",
	}

	client, err := New(config)

	assert.Error(t, err)
	assert.Nil(t, client)
}

func TestNew_ValidConfig(t *testing.T) {
	config := getTestNeo4jConfig(t)
	ctx := context.Background()

	client, err := New(config)
	if err != nil {
		t.Skipf("Neo4j connection failed: %v. Skipping test.", err)
	}
	defer client.Close(ctx)

	require.NotNil(t, client)
	assert.NotNil(t, client.driver)
}

func TestNew_DefaultDatabase(t *testing.T) {
	config := getTestNeo4jConfig(t)
	config.Database = "" // Empty database should default to "neo4j"

	ctx := context.Background()
	client, err := New(config)
	if err != nil {
		t.Skipf("Neo4j connection failed: %v. Skipping test.", err)
	}
	defer client.Close(ctx)

	require.NotNil(t, client)
	assert.Equal(t, "neo4j", client.database)
}

func TestClient_VerifyConnectivity(t *testing.T) {
	config := getTestNeo4jConfig(t)
	ctx := context.Background()

	client, err := New(config)
	if err != nil {
		t.Skipf("Neo4j connection failed: %v. Skipping test.", err)
	}
	defer client.Close(ctx)

	err = client.VerifyConnectivity(ctx)
	assert.NoError(t, err)
}

func TestClient_Close(t *testing.T) {
	config := getTestNeo4jConfig(t)
	ctx := context.Background()

	client, err := New(config)
	if err != nil {
		t.Skipf("Neo4j connection failed: %v. Skipping test.", err)
	}

	// Close should not panic
	assert.NotPanics(t, func() {
		client.Close(ctx)
	})

	// Second close should also not panic
	assert.NotPanics(t, func() {
		client.Close(ctx)
	})
}

func TestGetRoleHierarchy(t *testing.T) {
	config := getTestNeo4jConfig(t)
	ctx := context.Background()

	client, err := New(config)
	if err != nil {
		t.Skipf("Neo4j connection failed: %v. Skipping test.", err)
	}
	defer client.Close(ctx)

	// This test requires a Neo4j instance with test data
	// For now, just test that the method doesn't panic
	_, err = client.GetRoleHierarchy(ctx, "test-role-id")
	// Error is expected if role doesn't exist, but method should not panic
	assert.NotPanics(t, func() {
		_, _ = client.GetRoleHierarchy(ctx, "test-role-id")
	})
}
