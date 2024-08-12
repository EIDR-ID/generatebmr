#!/bin/bash

# build client
cd client
npm run build

# rsync everything
DEPLOY_SERVER=$(cat ./server.txt)
rsync -avz -e "ssh -o StrictHostKeyChecking=no" --delete ./client/build/ eidr@"$DEPLOY_SERVER":/var/www/html/generatebmr
rsync -avz -e "ssh -o StrictHostKeyChecking=no" --delete ./server/ eidr@"$DEPLOY_SERVER":/opt/eidr/webtools/generatebmr/server

# update and restart server
ssh -o StrictHostKeyChecking=no eidr@"$DEPLOY_SERVER" /opt/eidr/webtools/generatebmr/update_server.sh
