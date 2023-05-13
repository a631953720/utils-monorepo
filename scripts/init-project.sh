#!/bin/bash

echo "set env"

cd ../shared/basic
ln -s ../../.env ./.env

cd ../migrations
ln -s ../../.env ./.env
