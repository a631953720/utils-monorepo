#!/bin/bash

IP=$1
ROOT="../"

source ../.env

ssh -i ~/.ssh/${SSH_KEY_NAME}.pem ubuntu@${IP} "mkdir /home/ubuntu/.docker"
scp -i ~/.ssh/${SSH_KEY_NAME}.pem "$HOME/.docker/config.json" ubuntu@${IP}:~/.docker/config.json
#scp -i ~/.ssh/${SSH_KEY_NAME}.pem.pem "$HOME/.npmrc" ubuntu@${IP}:~/
scp -i ~/.ssh/${SSH_KEY_NAME}.pem "${ROOT}/.env" ubuntu@${IP}:~/
scp -i ~/.ssh/${SSH_KEY_NAME}.pem "${ROOT}/docker-compose.yml" ubuntu@${IP}:~/
#scp -i ~/.ssh/${SSH_KEY_NAME}.pem.pem -r "${ROOT}/.mqtt" ubuntu@${IP}:~/
