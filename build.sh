#!/bin/bash

docker-compose build && docker-compose up;
docker exec -it area_client-web_1 sh -c "cp /apk_release/app-release.apk /client-web/public/client.apk";