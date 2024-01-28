# Farcaster Frames Poll app

A example Poll app using [Farcaster Frames](https://warpcast.notion.site/Farcaster-Frames-4bd47fe97dc74a42a48d3a234636d8c5).

This example lets you create a poll and have users vote on it. The FrameAction is authenticated against a hub so the votes cannot be spoofed, and the results are stored in a redis database.

## Demo

- [https://fc-polls.vercel.app/](https://fc-polls.vercel.app/)

## Running locally

This repository uses [@vercel/kv](https://vercel.com/docs/storage/vercel-kv) for data storage, which is a hosted version of [Serverless Redis HTTP (SRH)](https://github.com/hiett/serverless-redis-http).

We've included a `docker-compose.yml` file that will run SRH locally, and the `.env.example` file includes a matching default configuration.

So to run locally, first copy the example dotenv file into place:

```sh
cp .env.exampe .env
```

Then [install Docker](https://docs.docker.com/get-docker/) and run compose in one terminal:

```sh
docker compose up
```

Install the app dependencies and run the app in another terminal:

```sh
npm install
npm run dev
```

Then visit `HOST` aka

<http://localhost:3000>

Congrats, you did it
