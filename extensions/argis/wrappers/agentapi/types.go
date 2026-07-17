package agentapi

import (
	"time"
)

// Message represents a conversation message
type Message struct {
	ID        string    `json:"id"`
	Role      string    `json:"role"`
	Content   string    `json:"content"`
	Timestamp time.Time `json:"timestamp"`
}

// Status represents the agent status
type Status string

const (
	StatusStable   Status = "stable"
	StatusChanging Status = "changing"
	StatusUnknown  Status = "unknown"
)

// AgentInfo contains information about the running agent
type AgentInfo struct {
	Type      AgentType `json:"type"`
	Status    Status    `json:"status"`
	Port      int       `json:"port"`
	TenantID  string    `json:"tenant_id,omitempty"`
	StartedAt time.Time `json:"started_at"`
}

// SendMessageRequest is the request to send a message
type SendMessageRequest struct {
	Content string      `json:"content"`
	Type    MessageType `json:"type"`
}

// MessageType identifies how to send the message
type MessageType string

const (
	MessageTypeUser MessageType = "user"
	MessageTypeRaw  MessageType = "raw"
)

// FormatMessage formats a message for the given agent type
func FormatMessage(agentType AgentType, content string) string {
	// Stub implementation - just return content as-is
	return content
}

// SupportedAgents returns the list of supported agent types
func SupportedAgents() []AgentType {
	return []AgentType{
		AgentTypeClaude,
		AgentTypeGoose,
		AgentTypeAider,
	}
}

// AgentCommand returns the default command for an agent type
func AgentCommand(agentType AgentType) (string, []string) {
	switch agentType {
	case AgentTypeClaude:
		return "claude", nil
	case AgentTypeGoose:
		return "goose", []string{"session", "start"}
	case AgentTypeAider:
		return "aider", nil
	default:
		return "", nil
	}
}

