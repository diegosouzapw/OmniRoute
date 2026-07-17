// Package agentcli - HTTP client methods for agentapi
package agentcli

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

// getStatus gets the current agent status
func (p *Provider) getStatus(ctx context.Context) (*StatusResponse, error) {
	req, err := http.NewRequestWithContext(ctx, "GET", p.baseURL()+"/status", nil)
	if err != nil {
		return nil, err
	}

	resp, err := p.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("status request failed: %d - %s", resp.StatusCode, string(body))
	}

	var status StatusResponse
	if err := json.NewDecoder(resp.Body).Decode(&status); err != nil {
		return nil, err
	}

	return &status, nil
}

// getMessages gets all messages from the conversation
func (p *Provider) getMessages(ctx context.Context) ([]Message, error) {
	req, err := http.NewRequestWithContext(ctx, "GET", p.baseURL()+"/messages", nil)
	if err != nil {
		return nil, err
	}

	resp, err := p.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("messages request failed: %d - %s", resp.StatusCode, string(body))
	}

	var messages []Message
	if err := json.NewDecoder(resp.Body).Decode(&messages); err != nil {
		return nil, err
	}

	return messages, nil
}

// sendMessage sends a message to the agent
func (p *Provider) sendMessage(ctx context.Context, content string) error {
	msgReq := MessageRequest{
		Content: content,
		Type:    "user",
	}

	body, err := json.Marshal(msgReq)
	if err != nil {
		return err
	}

	req, err := http.NewRequestWithContext(ctx, "POST", p.baseURL()+"/message", bytes.NewReader(body))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := p.httpClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		respBody, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("send message failed: %d - %s", resp.StatusCode, string(respBody))
	}

	return nil
}

// waitForStable waits for the agent to be in stable state
func (p *Provider) waitForStable(ctx context.Context) error {
	deadline := time.Now().Add(p.config.MaxWaitTime)

	for time.Now().Before(deadline) {
		select {
		case <-ctx.Done():
			return ctx.Err()
		default:
		}

		status, err := p.getStatus(ctx)
		if err != nil {
			time.Sleep(p.config.PollInterval)
			continue
		}

		if status.Status == "stable" {
			return nil
		}

		time.Sleep(p.config.PollInterval)
	}

	return fmt.Errorf("timeout waiting for agent to be stable")
}

// waitForResponse waits for a new assistant message after sending
func (p *Provider) waitForResponse(ctx context.Context, beforeCount int) (string, error) {
	deadline := time.Now().Add(p.config.MaxWaitTime)

	for time.Now().Before(deadline) {
		select {
		case <-ctx.Done():
			return "", ctx.Err()
		default:
		}

		// Check if agent is done processing
		status, err := p.getStatus(ctx)
		if err != nil {
			time.Sleep(p.config.PollInterval)
			continue
		}

		// Get messages
		messages, err := p.getMessages(ctx)
		if err != nil {
			time.Sleep(p.config.PollInterval)
			continue
		}

		// Look for new assistant message
		if len(messages) > beforeCount && status.Status == "stable" {
			// Find the last assistant message
			for i := len(messages) - 1; i >= beforeCount; i-- {
				if messages[i].Role == "assistant" {
					return messages[i].Content, nil
				}
			}
		}

		time.Sleep(p.config.PollInterval)
	}

	return "", fmt.Errorf("timeout waiting for response")
}

// sendRawMessage sends raw keystrokes to the agent (for TUI control)
func (p *Provider) sendRawMessage(ctx context.Context, content string) error {
	msgReq := MessageRequest{
		Content: content,
		Type:    "raw",
	}

	body, err := json.Marshal(msgReq)
	if err != nil {
		return err
	}

	req, err := http.NewRequestWithContext(ctx, "POST", p.baseURL()+"/message", bytes.NewReader(body))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := p.httpClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		respBody, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("send raw message failed: %d - %s", resp.StatusCode, string(respBody))
	}

	return nil
}

// SSEEvent represents a Server-Sent Event from agentapi
type SSEEvent struct {
	Event string          `json:"event"`
	Data  json.RawMessage `json:"data"`
}

// StatusEvent represents a status change event
type StatusEvent struct {
	Status string `json:"status"`
}

// MessageEvent represents a new message event
type MessageEvent struct {
	Message Message `json:"message"`
}

// ScreenEvent represents a screen update event
type ScreenEvent struct {
	Screen string `json:"screen"`
}

// EventCallback is called for each SSE event
type EventCallback func(event SSEEvent) error

// SubscribeToEvents subscribes to SSE events from the agent
func (p *Provider) SubscribeToEvents(ctx context.Context, callback EventCallback) error {
	req, err := http.NewRequestWithContext(ctx, "GET", p.baseURL()+"/events", nil)
	if err != nil {
		return err
	}
	req.Header.Set("Accept", "text/event-stream")
	req.Header.Set("Cache-Control", "no-cache")

	resp, err := p.httpClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("events request failed: %d - %s", resp.StatusCode, string(body))
	}

	// Read SSE stream
	reader := NewSSEReader(resp.Body)
	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		default:
		}

		event, err := reader.ReadEvent()
		if err != nil {
			if err == io.EOF {
				return nil
			}
			return err
		}

		if err := callback(event); err != nil {
			return err
		}
	}
}

// SSEReader reads Server-Sent Events from a stream
type SSEReader struct {
	reader io.Reader
	buffer []byte
}

// NewSSEReader creates a new SSE reader
func NewSSEReader(r io.Reader) *SSEReader {
	return &SSEReader{
		reader: r,
		buffer: make([]byte, 0, 4096),
	}
}

// ReadEvent reads the next SSE event
func (r *SSEReader) ReadEvent() (SSEEvent, error) {
	var event SSEEvent
	buf := make([]byte, 1024)

	for {
		n, err := r.reader.Read(buf)
		if err != nil {
			return event, err
		}

		r.buffer = append(r.buffer, buf[:n]...)

		// Look for double newline (end of event)
		for i := 0; i < len(r.buffer)-1; i++ {
			if r.buffer[i] == '\n' && r.buffer[i+1] == '\n' {
				eventData := string(r.buffer[:i])
				r.buffer = r.buffer[i+2:]

				// Parse event
				event = parseSSEEvent(eventData)
				return event, nil
			}
		}
	}
}

// parseSSEEvent parses an SSE event string
func parseSSEEvent(data string) SSEEvent {
	var event SSEEvent
	lines := bytes.Split([]byte(data), []byte("\n"))

	for _, line := range lines {
		if bytes.HasPrefix(line, []byte("event:")) {
			event.Event = string(bytes.TrimSpace(line[6:]))
		} else if bytes.HasPrefix(line, []byte("data:")) {
			event.Data = bytes.TrimSpace(line[5:])
		}
	}

	return event
}

// GetScreen gets the current terminal screen content
func (p *Provider) GetScreen(ctx context.Context) (string, error) {
	req, err := http.NewRequestWithContext(ctx, "GET", p.baseURL()+"/screen", nil)
	if err != nil {
		return "", err
	}

	resp, err := p.httpClient.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("screen request failed: %d - %s", resp.StatusCode, string(body))
	}

	var screenResp struct {
		Screen string `json:"screen"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&screenResp); err != nil {
		return "", err
	}

	return screenResp.Screen, nil
}

// ChatCompletionWithSSE sends a message and streams the response via SSE
func (p *Provider) ChatCompletionWithSSE(
	ctx context.Context,
	message string,
	callback func(content string, done bool) error,
) error {
	// Wait for agent to be stable
	if err := p.waitForStable(ctx); err != nil {
		return fmt.Errorf("agent not ready: %w", err)
	}

	// Get current message count
	beforeMessages, err := p.getMessages(ctx)
	if err != nil {
		return fmt.Errorf("failed to get messages: %w", err)
	}
	beforeCount := len(beforeMessages)

	// Send the message
	if err := p.sendMessage(ctx, message); err != nil {
		return fmt.Errorf("failed to send message: %w", err)
	}

	// Subscribe to events and wait for response
	lastContent := ""
	return p.SubscribeToEvents(ctx, func(event SSEEvent) error {
		switch event.Event {
		case "message":
			var msgEvent MessageEvent
			if err := json.Unmarshal(event.Data, &msgEvent); err == nil {
				if msgEvent.Message.Role == "assistant" {
					if err := callback(msgEvent.Message.Content, false); err != nil {
						return err
					}
					lastContent = msgEvent.Message.Content
				}
			}
		case "status":
			var statusEvent StatusEvent
			if err := json.Unmarshal(event.Data, &statusEvent); err == nil {
				if statusEvent.Status == "stable" {
					// Check if we have a new message
					messages, err := p.getMessages(ctx)
					if err == nil && len(messages) > beforeCount {
						for i := len(messages) - 1; i >= beforeCount; i-- {
							if messages[i].Role == "assistant" && messages[i].Content != lastContent {
								callback(messages[i].Content, true)
								return io.EOF // Signal completion
							}
						}
					}
					callback("", true)
					return io.EOF
				}
			}
		}
		return nil
	})
}
