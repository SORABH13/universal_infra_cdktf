import { Construct } from "constructs";
import { EcrRepository } from "@cdktf/provider-aws/lib/ecr-repository";
import { TerraformOutput } from "cdktf";
import { globalConfig as G } from "../../config/global";
import { AwsProviderStack } from "../../providers/aws-providers";

interface EcrConfigItem {
  name: string;
  mutable: boolean;
  scanOnPush: boolean;
}

interface EcrStackConfig {
  ecr: EcrConfigItem[];
}

export class EcrStack extends AwsProviderStack {
  constructor(scope: Construct, id: string, config: EcrStackConfig) {
    super(scope, id);

    const repoNameBase = G.projectName.toLowerCase().replace(/[^a-z0-9._/-]/g, "-");

    config.ecr.forEach((repoConfig, idx) => {
      const fullRepoName = `${repoNameBase}-${repoConfig.name}`;

      const ecrRepo = new EcrRepository(this, `EcrRepo${idx}`, {
        name: fullRepoName,
        imageTagMutability: repoConfig.mutable ? "MUTABLE" : "IMMUTABLE",
        imageScanningConfiguration: {
          scanOnPush: repoConfig.scanOnPush,
        },
        tags: {
          ...G.defaultTags,
          Name: fullRepoName,
        },
      });

      new TerraformOutput(this, `EcrRepoUri${idx}`, {
        value: ecrRepo.repositoryUrl,
        description: `URI of the ECR repository ${repoConfig.name}`,
      });
    });
  }
}
