#!/bin/sh
JSON_STRING='window.configs = { \
  "VUE_APP_ENV_VARIABLE":"'"${ENV_VARIABLE}"'", \
}'
sed -i "s@// CONFIGURATIONS_PLACEHOLDER@${JSON_STRING}@" /app/index.html
exec "$@"

