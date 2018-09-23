'use strict';

import { Response } from '@angular/http';

/**
 * Handle error from api
 * @param {Response} response Api response
 * @returns {ApiError} return api error with message and status code
 */
export function errorHandler(response: Response): ApiError {
    let body: any = null, // tslint:disable-line:no-any
        message: string = null,
        isJSON: boolean = response.headers && response.headers.get('Content-Type') &&
            !!response.headers.get('Content-Type').match(/application\/json/);

    if (isJSON) {
        body = response.json();
        let id: string = (body.id) ? `[${body.id}] ` : '';
        message = body.message || body.error || body.body || JSON.stringify(body);
        message = id + message;
    } else {
        message = response.text();
    }

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

