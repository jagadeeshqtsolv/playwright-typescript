const { devices } = require('@playwright/test');
import { globalConfig } from './config/global-config';
import { devConfig } from './config/dev-config';
import { testConfig } from './config/test-config';
import { stagingConfig } from './config/staging-config';

// Function to load the environment-specific configuration based on the selected environment
const loadConfig = (env) => {
  switch (env) {
    case 'test':
      return { ...globalConfig, ...testConfig };
    case 'staging':
      return { ...globalConfig, ...stagingConfig };
    default:
      return { ...globalConfig, ...devConfig };
  }
};

// Define the environment to be used
const environment = process.env.NODE_ENV || 'test';

// Load the configuration based on the selected environment
const config = loadConfig(environment);

export default config;
