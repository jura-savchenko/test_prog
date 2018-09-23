'use strict';

import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { CONSTANTS } from "../../../../shared/CONSTANTS";
import { SignUpModel } from "../auth.model";
import { errorHandler } from "../../../../shared/error-handler/error-handler";

@Injectable()
export class SignUpApiService {

    public constructor(
        private _http: Http
    ){}

    public signUpUser(signUp: SignUpModel): Promise<string>{
        return this._http.post(CONSTANTS.BACKEND_URL +
            `sign-up/sign-up.php`, signUp)
            .toPromise()
            .then((res: Response) => {
                console.log(res);
                return res.json();
            })
            .catch((errorResponse: Response) => {
                throw errorHandler(errorResponse);
            })
    }

}
