#!/usr/bin/env bash
echo "Performing database migrations"
flask db upgrade
# flask run
python3.6 run.py