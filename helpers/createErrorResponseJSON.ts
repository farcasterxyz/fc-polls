import { StatusCodes } from 'http-status-codes';

import { createResponseJSON } from '@/helpers/createResponseJSON';

export enum ServerErrorCodes {
    UNKNOWN = 40001,
}

export function createErrorResponseJSON(message: string, init?: ResponseInit) {
    return createResponseJSON(
        {
            success: false,
            error: {
                code: ServerErrorCodes.UNKNOWN,
                message,
            },
        },
        {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            ...init,
        },
    );
}
