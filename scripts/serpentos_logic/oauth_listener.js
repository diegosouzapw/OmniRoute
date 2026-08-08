const http = require("http");
const url = require("url");

const PORT = 20128;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === "/callback") {
    const code = parsedUrl.query.code;
    const state = parsedUrl.query.state;

    console.log("\n========================================");
    console.log("SUCCESS: Captured Google OAuth callback!");
    console.log(`FULL URL: http://localhost:${PORT}${req.url}`);
    console.log(`CODE: ${code}`);
    console.log(`STATE: ${state}`);
    console.log("========================================\n");

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(
      "<h1>Авторизация успешна!</h1><p>Код и состояние перехвачены в терминале. Вы можете закрыть эту вкладку и вернуться к OmniRoute.</p>"
    );
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`OAuth callback listener running on http://localhost:${PORT}`);
});
