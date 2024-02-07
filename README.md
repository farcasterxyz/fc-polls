# Farcaster Frames Poll app

A example Poll app using [Farcaster Frames](https://warpcast.notion.site/Farcaster-Frames-4bd47fe97dc74a42a48d3a234636d8c5). 

This example lets you create a poll and have users vote on it. The FrameAction is authenticated against a hub 
so the votes cannot be spoofed (if `HUB_URL` is provided), and the results are stored in a redis database. 


## Demo

- [https://fc-polls.vercel.app/](https://fc-polls.vercel.app/)


## Setup
- After deploying your repo to Vercel...
- Create a `kv` database `https://vercel.com/<name>/<project>/stores`
- Set the `KV` prefix url's
<img width="543" alt="image" src="https://github.com/farcasterxyz/fc-polls/assets/6665100/f6999649-8727-494a-93f0-58226766f2e1">
- Navigate to env variables: https://vercel.com/gregan/fc-links-vote/settings/environment-variables
- If you're doing something production facing w/ trusted data, set the `HUB_URL` environment variable to a production hub's public ip address port 2283 ref: https://docs.farcaster.xyz/reference/frames/spec#frame-signature-packet
- Set the `HOST` env variable to your public facing url or domain, ie; `https://<project>.vercel.app/`
