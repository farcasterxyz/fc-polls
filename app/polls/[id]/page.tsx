import {kv} from "@vercel/kv";
import {Poll} from "@/app/types";
import {PollVoteForm} from "@/app/form";
import {useSearchParams} from "next/navigation";

async function getPoll(id: string): Promise<Poll> {
    let nullPoll = {
        id: "",
        title: "No poll found",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        votes1: 0,
        votes2: 0,
        votes3: 0,
        votes4: 0,
        created_at: 0,
    };

    try {
        let poll: Poll | null = await kv.hgetall(`poll:${id}`);

        if (!poll) {
            return nullPoll;
        }

        return poll;
    } catch (error) {
        console.error(error);
        return nullPoll;
    }
}

export default async function Page({params}: {params: {id: string}}) {
    const poll = await getPoll(params.id);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
                <PollVoteForm poll={poll} />
            </main>
        </div>
    );

}