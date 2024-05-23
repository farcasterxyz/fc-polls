import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { NextApiResponse } from 'next';

export function createResponseJSON(data: unknown, res: NextApiResponse, init?: ResponseInit) {
    const status = init?.status ?? StatusCodes.OK;

    return res.status(status)
        .json(data);
}
