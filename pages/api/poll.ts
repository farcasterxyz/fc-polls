import { Poll } from '@/app/types';
import { DEFAULT_VALID_IN_DAYS, POLL_PEER_OPTION_MAX_CHARS } from '@/constants';
import { createErrorResponseJSON } from '@/helpers/createErrorResponseJSON';
import { createSuccessResponseJSON } from '@/helpers/createSuccessResponseJSON';
import { savePollToDb } from '@/helpers/savePollToDb';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { NextApiRequest, NextApiResponse } from 'next';

const PollSchema = z.object({
    text: z.string(),
    poll: z.object({
        id: z.string(),
        options: z.array(
            z.object({
                id: z.string(),
                label: z
                    .string()
                    .max(
                        POLL_PEER_OPTION_MAX_CHARS,
                        `Poll option must be less than ${POLL_PEER_OPTION_MAX_CHARS} characters`,
                    ),
            }),
        ),
        validInDays: z.number().int().positive(),
    })
});

const composePoll = (poll: ReturnType<typeof PollSchema.safeParse>['data']): Poll => {
    return {
        id: uuid(),
        title: poll?.text ?? '',
        created_at: Date.now(),
        validIndays: poll?.poll.validInDays ?? DEFAULT_VALID_IN_DAYS,
        ...(poll?.poll.options.reduce((result, option, index) => {
            return {
                ...result,
                [`option${index + 1}`]: option.label,
                [`votes${index + 1}`]: 0,
            }
        }, {}))
    } as unknown as Poll;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const parsedPoll = PollSchema.safeParse(req.body);
        if (!parsedPoll.success) throw new Error(parsedPoll.error.message);
        const { pollId } = await savePollToDb(composePoll(parsedPoll.data));
        return createSuccessResponseJSON({ pollId }, res);
    } catch (error) {
        if (error instanceof Error){
            createErrorResponseJSON(error.message, res);
        } else {
            createErrorResponseJSON('unknown error', res);
        }
    }
}