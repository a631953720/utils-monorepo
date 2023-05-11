cd ../shared/migrations
knex migrate:make $1 -x ts
