#!/usr/bin/env bash

echo "Building static ubuntu image";

chmod +x ./utils/static-containers/ubuntu-container/build.sh;
./utils/static-containers/ubuntu-container/build.sh;

if [ $? -ne 0 ]; then
    echo "Error building ubuntu container" >&2;
    exit 1;
fi
