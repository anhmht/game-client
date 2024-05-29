#! /bin/sh

# Build
docker build --build-arg ENV="$NODE_ENV" --no-cache -t ${IMAGE} .
docker push ${IMAGE}