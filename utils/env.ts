// utils/env.ts
export const Env = (env: string) => {
    switch (env) {
      case "dev":
        return require("../config/dev").devConfig;
      case "uat":
        return require("../config/uat").uatConfig;
      case "prod":
        return require("../config/prod").prodConfig;
      default:
        throw new Error(`Unsupported environment: ${env}`);
    }
  };
  