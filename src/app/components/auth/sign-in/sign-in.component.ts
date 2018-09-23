'use strict';

import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Loading } from "ionic-angular/components/loading/loading";

import { SignInModel } from "../auth.model";
import { SignUpComponent } from "../sign-up/sign-up.component";
import { SignInApiService } from "./sign-in-api.service";
import { ApiError } from "../../../../shared/error-handler/error-handler";
import { SessionInfoService } from "../../../../shared/session-info/session-info.service";
import { NGXLogger } from "ngx-logger";
import { MainComponent } from "../../main/main.component";
import { errorMessageAnimation } from "../animation.const";

/**
 * Sign in component
 */
@Component({
    animations: [
        errorMessageAnimation
    ],
    selector: 'page-sign-in',
    templateUrl: 'sign-in.component.html',
})
export class SignInComponent implements OnInit {

    /**
     * Sign in model
     */
    public signInModel: SignInModel = {
        email: '',
        password: ''
    };

    /**
     * Set lock sign in status
     */
    public lockSignInUi: boolean;

    /**
     * Api error
     */
    public error: ApiError;

    /**
     * Reactive form instance for sign in
     */
    public signInForm: FormGroup;

    /**
     * Create SignInComponent with inject services
     * @param {NavController} _navCtrl Service to work with control
     * @param {FormBuilder} _formBuilder Standard angular formBuilder service
     * @param {LoadingController} _ladingService Service to work with loading controller
     * @param {SignInApiService} _signInApi Service to work with sign in api
     * @param {_sessionInfo} _sessionInfo Service to work with ionic storage
     * @param {NGXLogger} _logger Service to work with logger
     */
    public constructor(
        private _navCtrl: NavController,
        private _formBuilder: FormBuilder,
        private _ladingService: LoadingController,
        private _signInApi: SignInApiService,
        private _sessionInfo: SessionInfoService,
        private _logger: NGXLogger
    ) {
    }

    /**
     * Prepare form on init. See [ngOnInit]{@see OnInit#ngOnInit}
     */
    public ngOnInit() {
        this.signInForm = this._formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    /**
     * Sign in user
     */
    public signIn(): Promise<void> {
        this.lockSignInUi = true;
        const loading: Loading = this._ladingService.create({
            content: 'Loading...'
        });
        this.error = null;

        return loading.present()
            .then(() => this._signInApi.signInUser(this.signInModel))
            .then((token: string) => this._sessionInfo.setToken(token))
            .then(() => this._navCtrl.setRoot(MainComponent))
            .catch((error: ApiError) => {
                this.error = error;
                this._logger.error(error.message, error);
            })
            .then(() => {
                this.lockSignInUi = false;
                return loading.dismiss();
            });
    }

    /**
     * Navigate to sign in page
     */
    public navigateToSignUp(): Promise<void> {
        return this._navCtrl.push(SignUpComponent);
    }

    /**
     * Get error field status
     * @param {string} fieldName Field name
     * @param {string} error Field error
     * @returns {boolean} Field error status
     */
    public getErrorFieldStatus(fieldName: string, error: string): boolean {
        return this.signInForm.get(fieldName).hasError(error)
            && (this.signInForm.get(fieldName).dirty || this.signInForm.get(fieldName).touched);
    }
}
