/**
 * OmniRoute Quickstart — Node.js (axios)
 * =======================================
 * Run:  npm install axios
 *       node nodejs_axios.js
 */

const axios = require("axios");

// Your local OmniRoute server — started with: npx omniroute
const API_URL = "http://localhost:20128/v1/chat/completions";

const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer dummy-key", // Any string works for free/keyless providers
};

const data = {
  model: "auto", // Zero-config routing, works out of the box — no sign-up needed
  stream: false,
  messages: [{ role: "user", content: "Hello! What can you do?" }],
};

axios
  .post(API_URL, data, { headers })
  .then((res) => console.log(res.data.choices[0].message.content))
  .catch((err) => {
    console.error("Error:", err.message);
    if (err.response) console.error("Server replied:", err.response.data);
  });
