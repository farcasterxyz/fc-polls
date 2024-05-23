import { kv } from '@vercel/kv';
import { Metadata, ResolvingMetadata } from 'next';
import Head from 'next/head';

import { PollVoteForm } from '@/app/form';
import { Poll } from '@/app/types';
import { MIN_VALID_IN_DAYS } from '@/constants';

async function getPoll(id: string): Promise<Poll> {
    const nullPoll = {
        id: '',
        title: 'No poll found',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        votes1: 0,
        votes2: 0,
        votes3: 0,
        votes4: 0,
        created_at: 0,
        validInDays: MIN_VALID_IN_DAYS,
    };

    try {
        const poll: Poll | null = await kv.hgetall(`poll:${id}`);

        if (!poll) {
            return nullPoll;
        }

        return poll;
    } catch (error) {
        console.error(error);
        return nullPoll;
    }
}

type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    // read route params
    const id = params.id;
    const poll = await getPoll(id);

    const fcMetadata: Record<string, string> = {
        'fc:frame': 'vNext',
        'fc:frame:post_url': `${process.env.HOST}/api/vote?id=${id}`,
        'fc:frame:image': `${process.env.HOST}/api/image?id=${id}`,
    };
    [poll.option1, poll.option2, poll.option3, poll.option4]
        .filter((o) => o !== '')
        .map((option, index) => {
            fcMetadata[`fc:frame:button:${index + 1}`] = option;
        });

    return {
        title: poll.title,
        openGraph: {
            title: poll.title,
            images: [`/api/image?id=${id}`],
        },
        other: {
            ...fcMetadata,
        },
        metadataBase: new URL(process.env.HOST || ''),
    };
}
function getMeta(poll: Poll) {
    // This didn't work for some reason
    return (
        <Head>
            <meta property="og:image" content="" key="test" />
            <meta property="og:title" content="My page title" key="title" />
        </Head>
    );
}

export default async function Page({ params }: { params: { id: string } }) {
    const poll = await getPoll(params.id);

    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-center py-2">
                <main className="flex flex-1 flex-col items-center justify-center px-4 text-center sm:px-20">
                    <PollVoteForm poll={poll} />
                </main>
            </div>
        </>
    );
}
