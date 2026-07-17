package config

import (
	"fmt"
	"reflect"
	"strings"
)

// ValidationError represents a configuration validation error
type ValidationError struct {
	Field   string
	Message string
}

func (e *ValidationError) Error() string {
	return fmt.Sprintf("validation error in %s: %s", e.Field, e.Message)
}

// ValidationErrors is a collection of validation errors
type ValidationErrors []*ValidationError

func (e ValidationErrors) Error() string {
	if len(e) == 0 {
		return "no validation errors"
	}
	var msgs []string
	for _, err := range e {
		msgs = append(msgs, err.Error())
	}
	return strings.Join(msgs, "; ")
}

// Validate validates the configuration
func (c *Config) Validate() error {
	var errors ValidationErrors

	// Validate server config
	if err := c.validateServer(); err != nil {
		errors = append(errors, err...)
	}

	// Validate routing config
	if err := c.validateRouting(); err != nil {
		errors = append(errors, err...)
	}

	// Validate agents config
	if err := c.validateAgents(); err != nil {
		errors = append(errors, err...)
	}

	// Validate logging config
	if err := c.validateLogging(); err != nil {
		errors = append(errors, err...)
	}

	if len(errors) > 0 {
		return errors
	}

	return nil
}

func (c *Config) validateServer() ValidationErrors {
	var errors ValidationErrors

	// Port validation
	if c.Server.Port < 1 || c.Server.Port > 65535 {
		errors = append(errors, &ValidationError{
			Field:   "server.port",
			Message: "port must be between 1 and 65535",
		})
	}

	// Host validation
	if c.Server.Host == "" {
		errors = append(errors, &ValidationError{
			Field:   "server.host",
			Message: "host cannot be empty",
		})
	}

	// Timeout validation
	if c.Server.ReadTimeout <= 0 {
		errors = append(errors, &ValidationError{
			Field:   "server.read_timeout",
			Message: "read_timeout must be positive",
		})
	}

	if c.Server.WriteTimeout <= 0 {
		errors = append(errors, &ValidationError{
			Field:   "server.write_timeout",
			Message: "write_timeout must be positive",
		})
	}

	// Max request size validation
	if c.Server.MaxRequestSize <= 0 {
		errors = append(errors, &ValidationError{
			Field:   "server.max_request_size_mb",
			Message: "max_request_size_mb must be positive",
		})
	}

	return errors
}

func (c *Config) validateRouting() ValidationErrors {
	var errors ValidationErrors

	// RouteLLM validation
	if c.Routing.RouteLLM.Enabled {
		if c.Routing.RouteLLM.Endpoint == "" {
			errors = append(errors, &ValidationError{
				Field:   "routing.routellm.endpoint",
				Message: "endpoint is required when routellm is enabled",
			})
		}

		if c.Routing.RouteLLM.Threshold < 0 || c.Routing.RouteLLM.Threshold > 1 {
			errors = append(errors, &ValidationError{
				Field:   "routing.routellm.threshold",
				Message: "threshold must be between 0 and 1",
			})
		}

		if c.Routing.RouteLLM.Timeout <= 0 {
			errors = append(errors, &ValidationError{
				Field:   "routing.routellm.timeout_ms",
				Message: "timeout_ms must be positive",
			})
		}
	}

	// ArchRouter validation
	if c.Routing.ArchRouter.Enabled {
		if c.Routing.ArchRouter.Endpoint == "" {
			errors = append(errors, &ValidationError{
				Field:   "routing.arch_router.endpoint",
				Message: "endpoint is required when arch_router is enabled",
			})
		}

		if c.Routing.ArchRouter.Timeout <= 0 {
			errors = append(errors, &ValidationError{
				Field:   "routing.arch_router.timeout_ms",
				Message: "timeout_ms must be positive",
			})
		}
	}

	// MIRT validation
	if c.Routing.MIRT.Enabled {
		if c.Routing.MIRT.Dimensions < 1 {
			errors = append(errors, &ValidationError{
				Field:   "routing.mirt.dimensions",
				Message: "dimensions must be at least 1",
			})
		}

		if c.Routing.MIRT.MinScore < 0 || c.Routing.MIRT.MinScore > 1 {
			errors = append(errors, &ValidationError{
				Field:   "routing.mirt.min_score",
				Message: "min_score must be between 0 and 1",
			})
		}
	}

	return errors
}

func (c *Config) validateAgents() ValidationErrors {
	var errors ValidationErrors

	if c.Agents.AgentAPI.Enabled {
		if c.Agents.AgentAPI.BaseURL == "" {
			errors = append(errors, &ValidationError{
				Field:   "agents.agentapi.base_url",
				Message: "base_url is required when agentapi is enabled",
			})
		}

		if c.Agents.AgentAPI.Port < 1 || c.Agents.AgentAPI.Port > 65535 {
			errors = append(errors, &ValidationError{
				Field:   "agents.agentapi.port",
				Message: "port must be between 1 and 65535",
			})
		}

		if c.Agents.AgentAPI.Timeout <= 0 {
			errors = append(errors, &ValidationError{
				Field:   "agents.agentapi.timeout",
				Message: "timeout must be positive",
			})
		}

		if c.Agents.AgentAPI.DefaultAgent == "" {
			errors = append(errors, &ValidationError{
				Field:   "agents.agentapi.default_agent",
				Message: "default_agent is required when agentapi is enabled",
			})
		}
	}

	return errors
}

func (c *Config) validateLogging() ValidationErrors {
	var errors ValidationErrors

	validLevels := map[string]bool{
		"debug": true,
		"info":  true,
		"warn":  true,
		"error": true,
	}

	if !validLevels[strings.ToLower(c.Logging.Level)] {
		errors = append(errors, &ValidationError{
			Field:   "logging.level",
			Message: "level must be one of: debug, info, warn, error",
		})
	}

	validFormats := map[string]bool{
		"json":  true,
		"text":  true,
		"color": true,
	}

	if !validFormats[strings.ToLower(c.Logging.Format)] {
		errors = append(errors, &ValidationError{
			Field:   "logging.format",
			Message: "format must be one of: json, text, color",
		})
	}

	validOutputs := map[string]bool{
		"stdout": true,
		"stderr": true,
		"file":   true,
	}

	if !validOutputs[strings.ToLower(c.Logging.Output)] {
		errors = append(errors, &ValidationError{
			Field:   "logging.output",
			Message: "output must be one of: stdout, stderr, file",
		})
	}

	return errors
}

// ValidateField validates a specific field by path (e.g., "server.port")
func (c *Config) ValidateField(path string) error {
	parts := strings.Split(path, ".")
	if len(parts) == 0 {
		return fmt.Errorf("invalid field path: %s", path)
	}

	// Navigate to the field
	val := reflect.ValueOf(c).Elem()
	for _, part := range parts {
		val = val.FieldByName(strings.Title(part))
		if !val.IsValid() {
			return fmt.Errorf("field not found: %s", path)
		}
	}

	// Re-validate entire config and filter errors for this field
	allErrors := c.Validate()
	if allErrors == nil {
		return nil
	}

	validationErrors, ok := allErrors.(ValidationErrors)
	if !ok {
		return allErrors
	}

	var fieldErrors ValidationErrors
	for _, err := range validationErrors {
		if strings.HasPrefix(err.Field, path) {
			fieldErrors = append(fieldErrors, err)
		}
	}

	if len(fieldErrors) > 0 {
		return fieldErrors
	}

	return nil
}
