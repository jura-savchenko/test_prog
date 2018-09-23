'use strict';

import { Response } from '@angular/http';

/**
 * Handle error from api
 * @param {Response} response Api response
 * @returns {ApiError} return api error with message and status code
 */
export function errorHandler(response: Response): ApiError {
    let body: any = response.json(),
        message: string;
        const id: string = body.id || '';
        message = body.message || body.error || body.body || JSON.stringify(body);
        message = id + message;

    return new ApiError(message, response.status);
}

/**
 * Api error class
 */
export class ApiError extends Error {

    /**
     * Create api error
     * @param {string} message Error message
     * @param {number} status Error status
     */
    public constructor(public message: string, public status: number){
        super(message);
    }
}

