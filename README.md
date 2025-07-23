# universal_infra_cdktf
Automation DevOps Dashboard by DeployStar

#🚀 Overview:
universal_infra_cdktf is a multi-cloud Infrastructure as Code (IaC) project using CDK for Terraform (CDKTF) in TypeScript. It is designed to provision and manage foundational infrastructure (like IAM, KMS, SG, ALB, RDS, etc.) and application deployment infrastructure (like ECS, ECR, CI/CD pipeline) across AWS, Azure, and GCP — starting with AWS as the first supported provider.




Directory Structure:

universal_infra_cdktf/
├── cdktf.json                   # CDKTF project config
├── main.ts                      # Entry point: initializes provider and all stacks
├── providers/                   # Provider configuration per cloud
│   └── aws-provider.ts
├── config/
    |-- global.ts               # project global configuration
│   ├── dev.ts
│   ├── uat.ts
│   └── prod.ts
├── stacks/                      # All infrastructure stacks
│   ├── base/                    # Foundational infra
│   │   ├── iam-stack.ts         # IAM roles, policies
│   │   ├── kms-stack.ts         # KMS keys
│   │   ├── sg-stack.ts          # Security groups
│   │   ├── ssm-stack.ts         # SSM Parameters
│   │   ├── secrets-stack.ts     # Secrets Manager
│   │   ├── rds-stack.ts         # RDS PostgreSQL
│   │   ├── alb-stack.ts         # Application Load Balancer
│   │   ├── efs-stack.ts         # EFS volumes
│   │   └── elb-stack.ts         # Classic/Network Load Balancer
│   └── app/                     # Application deployment infra
│       ├── ecr-stack.ts         # ECR with mutable tags & scanOnPush
│       ├── ecs-cluster-stack.ts # ECS Cluster
│       ├── ecs-service-stack.ts # ECS Task Definition + Service
│       └── pipeline-stack.ts    # CI/CD Pipeline for deployments
└── utils/
    ├── config-loader.ts
    └── tags.ts                  # Default tags used across stacks
