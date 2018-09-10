#!/bin/bash

cd /home/debian-luigi/Documenti/ThesisTest/firstTest
echo $PWD " ..starting"

# First we need to start ganache-cli to create a local blockchain.
# We need ganache-cli installed in order to do this.
gnome-terminal --window-with-profile=tesi -e "ganache-cli"
sleep 10

# Second we need to start ipfs daemon.

gnome-terminal --window-with-profile=tesi -e "ipfs daemon --enable-pubsub-experiment"
sleep 10

# Third we need to run webpack for client.
gnome-terminal --window-with-profile=tesi -e "npm run build"
sleep 5

# Forth we need to run the command truffle compile and truffle migrate which are in npm script.
gnome-terminal --window-with-profile=tesi -e "npm run eth:build"
sleep 10

# Fifth we need to start backend node.js script.
gnome-terminal --window-with-profile=tesi -e "npm run dev-backend"
sleep 5

