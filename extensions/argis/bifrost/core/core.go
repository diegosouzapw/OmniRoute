package core

import (
	"github.com/maximhq/bifrost/core/schemas"
)

// Re-export types from schemas
type (
	Provider                   = schemas.Provider
	ModelProvider              = schemas.ModelProvider
	Account                    = schemas.Account
	EnhancedAccount            = schemas.EnhancedAccount
	ProviderConfig             = schemas.ProviderConfig
	Key                        = schemas.Key
	NetworkConfig              = schemas.NetworkConfig
	Message                    = schemas.Message
	CompletionRequest          = schemas.CompletionRequest
	CompletionResponse         = schemas.CompletionResponse
	Usage                      = schemas.Usage
	EmbeddingRequest           = schemas.EmbeddingRequest
	EmbeddingData              = schemas.EmbeddingData
	EmbeddingResponse          = schemas.EmbeddingResponse
	BifrostRequest             = schemas.BifrostRequest
	BifrostResponse            = schemas.BifrostResponse
	BifrostError               = schemas.BifrostError
	Plugin                     = schemas.Plugin
	PluginShortCircuit         = schemas.PluginShortCircuit
	ChatRequest                = schemas.ChatRequest
	ChatMessageRole            = schemas.ChatMessageRole
	LLMUsage                   = schemas.LLMUsage
	BifrostEmbeddingRequest    = schemas.BifrostEmbeddingRequest
	BifrostEmbeddingResponse   = schemas.BifrostEmbeddingResponse
	EmbeddingStruct            = schemas.EmbeddingStruct
	ResponseExtraFields        = schemas.ResponseExtraFields
	Content                    = schemas.Content
)

// Constants
const (
	ProviderOpenAI    = schemas.ProviderOpenAI
	ProviderAnthropic = schemas.ProviderAnthropic
	ProviderGemini    = schemas.ProviderGemini
	ProviderCustom    = schemas.ProviderCustom
)

// Functions
var (
	NewEnhancedAccount = schemas.NewEnhancedAccount
)
