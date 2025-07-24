import { App } from "cdktf";
import { EcrStack } from "./stacks/app_infra/ecr-stack"; 

const app = new App();

// You can use any ID here, but keep it unique per stack
new EcrStack(app, "ecr-stack");

app.synth();
