import { App } from "cdktf";
import { EcrStack } from "./stacks/app_infra/ecr-stack";
import { IamStack } from "./stacks/base_infra/iam-stack";
import { Env } from "./utils/env";

const app = new App();
const env = process.env.ENV || "dev";
const config = Env(env);

new EcrStack(app, "ecr-stack");
new IamStack(app, "iam-stack", config);

app.synth();
