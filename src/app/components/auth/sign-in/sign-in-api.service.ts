'use strict'

import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { CONSTANTS } from "../../../../shared/CONSTANTS";
import { SignInModel } from "../auth.model";
import { errorHandler } from "../../../../shared/error-handler/error-handler";

@Injectable()
export class SignInApiService {

    public constructor(
        private _http: Http
    ){}

    public signInUser(signIn: SignInModel){
        return this._http.post(CONSTANTS.BACKEND_URL +
            `sign-in/sign-in.php`, signIn)
            .toPromise()
            .then((res: Response) => res.json())
            .catch((errorResponse: Response) => {
                throw errorHandler(errorResponse);
            })
    }

    public getUset(token: string) {
        let headers: Headers = new Headers();
        headers.append('auth-token', token);
        return this._http.get(CONSTANTS.BACKEND_URL + `getUser.php`, {
            headers: headers
        })
            .toPromise()
            .then((res: Response) => res.json())
            .catch((errorResponse: Response) => {
                throw errorHandler(errorResponse);
            })
    }
}
