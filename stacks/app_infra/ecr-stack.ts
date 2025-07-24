import { Construct } from "constructs";
import { EcrRepository } from "@cdktf/provider-aws/lib/ecr-repository";
import { TerraformOutput } from "cdktf";
import { globalConfig } from "../../config/global";
import { AwsProviderStack } from "../../providers/aws-providers";
import { devConfig } from "../../config/dev";

export class EcrStack extends AwsProviderStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const repoName = globalConfig.projectName.toLowerCase().replace(/[^a-z0-9._/-]/g, "-");

    devConfig.ecr.forEach((repoConfig, idx) => {
      const ecrRepo = new EcrRepository(this, `EcrRepo${idx}`, {
        name: `${repoName}-${repoConfig.name}`,
        imageTagMutability: repoConfig.mutable ? "MUTABLE" : "IMMUTABLE",
        imageScanningConfiguration: {
          scanOnPush: repoConfig.scanOnPush,
        },
        tags: {
          ...globalConfig.defaultTags,
          Name: `${repoName}-${repoConfig.name}`,
        },
      });

      // Create Terraform output for this repo URI
      new TerraformOutput(this, `EcrRepoUri${idx}`, {
        value: ecrRepo.repositoryUrl,
        description: `URI of the ECR repository ${repoConfig.name}`,
      });
    });
  }
}
