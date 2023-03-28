FROM --platform=linux/amd64 mysql:5.7

RUN echo "USE mysql;" > /docker-entrypoint-initdb.d/timezones.sql && mysql_tzinfo_to_sql /usr/share/zoneinfo >> /docker-entrypoint-initdb.d/timezones.sql

COPY ./my.cnf /etc/mysql/conf.d/my.cnf
