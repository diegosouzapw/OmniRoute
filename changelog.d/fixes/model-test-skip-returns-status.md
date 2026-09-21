- **fix(api):** the model-test skip for image/music/video-only models (#13376) returned a
  result with no `httpStatus`, and the `/api/models/test` route hands that field straight to
  `NextResponse` — so a skipped test reached the client as HTTP 200 carrying `status: "error"`
  in the body. It now answers 422: the request is valid, but that model's modality cannot be
  exercised by a chat test. Also clears the `TS2741` that was failing `API Route Typecheck`
  on the release branch.
