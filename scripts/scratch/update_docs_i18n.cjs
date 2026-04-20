const fs = require('fs');
const path = require('path');
const file = path.resolve('src/i18n/messages/en.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

if (data.docs) {
  Object.assign(data.docs, {
    // Endpoints
    "endpointVideosNote": "Generate AI videos (SD WebUI, ComfyUI, etc)",
    "endpointMusicNote": "Generate AI music via workflows",
    "endpointModerationsNote": "Check text for harmful content",
    "endpointRerankNote": "Rerank documents by relevance",
    "endpointSearchNote": "Web search via Exa, Brave, Serper, etc",

    // Features
    "featureAutoComboTitle": "AutoCombo",
    "featureAutoComboText": "Dynamic, intention-based model routing via embeddings and zero-shot classification.",
    "featureSkillsMemoryTitle": "Skills & Memory",
    "featureSkillsMemoryText": "Persistent vector memory and extensible skill execution sandbox for autonomous agentic logic.",

    // Clients
    "clientWindsurfTitle": "Windsurf",
    "clientWindsurfBullet1": "Configure custom API URL pointing to the proxy.",
    "clientWindsurfBullet2": "Supports deep context integrations and codebase awareness.",
    
    "clientClineTitle": "Cline",
    "clientClineBullet1": "Use OpenAI-compatible adapter in extension settings.",
    "clientClineBullet2": "Directly supports complex tool calling through the proxy.",

    "clientKimiTitle": "Kimi Coding",
    "clientKimiBullet1": "Compatible with the main completions endpoint.",
    "clientKimiBullet2": "Optimized long-context reasoning with seamless failover.",

    // Protocols
    "protocolAcpTitle": "ACP Protocol",
    "protocolAcpDesc": "Agent Communication Protocol for cross-agent orchestration.",
    "protocolAcpStep1": "Enable ACP in the proxy settings.",
    "protocolAcpStep2": "Agents discover capabilities via registry.",
    "protocolAcpStep3": "Execute remote skills securely over SSE."
  });
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log("Updated en.json with docs translations");
