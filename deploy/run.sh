#! /bin/sh

docker service update --force --with-registry-auth --image ${IMAGE} ${STACK_SERVICE}
# docker service update --force ${STACK_SERVICE}
echo "...[done] start service ${IMAGE}"