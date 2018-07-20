#!/bin/bash

echo $PWD " ..starting"

# First we need to start ganache-cli to create a local blockchain.
# We need ganache-cli installed in order to do this.
ganache-cli &
sleep 10

# Second we need to start ipfs daemon.
cd /home/debian-luigi/Documenti/ThesisTest/firstTest

ipfs daemon --enable-pubsub-experiment &
sleep 10

# Third we need to run webpack for client.
npm run build &
sleep 5

# Forth we need to run the command truffle compile and truffle migrate which are in npm script.
npm run eth:build &
sleep 5

# Fifth we need to start backend node.js script.
npm run dev-backend &
sleep 5

# Finally we need to open chrome with the page http://localhost:3000 (assuming 3000 is the port).
google-chrome --app=http://localhost:3000

