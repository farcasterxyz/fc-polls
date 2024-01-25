import type { NextApiRequest, NextApiResponse } from 'next';
import {Poll} from "@/app/types";
import {kv} from "@vercel/kv";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Process the vote
        // For example, let's assume you receive an option in the body
        try {
            const pollId = req.query['id']
            const results = req.query['results'] === 'true'
            const voted = req.query['voted'] === 'true'
            if (!pollId) {
                return res.status(400).send('Missing poll ID');
            }

            const { option } = req.body;

            const buttonId = parseInt(option)
            if (buttonId > 0 && buttonId < 5 && !results && !voted) {
                await kv.hincrby(`poll:${pollId}`, `votes${buttonId}`, 1);
            }

            let poll: Poll | null = await kv.hgetall(`poll:${pollId}`);

            if (!poll) {
                return res.status(400).send('Missing poll ID');
            }

            // Return an HTML response
            res.setHeader('Content-Type', 'text/html');
            res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Vote Recorded</title>
          <meta property="og:title" content="Vote Recorded">
          <meta property="og:image" content="${process.env['HOST']}/api/image?id=${poll.id}&results=${results ? 'false': 'true'}">
          <meta name="fc:frame" content="vNext">
          <meta name="fc:frame:image" content="${process.env['HOST']}/api/image?id=${poll.id}&results=${results ? 'false': 'true'}">
          <meta name="fc:frame:post_url" content="${process.env['HOST']}/api/vote?id=${poll.id}&voted=true&results=${results ? 'false' : 'true'}">
          <meta name="fc:frame:button:1" content="${results ? "View Results" : "Back" }">
        </head>
        <body>
          <h1>Thank you for voting!</h1>
          <p>Your vote for "${option}" has been recorded.</p>
        </body>
      </html>
    `);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error generating image');
        }
    } else {
        // Handle any non-POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
