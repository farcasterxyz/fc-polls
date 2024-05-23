import { kv } from '@vercel/kv';

import { ComposedPoll } from '@/app/types';

export const savePollToDb = async (poll: ComposedPoll) => {
    await kv.hset(`poll:${poll.id}`, poll);
    await kv.expire(`poll:${poll.id}`, poll.validInDays * 24 * 60 * 60);
    await kv.zadd('polls_by_date', {
        score: Number(poll.created_at),
        member: poll.id,
    });

    return { pollId: poll.id };
};
