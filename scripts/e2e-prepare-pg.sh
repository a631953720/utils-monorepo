#!/bin/bash

cd ../shared/migrations || exit

NODE_ENV="test" knex migrate:latest

NODE_ENV="test" knex seed:run
