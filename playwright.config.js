// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  reporter: 'html',

  use: {
    channel: 'chrome',
    headless: true,

    // Use the actual browser window size
    viewport: null,

    launchOptions: {
      args: ['--start-maximized'],
    },

    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chrome',
    },
  ],
});