'use strict';

import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { CONSTANTS } from "../../../../shared/CONSTANTS";
import { SignInModel } from "../auth.model";
import { errorHandler } from "../../../../shared/error-handler/error-handler";

/**
 * Sign in api service
 */
@Injectable()
export class SignInApiService {

    /**
     * Create Sign in api service
     * @param {Http} _http Http service
     */
    public constructor(
        private _http: Http
    ){}

    /**
     * Sign in user
     * @param {SignInModel} signIn Sign in data
     * @returns {Promise<Response | void>} User token
     */
    public signInUser(signIn: SignInModel): Promise<string>{
        return this._http.post(CONSTANTS.BACKEND_URL +
            `sign-in/sign-in.php`, signIn)
            .toPromise()
            .then((res: Response) => res.json())
            .catch((errorResponse: Response) => {
                throw errorHandler(errorResponse);
            })
    }

}
