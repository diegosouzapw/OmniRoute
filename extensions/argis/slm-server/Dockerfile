# Build stage
FROM golang:1.23-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY *.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -o slm-server .

# Runtime stage
FROM alpine:3.19

RUN apk --no-cache add ca-certificates

WORKDIR /app
COPY --from=builder /app/slm-server .

EXPOSE 8081

# Default to vLLM backend
ENV BACKEND=vllm
ENV VLLM_URL=http://localhost:8000

ENTRYPOINT ["/app/slm-server"]
CMD ["-backend", "vllm", "-addr", ":8081"]

