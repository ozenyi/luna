import { defineConfig, devices } from "@playwright/test";

const port = 4173;
export default defineConfig({
  testDir: "e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  use: { baseURL: `http://127.0.0.1:${port}`, ...devices["Desktop Chrome"] },
  webServer: {
    command: `rm -rf /tmp/luna-pages && mkdir -p /tmp/luna-pages && ln -sfn /agent/repos/luna /tmp/luna-pages/luna && python3 -m http.server ${port} --bind 127.0.0.1 --directory /tmp/luna-pages`,
    port,
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
