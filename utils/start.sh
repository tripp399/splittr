#!/usr/bin/env bash

set -x

echo 'Current directory for docker start' ${PWD}

chmod +x ./utils/build-base-images.sh;
./utils/build-base-images.sh;

# docker compose command comes here
docker-compose config
docker-compose up