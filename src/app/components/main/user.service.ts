'use strict';

import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { errorHandler } from "../../../shared/error-handler/error-handler";
import { CONSTANTS } from "../../../shared/CONSTANTS";
import { SessionInfoService } from "../../../shared/session-info/session-info.service";

@Injectable()
export class UserService {

    public constructor(
        private _http: Http,
        private _sessionInfo: SessionInfoService
    ){}

    public getUser() {
        let headers: Headers = new Headers();
        return this._sessionInfo.getToken()
            .then((token: string) => headers.append('auth-token', token))
            .then(() =>
                this._http.get(CONSTANTS.BACKEND_URL + `user/getUser.php`, {
                    headers: headers
                })
                    .toPromise())
            .then((res: Response) => res.json())
            .catch((errorResponse: Response) => {
                console.log(errorResponse);
                throw errorHandler(errorResponse);
            })
    }
}
