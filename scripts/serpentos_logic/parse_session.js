const fs = require("fs");
const content = fs.readFileSync(
  "/Users/work/.gemini/antigravity/brain/337f441d-2f9f-421b-8834-b4b882e8cae5/.system_generated/steps/79/content.md",
  "utf8"
);

const scriptStart = content.indexOf("<script>($R[");
if (scriptStart !== -1) {
  const scriptEnd = content.indexOf("</script>", scriptStart);
  let script = content.substring(scriptStart + 8, scriptEnd);
  const texts = script.match(/text:"([^"\\]|\\.)*"/g) || [];
  const decoded = texts.map((t) => {
    try {
      return JSON.parse("{" + t + "}").text;
    } catch (e) {
      return t;
    }
  });

  let out = "# OpenCode Session Export (n7Snljhj)\n\n";
  decoded.forEach((t, i) => {
    // Alternate user/assistant for readability, or just dump it
    out += `## Message ${i + 1}\n${t}\n\n`;
  });
  fs.writeFileSync("session-n7Snljhj.md", out);
  console.log("Written session-n7Snljhj.md");
} else {
  console.log("Script not found");
}
