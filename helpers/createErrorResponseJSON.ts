import { StatusCodes } from 'http-status-codes';

import { createResponseJSON } from '@/helpers/createResponseJSON';
import { NextApiResponse } from 'next';

export enum ServerErrorCodes {
    UNKNOWN = 40001,
}

export function createErrorResponseJSON(message: string, res: NextApiResponse, init?: ResponseInit) {
    return createResponseJSON(
        {
            success: false,
            error: {
                code: ServerErrorCodes.UNKNOWN,
                message,
            },
        },
        res,
        {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            ...init,
        },
    );
}
