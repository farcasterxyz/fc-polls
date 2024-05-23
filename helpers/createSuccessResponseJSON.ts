import { StatusCodes } from 'http-status-codes';

import { createResponseJSON } from '@/helpers/createResponseJSON';
import { NextApiResponse } from 'next';

export function createSuccessResponseJSON(data: unknown, res: NextApiResponse, init?: ResponseInit) {
    return createResponseJSON(
        {
            success: true,
            data,
        },
        res,
        {
            status: StatusCodes.OK,
            ...init,
        },
    );
}
