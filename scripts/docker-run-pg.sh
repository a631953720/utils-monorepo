#!/bin/bash

source ../.env
source ./utils.sh

IS_TEST=$1
echo "IS_TEST: $IS_TEST"

if [ "${IS_TEST}" = 'test' ]; then
  if [ ! "$(check_container_name ${POSTGRES_TEST_DOCKER_NAME})" = "true" ]; then
    docker run --name ${POSTGRES_TEST_DOCKER_NAME} \
      -e POSTGRES_PASSWORD=${POSTGRES_PSW} -d \
      -p ${POSTGRES_TEST_PORT}:5432 \
      postgres

    # sleep to avoid migration connect error
    sleep 2
  fi
else
  if [ ! "$(check_container_name ${POSTGRES_DOCKER_NAME})" = "true" ]; then
    docker run --name ${POSTGRES_DOCKER_NAME} \
      -e POSTGRES_PASSWORD=${POSTGRES_PSW} -d \
      -p ${POSTGRES_PORT}:5432 \
      postgres
    sleep 2
  fi
fi
