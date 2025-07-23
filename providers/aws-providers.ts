import { Construct } from 'constructs';
import { AwsProvider } from '@cdktf/provider-aws/lib/provider';

export class AwsProviderConfig extends Construct {
  constructor(scope: Construct, id: string, region: string) {
    super(scope, id);

    new AwsProvider(this, 'aws', {
      region
    });
  }
}
