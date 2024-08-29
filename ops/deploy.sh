#!/bin/bash

set -e

# build client
cd client
npm ci
npm run build
mkdir -p build/generatebmr
find build -maxdepth 1 ! -name 'index.html' ! -name 'generatebmr' -exec mv {} build/generatebmr/ \;
cd -

# rsync everything
DEPLOY_SERVER=$(cat ./server.txt)
rsync -avz -e "ssh -o StrictHostKeyChecking=no" --delete ./client/build/ eidr@"$DEPLOY_SERVER":/var/www/html/generatebmr
rsync -avz -e "ssh -o StrictHostKeyChecking=no" --delete --exclude node_modules ./server/ eidr@"$DEPLOY_SERVER":/opt/eidr/webtools/generatebmr/server

# update and restart server
ssh -o StrictHostKeyChecking=no eidr@"$DEPLOY_SERVER" /opt/eidr/webtools/generatebmr/update_server.sh
