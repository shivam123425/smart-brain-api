-- Deploy fresh database tables
\i '/docker-entrypoint-initdb.d/tables/login.sql'
\i '/docker-entrypoint-initdb.d/tables/users.sql'

-- Seed the database
\i '/docker-entrypoint-initdb.d/seed/seed.sql'

