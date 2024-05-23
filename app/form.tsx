'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useOptimistic, useRef, useState, useTransition } from 'react';
import { v4 as uuid } from 'uuid';

import { redirectToPolls, savePoll, votePoll } from '@/app/actions';
import { Poll } from '@/app/types';
import { DEFAULT_VALID_IN_DAYS } from '@/constants';

type PollState = {
    newPoll: Poll;
    updatedPoll?: Poll;
    pending: boolean;
    voted?: boolean;
};

export function PollCreateForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, mutate] = useOptimistic({ pending: false }, function createReducer(state, newPoll: PollState) {
        if (newPoll.newPoll) {
            return {
                pending: newPoll.pending,
            };
        } else {
            return {
                pending: newPoll.pending,
            };
        }
    });

    const pollStub = {
        id: uuid(),
        created_at: new Date().getTime(),
        title: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        votes1: 0,
        votes2: 0,
        votes3: 0,
        votes4: 0,
        validInDays: DEFAULT_VALID_IN_DAYS,
    };
    const saveWithNewPoll = savePoll.bind(null, pollStub);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isPending, startTransition] = useTransition();

    return (
        <>
            <div className="mx-8 w-full">
                <form
                    className="relative my-8"
                    ref={formRef}
                    action={saveWithNewPoll}
                    onSubmit={(event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const newPoll = {
                            ...pollStub,
                            title: formData.get('title') as string,
                            option1: formData.get('option1') as string,
                            option2: formData.get('option2') as string,
                            option3: formData.get('option3') as string,
                            option4: formData.get('option4') as string,
                            votes1: 0,
                            votes2: 0,
                            votes3: 0,
                            votes4: 0,
                        };

                        formRef.current?.reset();
                        startTransition(async () => {
                            mutate({
                                newPoll,
                                pending: true,
                            });

                            await savePoll(newPoll, formData);
                        });
                    }}
                >
                    <input
                        aria-label="Poll Title"
                        className="mt-1 block w-full rounded-md border border-gray-200 py-3 pl-3 pr-28 text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
                        maxLength={150}
                        placeholder="Title..."
                        required
                        type="text"
                        name="title"
                    />
                    <input
                        aria-label="Option 1"
                        className="mt-1 block w-full rounded-md border border-gray-200 py-3 pl-3 pr-28 text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
                        maxLength={150}
                        placeholder="Option 1"
                        required
                        type="text"
                        name="option1"
                    />
                    <input
                        aria-label="Option 2"
                        className="mt-1 block w-full rounded-md border border-gray-200 py-3 pl-3 pr-28 text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
                        maxLength={150}
                        placeholder="Option 2"
                        required
                        type="text"
                        name="option2"
                    />
                    <input
                        aria-label="Option 3"
                        className="mt-1 block w-full rounded-md border border-gray-200 py-3 pl-3 pr-28 text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
                        maxLength={150}
                        placeholder="Option 3 (optional)"
                        type="text"
                        name="option3"
                    />
                    <input
                        aria-label="Option 4"
                        className="mt-1 block w-full rounded-md border border-gray-200 py-3 pl-3 pr-28 text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
                        maxLength={150}
                        placeholder="Option 4 (optional)"
                        type="text"
                        name="option4"
                    />
                    <div className={'flex justify-end pt-2'}>
                        <button
                            className={clsx(
                                'flex h-10 w-24 items-center justify-center rounded-md border bg-blue-500 p-1 px-4 text-lg text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300',
                                state.pending && 'cursor-not-allowed bg-gray-700',
                            )}
                            type="submit"
                            disabled={state.pending}
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-full" />
        </>
    );
}

function PollOptions({ poll, onChange }: { poll: Poll; onChange: (index: number) => void }) {
    return (
        <div className="mb-4 text-left">
            {[poll.option1, poll.option2, poll.option3, poll.option4]
                .filter((e) => e !== '')
                .map((option, index) => (
                    <label key={index} className="block">
                        <input
                            type="radio"
                            name="poll"
                            value={option}
                            onChange={() => onChange(index + 1)}
                            className="mr-2"
                        />
                        {option}
                    </label>
                ))}
        </div>
    );
}

function PollResults({ poll }: { poll: Poll }) {
    return (
        <div className="mb-4">
            <Image
                width={600}
                height={400}
                src={`/api/image?id=${poll.id}&results=true&date=${Date.now()}`}
                alt="poll results"
            />
        </div>
    );
}

export function PollVoteForm({ poll, viewResults }: { poll: Poll; viewResults?: boolean }) {
    const [selectedOption, setSelectedOption] = useState(-1);
    const router = useRouter();
    const searchParams = useSearchParams();
    viewResults = true; // Only allow voting via the api
    const formRef = useRef<HTMLFormElement>(null);
    const voteOnPoll = votePoll.bind(null, poll);
    const [isPending, startTransition] = useTransition();
    const [state, mutate] = useOptimistic(
        { showResults: viewResults },
        function createReducer({ showResults }, state: PollState) {
            if (state.voted || viewResults) {
                return {
                    showResults: true,
                };
            } else {
                return {
                    showResults: false,
                };
            }
        },
    );

    const handleVote = (index: number) => {
        setSelectedOption(index);
    };

    return (
        <div className="m-4 max-w-sm overflow-hidden rounded p-4 shadow-lg">
            <div className="mb-2 text-xl font-bold">{poll.title}</div>
            <form
                className="relative my-8"
                ref={formRef}
                action={() => voteOnPoll(selectedOption)}
                onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const newPoll = {
                        ...poll,
                    };

                    // @ts-ignore
                    newPoll[`votes${selectedOption}`] += 1;

                    formRef.current?.reset();
                    startTransition(async () => {
                        mutate({
                            newPoll,
                            pending: false,
                            voted: true,
                        });

                        await redirectToPolls();
                        // await votePoll(newPoll, selectedOption);
                    });
                }}
            >
                {state.showResults ? <PollResults poll={poll} /> : <PollOptions poll={poll} onChange={handleVote} />}
                {state.showResults ? (
                    <button
                        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                        type="submit"
                    >
                        Back
                    </button>
                ) : (
                    <button
                        className={
                            'rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700' +
                            (selectedOption < 1 ? ' cursor-not-allowed' : '')
                        }
                        type="submit"
                        disabled={selectedOption < 1}
                    >
                        Vote
                    </button>
                )}
            </form>
        </div>
    );
}
