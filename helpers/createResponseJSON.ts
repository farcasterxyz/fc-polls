import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export function createResponseJSON(data: unknown, init?: ResponseInit) {
    const status = init?.status ?? StatusCodes.OK;

    return Response.json(data, {
        status,
        statusText: getReasonPhrase(status),
        headers: init?.headers,
    });
}
