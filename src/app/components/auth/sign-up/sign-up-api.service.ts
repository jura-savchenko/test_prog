'use strict';

import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { CONSTANTS } from "../../../../shared/CONSTANTS";
import { SignUpModel } from "../auth.model";
import { errorHandler } from "../../../../shared/error-handler/error-handler";

/**
 * Sign up api service
 */
@Injectable()
export class SignUpApiService {

    /**
     * Create Sign up api service
     * @param {Http} _http Http service
     */
    public constructor(
        private _http: Http
    ){}

    /**
     * Sign up use
     * @param {SignUpModel} signUp Sign up data
     * @returns {Promise<string>} User token
     */
    public signUpUser(signUp: SignUpModel): Promise<string>{
        return this._http.post(CONSTANTS.BACKEND_URL +
            `sign-up/sign-up.php`, signUp)
            .toPromise()
            .then((res: Response) => res.json())
            .catch((errorResponse: Response) => {
                throw errorHandler(errorResponse);
            })
    }

}
