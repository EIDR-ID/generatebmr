#!/usr/bin/env bash

cd /opt/eidr/webtools/generatebmr/server
npm ci
/opt/eidr/.local/bin/pm2 restart generatebmr-server
