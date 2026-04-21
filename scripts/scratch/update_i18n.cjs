const fs = require('fs');
const path = require('path');
const file = path.resolve('src/i18n/messages/en.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Assuming translator is a top-level key
if (data.translator) {
  data.translator.scenarioMultiModal = "Multi-Modal";
  data.translator.scenarioSchemaCoercion = "Schema Coercion";
  
  data.translator.templateNames["multi-modal"] = "Multi-Modal";
  data.translator.templateNames["schema-coercion"] = "Schema Coercion";
  
  data.translator.templateDescriptions["multi-modal"] = "Vision and multimodal capabilities";
  data.translator.templateDescriptions["schema-coercion"] = "Structured output coercion";
  
  data.translator.templatePayloads.multiModal = {
    userPrompt: "What is in this image?"
  };
  
  data.translator.templatePayloads.schemaCoercion = {
    userPrompt: "Extract user details: John Doe, 30 years old, john@example.com"
  };
}

// Write it back
fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log("Updated en.json");
