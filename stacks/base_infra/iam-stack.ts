import { Construct } from "constructs";
import { TerraformOutput } from "cdktf";
import { globalConfig as G } from '../../config/global';
import { AwsProviderStack } from "../../providers/aws-providers";
import { IamRole } from "@cdktf/provider-aws/lib/iam-role";
import { IamPolicy } from "@cdktf/provider-aws/lib/iam-policy";
import { IamRolePolicyAttachment } from "@cdktf/provider-aws/lib/iam-role-policy-attachment";

export class IamStack extends AwsProviderStack {
  constructor(scope: Construct, id: string, config: any) {
    super(scope, id);

    for (const roleDef of config.iamRoles) {
      const assumeRolePolicy = JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Action: "sts:AssumeRole",
            Principal: {
              Service: roleDef.assumeService,
            },
            Effect: "Allow",
          },
        ],
      });

      const role = new IamRole(this, `${roleDef.name}-role`, {
        name: roleDef.name,
        tags: G.defaultTags,
        assumeRolePolicy: assumeRolePolicy,
      });

      // Attach each policy
      for (const policyDef of roleDef.policies) {
        const policy = new IamPolicy(this, `${policyDef.name}-policy`, {
          name: policyDef.name,
          policy: JSON.stringify({
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Action: policyDef.actions,
                Resource: policyDef.resources,
              },
            ],
          }),
        });

        new IamRolePolicyAttachment(this, `${roleDef.name}-${policyDef.name}-attach`, {
          role: role.name,
          policyArn: policy.arn,
        });
      }

      // ✅ Output IAM Role ARN (move this outside the policy loop)
      new TerraformOutput(this, `output-role-arn-${roleDef.name}`, {
        value: role.arn,
        description: `IAM Role ARN for ${roleDef.name}`,
      });
    }
  }
}
