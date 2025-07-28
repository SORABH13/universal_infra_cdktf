#!/bin/bash

ENV=$1
CLOUD=$2

if [ -z "$ENV" ] || [ -z "$CLOUD" ]; then
  echo "Usage: ./deploy.sh <env> <cloud>"
  exit 1
fi

export ENV=$ENV
export CLOUD=$CLOUD

echo "Deploying $ENV stack on $CLOUD..."

cdktf get
cdktf deploy --auto-approve
