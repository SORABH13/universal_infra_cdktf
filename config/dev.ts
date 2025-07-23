import { globalConfig } from './global';

export const devConfig = {
  env: 'dev',
  region: globalConfig.defaultRegion,
  tags: {
    ...globalConfig.defaultTags,
    Environment: 'Development',
  },
  ecr: [
    { 
        name: 'frontend-app', 
        mutable: true, 
        scanOnPush: true 
    },
    {
        name: "backend-api",
        mutable: false,
        scanOnPush: true,
    }
  ],
  // other stack configs
};
