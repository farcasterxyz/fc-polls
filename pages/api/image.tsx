import type { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';
import {Poll} from "@/app/types";
import {kv} from "@vercel/kv";
import satori from "satori";
import { join } from 'path';
import * as fs from "fs";

const fontPath = join(process.cwd(), 'Roboto-Regular.ttf')
let fontData = fs.readFileSync(fontPath)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const pollId = req.query['id']
        // const fid = parseInt(req.query['fid']?.toString() || '')
        if (!pollId) {
            return res.status(400).send('Missing poll ID');
        }

        let poll: Poll | null = await kv.hgetall(`poll:${pollId}`);


        if (!poll) {
            return res.status(400).send('Missing poll ID');
        }

        const showResults = req.query['results'] === 'true'
        // let votedOption: number | null = null
        // if (showResults && fid > 0) {
        //     votedOption = await kv.hget(`poll:${pollId}:votes`, `${fid}`) as number
        // }

        const pollOptions = [poll.option1, poll.option2, poll.option3, poll.option4]
            .filter((option) => option !== '');
        const totalVotes = pollOptions
            // @ts-ignore
            .map((option, index) => parseInt(poll[`votes${index+1}`]))
            .reduce((a, b) => a + b, 0);
        const pollData = {
            question: showResults ? `Results for ${poll.title}` : poll.title,
            options: pollOptions
                .map((option, index) => {
                    // @ts-ignore
                    const votes = poll[`votes${index+1}`]
                    const percentOfTotal = totalVotes ? Math.round(votes / totalVotes * 100) : 0;
                    let text = showResults ? `${percentOfTotal}%: ${option} (${votes} votes)` : `${index + 1}. ${option}`
                    return { option, votes, text, percentOfTotal }
                })
        };

        const svg = await satori(
            <div style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                display: 'flex',
                width: '100%',
                height: '100%',
                backgroundColor: 'f4f4f4',
                padding: 50,
                lineHeight: 1.2,
                fontSize: 24,
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 20,
                }}>
                    <h2 style={{textAlign: 'center', color: 'lightgray'}}>{poll.title}</h2>
                    {
                        pollData.options.map((opt, index) => {
                            return (
                                <div style={{
                                    backgroundColor:  showResults ? '#007bff' : '',
                                    color: '#fff',
                                    padding: 10,
                                    marginBottom: 10,
                                    borderRadius: 4,
                                    width: `${showResults ? opt.percentOfTotal : 100}%`,
                                    whiteSpace: 'nowrap',
                                    overflow: 'visible',
                                }}>{opt.text}</div>
                            )
                        })
                    }
                    {/*{showResults ? <h3 style={{color: "darkgray"}}>Total votes: {totalVotes}</h3> : ''}*/}
                </div>
            </div>
            ,
            {
                width: 600, height: 400, fonts: [{
                    data: fontData,
                    name: 'Roboto',
                    style: 'normal',
                    weight: 400
                }]
            })

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
