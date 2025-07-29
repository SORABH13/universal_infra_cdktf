// main.ts
import { App } from "cdktf";
import { EcrStack } from "./stacks/app_infra/ecr-stack";
import { IamStack } from "./stacks/base_infra/iam-stack";
import { Env } from "./utils/env";

const app = new App();

// Get ENV from environment variable passed by GitHub Actions or local run (e.g., dev, uat, prod)
const envName = process.env.ENV || "dev";

// Load the correct config file
const config = Env(envName);

// Deploy stacks conditionally
if (envName === "dev") {
  new EcrStack(app, `ecr-stack-${envName}`, config);
  new IamStack(app, `iam-stack-${envName}`, config);
} else if (envName === "uat") {
  new EcrStack(app, `ecr-stack-${envName}`, config);
  // only IAM for prod? Modify as per your requirement
  new IamStack(app, `iam-stack-${envName}`, config);
} else if (envName === "prod") {
  new EcrStack(app, `ecr-stack-${envName}`, config);
  new IamStack(app, `iam-stack-${envName}`, config);
} else {
  throw new Error(`Invalid environment name: ${envName}`);
}

app.synth();
