// Firefly's durable-session refresh can spawn the user's installed Chrome even
// when a test mocks fetch. Unit tests must never warm a real browser profile.
process.env.ADOBE_FIREFLY_BROWSER_REFRESH = "0";
