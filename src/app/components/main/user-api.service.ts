'use strict';

import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";

import { errorHandler } from "../../../shared/error-handler/error-handler";
import { CONSTANTS } from "../../../shared/CONSTANTS";
import { SessionInfoService } from "../../../shared/session-info/session-info.service";
import { UserModel } from "./user.model";

/**
 * User api service
 */
@Injectable()
export class UserApiService {

    /**
     * Create user api service
     * @param {Http} _http Http service
     * @param {SessionInfoService} _sessionInfo Service to work with ionic storage
     */
    public constructor(
        private _http: Http,
        private _sessionInfo: SessionInfoService
    ){}

    /**
     * Get user value
     * @returns {Promise<UserModel>} Uer data
     */
    public getUser(): Promise<UserModel> {
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
                throw errorHandler(errorResponse);
            })
    }
}
