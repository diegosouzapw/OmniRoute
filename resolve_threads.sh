#!/bin/bash
THREADS=(
  "PRRT_kwDORPf6ys6F_kIJ"
  "PRRT_kwDORPf6ys6F_kIS"
  "PRRT_kwDORPf6ys6F_kIY"
  "PRRT_kwDORPf6ys6F_kIc"
  "PRRT_kwDORPf6ys6F_kIg"
  "PRRT_kwDORPf6ys6F_kIk"
  "PRRT_kwDORPf6ys6F_lqn"
)

for THREAD_ID in "${THREADS[@]}"; do
  echo "Resolving $THREAD_ID..."
  gh api graphql -f query='
    mutation($threadId: ID!, $body: String!) {
      addPullRequestReviewThreadReply(input: {pullRequestReviewThreadId: $threadId, body: $body}) {
        clientMutationId
      }
    }' -F threadId="$THREAD_ID" -F body="Fixed. The composite keys and Array.isArray checks have been fully implemented to isolate tool call buffers, reconstruct them properly in onFlush, and prevent stream crashes."
    
  gh api graphql -f query='
    mutation($threadId: ID!) {
      resolveReviewThread(input: {threadId: $threadId}) {
        clientMutationId
      }
    }' -F threadId="$THREAD_ID"
done
