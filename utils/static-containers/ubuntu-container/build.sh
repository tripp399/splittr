#!/bin/bash

IMAGE=$(docker images splittr_ubuntu --format "{{.Repository}}");

if [ "$IMAGE" ]; then
  echo "Found splittr_ubuntu. No need to build.";
  exit 0;
fi

echo "HERE:" $(pwd)

D_PATH=$(realpath ./utils/static-containers/ubuntu-container);

docker build "$D_PATH" -t splittr_ubuntu;
