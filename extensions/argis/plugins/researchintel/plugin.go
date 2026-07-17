// Package researchintel provides a Bifrost plugin for the Research Intelligence Platform.
// It integrates deep research, chat analysis, and proposal generation into the routing pipeline.
package researchintel

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

// Config for the research intelligence plugin.
type Config struct {
	ServiceURL      string        `json:"service_url"`
	Timeout         time.Duration `json:"timeout"`
	EnableResearch  bool          `json:"enable_research"`
	EnableProposals bool          `json:"enable_proposals"`
	AutoApprove     bool          `json:"auto_approve_remote"`
}

// DefaultConfig returns sensible defaults.
func DefaultConfig() Config {
	return Config{
		ServiceURL:      "http://localhost:8002",
		Timeout:         30 * time.Second,
		EnableResearch:  true,
		EnableProposals: true,
		AutoApprove:     true,
	}
}

// Plugin implements the Bifrost plugin interface.
type Plugin struct {
	config Config
	client *http.Client
}

// New creates a new research intelligence plugin.
func New(config Config) *Plugin {
	return &Plugin{
		config: config,
		client: &http.Client{Timeout: config.Timeout},
	}
}

// Name returns the plugin name.
func (p *Plugin) Name() string {
	return "researchintel"
}

// ResearchRequest for deep research.
type ResearchRequest struct {
	Topic         string              `json:"topic"`
	SearchResults []map[string]string `json:"search_results,omitempty"`
}

// ResearchResponse from the service.
type ResearchResponse struct {
	ID          string                 `json:"id"`
	Stage       string                 `json:"stage"`
	Summary     string                 `json:"summary"`
	SourceCount int                    `json:"source_count"`
	Analysis    map[string]interface{} `json:"analysis"`
	Sentiment   map[string]float64     `json:"sentiment"`
}

// ProposalResponse from the service.
type ProposalResponse struct {
	ID       string `json:"id"`
	Type     string `json:"type"`
	Status   string `json:"status"`
	Name     string `json:"name"`
	Markdown string `json:"markdown"`
}

// RunResearch executes deep research on a topic.
func (p *Plugin) RunResearch(ctx context.Context, topic string) (*ResearchResponse, error) {
	if !p.config.EnableResearch {
		return nil, fmt.Errorf("research disabled")
	}

	req := ResearchRequest{Topic: topic}
	body, err := json.Marshal(req)
	if err != nil {
		return nil, err
	}

	httpReq, err := http.NewRequestWithContext(ctx, "POST",
		p.config.ServiceURL+"/v1/research", bytes.NewReader(body))
	if err != nil {
		return nil, err
	}
	httpReq.Header.Set("Content-Type", "application/json")

	resp, err := p.client.Do(httpReq)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("research failed: %d", resp.StatusCode)
	}

	var result ResearchResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}

	return &result, nil
}

// AnalyzeChatLogs analyzes chat logs for insights.
func (p *Plugin) AnalyzeChatLogs(ctx context.Context, path string) (map[string]interface{}, error) {
	body, _ := json.Marshal(map[string]string{"path": path})

	httpReq, err := http.NewRequestWithContext(ctx, "POST",
		p.config.ServiceURL+"/v1/analyze/chatlogs", bytes.NewReader(body))
	if err != nil {
		return nil, err
	}
	httpReq.Header.Set("Content-Type", "application/json")

	resp, err := p.client.Do(httpReq)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var result map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&result)
	return result, nil
}

// GetProposals retrieves all pending proposals.
func (p *Plugin) GetProposals(ctx context.Context) ([]ProposalResponse, error) {
	httpReq, err := http.NewRequestWithContext(ctx, "GET",
		p.config.ServiceURL+"/v1/proposals", nil)
	if err != nil {
		return nil, err
	}

	resp, err := p.client.Do(httpReq)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var result struct {
		Proposals []ProposalResponse `json:"proposals"`
	}
	json.NewDecoder(resp.Body).Decode(&result)
	return result.Proposals, nil
}

// ApproveProposal approves a proposal by ID.
func (p *Plugin) ApproveProposal(ctx context.Context, proposalID string) error {
	httpReq, err := http.NewRequestWithContext(ctx, "POST",
		p.config.ServiceURL+"/v1/proposals/"+proposalID+"/approve", nil)
	if err != nil {
		return err
	}

	resp, err := p.client.Do(httpReq)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("approve failed: %d", resp.StatusCode)
	}
	return nil
}

// RejectProposal rejects a proposal by ID.
func (p *Plugin) RejectProposal(ctx context.Context, proposalID string) error {
	httpReq, err := http.NewRequestWithContext(ctx, "POST",
		p.config.ServiceURL+"/v1/proposals/"+proposalID+"/reject", nil)
	if err != nil {
		return err
	}

	resp, err := p.client.Do(httpReq)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("reject failed: %d", resp.StatusCode)
	}
	return nil
}

// GenerateToolProposals generates tool proposals from chat analysis.
func (p *Plugin) GenerateToolProposals(ctx context.Context, existingTools []string) ([]ProposalResponse, error) {
	body, _ := json.Marshal(map[string][]string{"existing_tools": existingTools})

	httpReq, err := http.NewRequestWithContext(ctx, "POST",
		p.config.ServiceURL+"/v1/proposals/tools", bytes.NewReader(body))
	if err != nil {
		return nil, err
	}
	httpReq.Header.Set("Content-Type", "application/json")

	resp, err := p.client.Do(httpReq)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var result struct {
		Proposals []ProposalResponse `json:"proposals"`
	}
	json.NewDecoder(resp.Body).Decode(&result)
	return result.Proposals, nil
}

// GenerateModelProposals generates model proposals from chat analysis.
func (p *Plugin) GenerateModelProposals(ctx context.Context, currentModels []string) ([]ProposalResponse, error) {
	body, _ := json.Marshal(map[string][]string{"current_models": currentModels})

	httpReq, err := http.NewRequestWithContext(ctx, "POST",
		p.config.ServiceURL+"/v1/proposals/models", bytes.NewReader(body))
	if err != nil {
		return nil, err
	}
	httpReq.Header.Set("Content-Type", "application/json")

	resp, err := p.client.Do(httpReq)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var result struct {
		Proposals []ProposalResponse `json:"proposals"`
	}
	json.NewDecoder(resp.Body).Decode(&result)
	return result.Proposals, nil
}

// GetKnowledgeGraph exports the knowledge graph.
func (p *Plugin) GetKnowledgeGraph(ctx context.Context) (map[string]interface{}, error) {
	httpReq, err := http.NewRequestWithContext(ctx, "GET",
		p.config.ServiceURL+"/v1/graph", nil)
	if err != nil {
		return nil, err
	}

	resp, err := p.client.Do(httpReq)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var result map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&result)
	return result, nil
}
