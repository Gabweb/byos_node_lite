#!/usr/bin/with-contenv bashio

bashio::log.info "Starting server..."

export HOMEASSISTANT_URL="$(bashio::config 'HOMEASSISTANT_URL')"
export HOMEASSISTANT_TOKEN=$(bashio::config 'HOMEASSISTANT_TOKEN')
export SECRET_KEY="$(bashio::config 'SECRET_KEY')"
export PUBLIC_URL_ORIGIN="$(bashio::config 'PUBLIC_URL_ORIGIN')"
export WEATHER_ENTITY_ID=$(bashio::config 'WEATHER_ENTITY_ID')
export OUTDOOR_TEMP_ENTITY_ID=$(bashio::config 'OUTDOOR_TEMP_ENTITY_ID')
export BLACK_TRESHOLD=$(bashio::config 'BLACK_TRESHOLD')

exec /usr/bin/npm start