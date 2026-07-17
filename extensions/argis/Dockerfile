# =============================================================================
# Build Stage
# =============================================================================
FROM --platform=$BUILDPLATFORM docker.io/library/golang:1.23-alpine AS builder

# Install build dependencies
RUN apk add --no-cache git ca-certificates tzdata

WORKDIR /build

# Install Taskfile
RUN go install github.com/go-task/task/v3/cmd/task@latest

# Copy go mod files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build arguments
ARG TARGETOS
ARG TARGETARCH

# Build the binary
RUN CGO_ENABLED=0 GOOS=${TARGETOS} GOARCH=${TARGETARCH} go build \
    -ldflags="-w -s" \
    -o /output/bifrost \
    ./cmd/bifrost

# =============================================================================
# Runtime Stage
# =============================================================================
FROM --platform=$BUILDPLATFORM docker.io/library/alpine:3.20

# Install runtime dependencies
RUN apk add --no-cache ca-certificates tzdata

# Create non-root user
RUN addgroup -g 1000 appgroup && \
    adduser -u 1000 -G appgroup -s /bin/sh -D appuser

WORKDIR /app

# Copy binary from builder
COPY --from=builder /output/bifrost /app/bifrost

# Copy config if exists
COPY config/ /app/config/

# Change ownership
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Set entrypoint
ENTRYPOINT ["/app/bifrost"]
CMD ["--help"]
