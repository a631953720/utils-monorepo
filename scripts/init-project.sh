#!/bin/bash

echo "set env"

cd ../shared/basic
ln -s ../../.development.env ./.development.env

cd ../migrations
ln -s ../../.development.env ./.development.env
