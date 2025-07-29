// main.ts
import { App } from "cdktf";
import { EcrStack } from "./stacks/app_infra/ecr-stack";
import { IamStack } from "./stacks/base_infra/iam-stack";
import { Env } from "./utils/env";

const app = new App();

// Get ENV from environment variable passed by GitHub Actions (e.g., dev, uat, prod)
const envName = process.env.ENV || "dev";

// Load the right config file
const config = Env(envName);

// You can also pass envName to your stack ID or naming conventions if needed
new EcrStack(app, `ecr-stack-${envName}`, config);
new IamStack(app, `iam-stack-${envName}`, config);

app.synth();
