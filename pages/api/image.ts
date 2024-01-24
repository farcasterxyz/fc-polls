import type { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';
import {Poll} from "@/app/types";
import {kv} from "@vercel/kv";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const pollId = req.query['id']
        if (!pollId) {
            return res.status(400).send('Missing poll ID');
        }

        let poll: Poll | null = await kv.hgetall(`poll:${pollId}`);

        if (!poll) {
            return res.status(400).send('Missing poll ID');
        }

        const showResults = req.query['results'] === 'true'

        // Dummy poll data (replace this with your actual poll data)
        const pollData = {
            question: showResults ? `Results for ${poll.title}` : poll.title,
            options: [poll.option1, poll.option2, poll.option3, poll.option4]
                .filter((option) => option !== '')
                .map((option, index) => {
                    // @ts-ignore
                    const votes = poll[`votes${index+1}`]
                    const text = showResults ? `${option}: ${votes} votes` : `${option}`
                    return { option, votes, text }
                })
        };

        // Create an SVG with poll results
        let svg = `<svg width="500" height="${30 + pollData.options.length * 60}" xmlns="http://www.w3.org/2000/svg">`
            + `<text x="10" y="20" font-family="Arial" font-size="20">${pollData.question}</text>`;

        pollData.options.forEach((opt, index) => {
            svg += `<text x="10" y="${50 + index * 60}" font-family="Arial" font-size="15">${opt.text}</text>`;
        });

        svg += `</svg>`;

        // Convert SVG to PNG using Sharp
        const pngBuffer = await sharp(Buffer.from(svg))
            .toFormat('png')
            .toBuffer();

        // Set the content type to PNG and send the response
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'max-age=10');
        res.send(pngBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating image');
    }
}
