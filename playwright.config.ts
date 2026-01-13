import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3333',
    headless: true,
    trace: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run serve',
    url: 'http://localhost:3333',
    reuseExistingServer: true,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
