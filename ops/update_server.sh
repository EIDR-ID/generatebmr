#!/usr/bin/env bash

cd /opt/eidr/webtools/generatebmr/server
npm ci
pm2 restart generatebmr-server
