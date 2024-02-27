# Farcaster Frames Market Price Prediction app

A example Market Price Prediction app using [Farcaster Frames](https://warpcast.notion.site/Farcaster-Frames-4bd47fe97dc74a42a48d3a234636d8c5). 

This example lets you create a market pridiction poll and have users vote on it. Those who win the prediction will be rewarded an NFT after checking the price from oracle. 

## Demo

- [https://fc-market-price-polls.vercel.app/](https://fc-market-price-polls.vercel.app/)


## Setup
- After deploying your repo to Vercel...
- Create a `kv` database `https://vercel.com/<name>/<project>/stores`
- Set the `KV` prefix url's for the new `kv` database
- Navigate to env variables: https://vercel.com/gregan/fc-links-vote/settings/environment-variables
- If you're doing something production facing w/ trusted data, set the `HUB_URL` environment variable to a production hub's public ip address port 2283 ref: https://docs.farcaster.xyz/reference/frames/spec#frame-signature-packet
- Set the `HOST` env variable to your public facing url or domain, ie; `https://<project>.vercel.app/`
- Redeploy the project to enable environment varibles.
