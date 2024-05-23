import { kv } from '@vercel/kv';
import Link from 'next/link';

import { Poll } from '@/app/types';

const SEVEN_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 7;

async function getPolls() {
    try {
        const pollIds = await kv.zrange('polls_by_date', Date.now(), Date.now() - SEVEN_DAYS_IN_MS, {
            byScore: true,
            rev: true,
            count: 100,
            offset: 0,
        });

        if (!pollIds.length) {
            return [];
        }

        const multi = kv.multi();
        pollIds.forEach((id) => {
            multi.hgetall(`poll:${id}`);
        });

        const items: Poll[] = await multi.exec();
        return items.map((item) => {
            return { ...item };
        });
    } catch (error) {
        console.error('[poll]: failed to read polls.');
        return [];
    }
}

export default async function Page() {
    const polls = await getPolls();
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <main className="flex flex-1 flex-col items-center justify-center px-4 text-center sm:px-20">
                <h1 className="mb-2 text-lg font-bold sm:text-2xl">Created Polls</h1>
                <div className="my-8 h-full max-w-4xl flex-1 flex-wrap items-center justify-around rounded-md border border-gray-100 bg-white shadow-xl sm:w-full">
                    {polls.map((poll) => {
                        // returns links to poll ids
                        return (
                            <div key={poll.id}>
                                <a href={`/polls/${poll.id}`} className="underline">
                                    <p className="text-md mx-4 sm:text-xl">{poll.title}</p>
                                </a>
                            </div>
                        );
                    })}
                </div>
                <Link href="/">
                    <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                        Create Poll
                    </button>
                </Link>
            </main>
        </div>
    );
}
