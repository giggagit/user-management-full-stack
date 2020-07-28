FROM mysql:latest
ARG SQL_FILE=*.sql
COPY ${SQL_FILE} /docker-entrypoint-initdb.d/dump.sql

# docker build -t mysql-server:0.0.1 .
# docker run --name mysql-server -p 3306:3306 -d mysql-server:0.0.1