'use strict';

import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { NGXLogger } from "ngx-logger";

import { SignInComponent } from "../auth/sign-in/sign-in.component";
import { UserService } from "./user.service";
import { SessionInfoService } from "../../../shared/session-info/session-info.service";
import { UserModel } from "./user.model";
import { ApiError } from "../../../shared/error-handler/error-handler";

/**
 * Main page component
 */
@Component({
    selector: 'page-main',
    templateUrl: 'main.component.html',
})
export class MainComponent implements OnInit {

    /**
     * User data
     */
    public user: UserModel;

    /**
     * Create MainComponent with inject services
     * @param {NavController} _navCtrl Service to work with control
     * @param {UserService} _userService Service to work with user api
     * @param {SessionInfoService} _sessionInfo Service to work with ionic storage
     * @param {NGXLogger} _logger Service to work with logger
     */
    public constructor(
        private _userService: UserService,
        private _sessionInfo: SessionInfoService,
        private _navCtrl: NavController,
        private _logger: NGXLogger
    ) {
    }

    /**
     * Prepare user data on init
     */
    public ngOnInit() {
        this._userService.getUser()
            .then((user: UserModel) => this.user = user)
            .catch((error: ApiError) => {
                this._logger.error(error.message, error);
                return this._navCtrl.setRoot(SignInComponent);
            });
    }

    /**
     * Log out user
     */
    public logOut() {
        this._sessionInfo.removeToken()
            .then(() => this._navCtrl.setRoot(SignInComponent))
    }
}
