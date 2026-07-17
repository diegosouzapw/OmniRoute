package model

import "time"

// RoutingHistory contains routing decision history
type RoutingHistory struct {
	ID               string               `json:"id"`
	Timestamp        time.Time            `json:"timestamp"`
	SessionID        *string              `json:"sessionId,omitempty"`
	UserID           *string              `json:"userId,omitempty"`
	ProjectID        *string              `json:"projectId,omitempty"`
	PromptHash       string               `json:"promptHash"`
	PromptLength     int                  `json:"promptLength"`
	Capabilities     []Capability         `json:"capabilities"`
	SelectedModel    *Model               `json:"selectedModel"`
	Alternatives     []*RoutingAlternative `json:"alternatives"`
	Confidence       float64              `json:"confidence"`
	Reasoning        string               `json:"reasoning"`
	Strategies       []string             `json:"strategies"`
	VoterScores      map[string]interface{} `json:"voterScores,omitempty"`
	TaskType         string               `json:"taskType"`
	Domain           string               `json:"domain"`
	RoutingLatencyMs int                  `json:"routingLatencyMs"`
	TotalLatencyMs   *int                 `json:"totalLatencyMs,omitempty"`
	Success          bool                 `json:"success"`
	Feedback         *RoutingFeedback     `json:"feedback,omitempty"`
}

type RoutingAlternative struct {
	Model  *Model  `json:"model"`
	Score  float64 `json:"score"`
	Reason string  `json:"reason"`
}

type RoutingFeedback struct {
	Rating         *int    `json:"rating,omitempty"`
	Correct        *bool   `json:"correct,omitempty"`
	PreferredModel *Model  `json:"preferredModel,omitempty"`
	Comment        *string `json:"comment,omitempty"`
	ProvidedAt     time.Time `json:"providedAt"`
}

type RoutingHistoryConnection struct {
	Nodes      []*RoutingHistory `json:"nodes"`
	PageInfo   *PageInfo         `json:"pageInfo"`
	TotalCount int               `json:"totalCount"`
}

// RoutingEvent for subscriptions
type RoutingEvent struct {
	ID        string           `json:"id"`
	Timestamp time.Time        `json:"timestamp"`
	SessionID *string          `json:"sessionId,omitempty"`
	Type      RoutingEventType `json:"type"`
	Decision  *RoutingDecision `json:"decision,omitempty"`
	Feedback  *RoutingFeedback `json:"feedback,omitempty"`
}

type RoutingDecision struct {
	Model      *Model   `json:"model"`
	Confidence float64  `json:"confidence"`
	TaskType   string   `json:"taskType"`
	Strategies []string `json:"strategies"`
	LatencyMs  int      `json:"latencyMs"`
}

// Policy types
type Policy struct {
	ID           string              `json:"id"`
	Name         string              `json:"name"`
	Description  *string             `json:"description,omitempty"`
	Type         PolicyType          `json:"type"`
	Active       bool                `json:"active"`
	Priority     int                 `json:"priority"`
	Conditions   []*PolicyCondition  `json:"conditions"`
	Actions      []*PolicyAction     `json:"actions"`
	Scope        *PolicyScope        `json:"scope"`
	CreatedBy    string              `json:"createdBy"`
	CreatedAt    time.Time           `json:"createdAt"`
	UpdatedAt    time.Time           `json:"updatedAt"`
	AppliedCount int                 `json:"appliedCount"`
	LastApplied  *time.Time          `json:"lastApplied,omitempty"`
}

type PolicyCondition struct {
	Field    string      `json:"field"`
	Operator string      `json:"operator"`
	Value    interface{} `json:"value"`
}

type PolicyAction struct {
	Type       string      `json:"type"`
	Parameters interface{} `json:"parameters"`
}

type PolicyScope struct {
	Users    []string `json:"users,omitempty"`
	Projects []string `json:"projects,omitempty"`
	Global   bool     `json:"global"`
}

// Input types
type PolicyInput struct {
	Name        string                 `json:"name"`
	Description *string                `json:"description,omitempty"`
	Type        PolicyType             `json:"type"`
	Priority    *int                   `json:"priority,omitempty"`
	Conditions  []*PolicyConditionInput `json:"conditions"`
	Actions     []*PolicyActionInput    `json:"actions"`
	Scope       PolicyScopeInput       `json:"scope"`
}

type PolicyConditionInput struct {
	Field    string      `json:"field"`
	Operator string      `json:"operator"`
	Value    interface{} `json:"value"`
}

type PolicyActionInput struct {
	Type       string      `json:"type"`
	Parameters interface{} `json:"parameters"`
}

type PolicyScopeInput struct {
	Users    []string `json:"users,omitempty"`
	Projects []string `json:"projects,omitempty"`
	Global   *bool    `json:"global,omitempty"`
}

// RoutingTable represents a routing table
type RoutingTable struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Routes    []Route   `json:"routes"`
	Active    bool      `json:"active"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

// Route represents a single route
type Route struct {
	ID          string `json:"id"`
	Path        string `json:"path"`
	Target      string `json:"target"`
	Weight      int    `json:"weight"`
	Priority    int    `json:"priority"`
	Description string `json:"description,omitempty"`
}

