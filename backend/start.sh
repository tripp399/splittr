#!/usr/bin/env bash
echo "Performing database migrations"
flask db upgrade
flask run