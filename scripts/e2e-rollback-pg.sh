#!/bin/bash

source ../.env
source ./utils.sh

if [ "$(check_container_name ${POSTGRES_TEST_DOCKER_NAME})" = "true" ]; then
  docker stop "${POSTGRES_TEST_DOCKER_NAME}"
  docker rm "${POSTGRES_TEST_DOCKER_NAME}"
fi
