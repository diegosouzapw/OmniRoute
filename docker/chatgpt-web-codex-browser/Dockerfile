FROM mcr.microsoft.com/playwright:v1.62.0-noble

USER root
RUN mkdir -p /browser-profile && chown -R pwuser:pwuser /browser-profile
COPY --chown=pwuser:pwuser docker/chatgpt-web-codex-browser/cdp-proxy.mjs /opt/cdp-proxy.mjs
USER pwuser

EXPOSE 9223

CMD ["/bin/sh", "-lc", "node /opt/cdp-proxy.mjs & exec $(find /ms-playwright -path '*/chrome-linux/chrome' -type f | head -n 1) --headless=new --no-sandbox --disable-dev-shm-usage --remote-debugging-port=9222 --user-data-dir=/browser-profile about:blank"]
