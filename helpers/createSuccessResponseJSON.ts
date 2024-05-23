import { StatusCodes } from 'http-status-codes';

import { createResponseJSON } from '@/helpers/createResponseJSON';

export function createSuccessResponseJSON(data: unknown, init?: ResponseInit) {
    return createResponseJSON(
        {
            success: true,
            data,
        },
        {
            status: StatusCodes.OK,
            ...init,
        },
    );
}
