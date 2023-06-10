#!/bin/bash

source ../.env

ssh -i ~/.ssh/${SSH_KEY_NAME}.pem ubuntu@$1
