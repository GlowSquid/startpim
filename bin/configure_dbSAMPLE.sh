#!/bin/bash

export PGPASSWORD="password"
export PGHOST="127.0.0.1"

echo "Configuring db.."

dropdb -U username startpim
createdb -U username startpim

psql -U username startpim < ./bin/sql/account.sql
psql -U username startpim < ./bin/sql/bookmark.sql
psql -U username startpim < ./bin/sql/accountBookmark.sql


echo "Configuring done!"
