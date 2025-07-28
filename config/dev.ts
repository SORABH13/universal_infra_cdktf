import { globalConfig as G } from './global';

const envName = 'dev';  // Use a simple string for env here

export const devConfig = {
  env: envName,
  region: G.defaultRegion,
  tags: {
    ...G.defaultTags,
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

  iamRoles: [
    {
      name: `${G.projectName}-${envName}`,       // Use envName string here
      assumeService: 'ec2.amazonaws.com',
      policies: [
        {
          name: `${G.projectName}-${envName}-policy`,  // add suffix for clarity
          actions: ['*'],
          resources: ['*'],
        },
      ],
    },
    // {
    //     name: `${G.projectName}-${envName}-test`,       // Use envName string here
    //     assumeService: 'ec2.amazonaws.com',
    //     policies: [
    //       {
    //         name: `${G.projectName}-${envName}-policy-dev`,  // add suffix for clarity
    //         actions: ['*'],
    //         resources: ['*'],
    //       },
    //     ],
    //   },
  ],

  // You can add other stack configs below
};

