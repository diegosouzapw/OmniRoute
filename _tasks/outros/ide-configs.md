# OmniRoute IDE Integration Configs

## Antigravity (VS Code Gemini)

```json
// .gemini/settings.json
{
  "mcpServers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"]
    }
  }
}
```

## Cursor

```json
// .cursor/mcp.json
{
  "mcpServers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"],
      "env": {
        "OMNIROUTE_BASE_URL": "http://localhost:20128",
        "OMNIROUTE_API_KEY": "<your-key>"
      }
    }
  }
}
```

## GitHub Copilot (VS Code)

```json
// .vscode/mcp.json
{
  "servers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"]
    }
  }
}
```

## Claude Desktop

```json
// claude_desktop_config.json
{
  "mcpServers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"]
    }
  }
}
```

## Troubleshooting

| Issue                          | Solution                                                      |
| :----------------------------- | :------------------------------------------------------------ |
| `omniroute: command not found` | Install globally: `npm install -g omniroute` or use full path |
| `Connection refused`           | Ensure OmniRoute is running: `omniroute --dev`                |
| Tools not appearing            | Check IDE logs for MCP connection errors                      |
| API key errors                 | Set `OMNIROUTE_API_KEY` env var in the config                 |
