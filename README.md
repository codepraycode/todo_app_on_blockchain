# TODO BLOCKCHAIN APP
> A Blockchain Todo App Powered By Ethereum

## Table of Contents
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Acknowledgements](#acknowledgements)

## Technologies Used
Noteable Technologies and tools used are
- Truffle - version 5.4.9
- [Ganache](https://www.trufflesuite.com/ganache)
- [Metamask google chrome extension](https://metamask.io/)
- [Node Js](https://nodejs.org/en/)
- [Chrome Browser](https://chromeenterprise.google/)
the rest of the technologies are in the `package.json` file

## Features
Current Ready features here:
- Add Task
- Checkout completed tasks

## Setup
To use this app, you should follow this procedure
- Make sure you have Chrome broweser[_recommended_] and the [Metamask google chrome extension](https://metamask.io/)
- Make sure to have [Ganache](https://www.trufflesuite.com/ganache) installed and have it running
- Do well to run `npm install` to install all the dependencies required
- You may want to change some configurations in `truffle-config.js` to meet your own setup if it's not the same as the one there(the one there was my configuration)
- Setup your Metamask Extension
- run `truffle migrate` on first run, and `truffle migrate --reset` on consecutive runs
- identify the account be used in your running workspace on Ganache and copy the key
- On Metamask, Add a network with the same port your Ganache is running on, this will connect Metamask to your local/private network. (e.g http://127.0.0.0:*7545*, take note of the port number)
-  After successful connection, Go to your Ganache and Copy the your account private key(you can identify the account used by detecting the account whose account balance had reduced when your ran `truffle migrate` or `truffle migrate --reset`)
- On Metamask, import Account, and import using the private key you've copied.
- With all that done succesfully, run `npm run dev` on the command line
And that's it.

## Usage
To use it, simple run `npm run dev` on the command line
And that's it.

## Project Status
This project is a tutorial project and completed.


## Acknowledgements
- This project was based on [this tutorial channel](https://www.youtube.com/channel/UCY0xL8V6NzzFcwzHCgB8orQ).
- Many thanks to [Dapps university](https://github.com/dappuniversity).
