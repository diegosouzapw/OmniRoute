const fs = require('fs');
const path = require('path');
const file = path.resolve('src/i18n/messages/en.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

if (data.translator) {
  data.translator.comboTarget = "Combo Target";
  data.translator.cacheStatus = "Cache";
  data.translator.reasoningTokens = "Reasoning";
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log("Updated en.json with columns");
