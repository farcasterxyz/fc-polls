import { NextRequest } from 'next/server';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

import { ComposedPoll } from '@/app/types';
import {
    MAX_CHARS_POLL_TITLE,
    MAX_VALID_IN_DAYS,
    MIN_VALID_IN_DAYS,
    POLL_OPTIONS_MAX_COUNT,
    POLL_OPTIONS_MIN_COUNT,
    MAX_CHARS_POLL_OPTION,
} from '@/constants';
import { createErrorResponseJSON } from '@/helpers/createErrorResponseJSON';
import { createSuccessResponseJSON } from '@/helpers/createSuccessResponseJSON';
import { savePollToDb } from '@/helpers/savePollToDb';

const PollSchema = z.object({
    text: z
        .string()
        .trim()
        .min(1, 'Poll title must be not empty.')
        .max(MAX_CHARS_POLL_TITLE, `Poll title must be less than ${MAX_CHARS_POLL_TITLE} characters.`),
    poll: z.object({
        id: z.string(),
        options: z
            .array(
                z.object({
                    id: z.string(),
                    label: z
                        .string()
                        .trim()
                        .min(1, 'Poll option must be not empty.')
                        .max(
                            MAX_CHARS_POLL_OPTION,
                            `Poll option must be less than ${MAX_CHARS_POLL_OPTION} characters.`,
                        ),
                }),
            )
            .min(POLL_OPTIONS_MIN_COUNT, `Poll must have at least ${POLL_OPTIONS_MIN_COUNT} options.`)
            .max(POLL_OPTIONS_MAX_COUNT, `Poll must have at most ${POLL_OPTIONS_MAX_COUNT} options.`),
        validInDays: z.number().int().positive().min(MIN_VALID_IN_DAYS).max(MAX_VALID_IN_DAYS),
    }),
});

const composePoll = (pollData: z.infer<typeof PollSchema>): ComposedPoll => {
    const { text, poll } = pollData;
    return {
        id: uuid(),
        title: text,
        created_at: Date.now(),
        validInDays: poll.validInDays,
        ...poll.options.reduce((result, option, index) => {
            return {
                ...result,
                [`option${index + 1}`]: option.label,
                [`votes${index + 1}`]: 0,
            };
        }, {}),
    };
};

export async function POST(request: NextRequest) {
    try {
        const parsed = PollSchema.safeParse(await request.json());
        if (!parsed.success) throw new Error(parsed.error.message);

        const { pollId } = await savePollToDb(composePoll(parsed.data));
        return createSuccessResponseJSON({ pollId });
    } catch (error) {
        if (error instanceof Error) {
            return createErrorResponseJSON(error.message);
        } else {
            return createErrorResponseJSON('unknown error');
        }
    }
}
