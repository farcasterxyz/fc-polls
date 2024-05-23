import { ComposedPoll } from '@/app/types';
import { MAX_TITLE_CHARS_PEER_POLL, MAX_VALID_IN_DAYS, POLL_OPTIONS_MAX_COUNT, POLL_OPTIONS_MIN_COUNT, POLL_PEER_OPTION_MAX_CHARS } from '@/constants';
import { createErrorResponseJSON } from '@/helpers/createErrorResponseJSON';
import { createSuccessResponseJSON } from '@/helpers/createSuccessResponseJSON';
import { savePollToDb } from '@/helpers/savePollToDb';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { NextRequest } from 'next/server';

const PollSchema = z.object({
    text: z.string()
        .trim()
        .min(1, 'Poll title must be at least 1 character')
        .max(
        MAX_TITLE_CHARS_PEER_POLL,
        `Poll title must be less than ${MAX_TITLE_CHARS_PEER_POLL} characters`,
    ),
    poll: z.object({
        id: z.string(),
        options: z
            .array(
                z.object({
                    id: z.string(),
                    label: z
                        .string()
                        .trim()
                        .min(1, 'Poll option must be at least 1 character')
                        .max(
                            POLL_PEER_OPTION_MAX_CHARS,
                            `Poll option must be less than ${POLL_PEER_OPTION_MAX_CHARS} characters`,
                        ),
                }),
            )
            .min(POLL_OPTIONS_MIN_COUNT, `Poll must have at least ${POLL_OPTIONS_MIN_COUNT} options`)
            .max(POLL_OPTIONS_MAX_COUNT, `Poll must have at most ${POLL_OPTIONS_MAX_COUNT} options`),
        validInDays: z
            .number()
            .int()
            .positive()
            .min(1)
            .max(MAX_VALID_IN_DAYS),
    })
});

const composePoll = (pollData: z.infer<typeof PollSchema>): ComposedPoll => {
    const { text, poll } = pollData;
    return {
        id: uuid(),
        title: text,
        created_at: Date.now(),
        validIndays: poll.validInDays,
        ...(poll.options.reduce((result, option, index) => {
            return {
                ...result,
                [`option${index + 1}`]: option.label,
                [`votes${index + 1}`]: 0,
            }
        }, {}))
    };
}

export async function POST(request: NextRequest) {
    try {
        const parsedPoll = PollSchema.safeParse(await request.json());
        if (!parsedPoll.success) throw new Error(parsedPoll.error.message);
        const { pollId } = await savePollToDb(composePoll(parsedPoll.data));
        return createSuccessResponseJSON({ pollId });
    } catch (error) {
        if (error instanceof Error){
            return createErrorResponseJSON(error.message);
        } else {
            return createErrorResponseJSON('unknown error');
        }
    }
}