FROM mcr.microsoft.com/playwright:v1.62.0-noble

USER root
RUN mkdir -p /browser-profile && chown -R pwuser:pwuser /browser-profile
COPY --chown=pwuser:pwuser docker/chatgpt-web-codex-browser/cdp-proxy.mjs /opt/cdp-proxy.mjs
USER pwuser

EXPOSE 9223

CMD ["/bin/sh", "-lc", "node /opt/cdp-proxy.mjs & chrome_path=$(find /ms-playwright -path '*/chrome-linux*/chrome' -type f | head -n 1); test -n \"$chrome_path\"; exec xvfb-run -a --server-args='-screen 0 1920x1080x24 -nolisten tcp' \"$chrome_path\" --no-sandbox --disable-dev-shm-usage --remote-debugging-port=9222 --user-data-dir=/browser-profile about:blank"]
