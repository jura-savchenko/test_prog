'use strict';

import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Loading } from "ionic-angular/components/loading/loading";
import { Alert } from "ionic-angular/components/alert/alert";
import { NGXLogger } from "ngx-logger";

import { SignUpModel } from "../auth.model";
import { SignUpApiService } from "./sign-up-api.service";
import { ApiError } from "../../../../shared/error-handler/error-handler";
import { SessionInfoService } from "../../../../shared/session-info/session-info.service";
import { MainComponent } from "../../main/main.component";
import { errorMessageAnimation } from "../animation.const";

/**
 * Sign up component
 */
@Component({
    animations: [
        errorMessageAnimation
    ],
    selector: 'page-sign-up',
    templateUrl: 'sign-up.component.html',
})
export class SignUpComponent implements OnInit {

    /**
     * Sign in model
     */
    public signUpModel: SignUpModel = {
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
        surname: '',
        birthday: ''
    };

    /**
     * Set lock sign in status
     */
    public lockSignUpUi: boolean;

    /**
     * Reactive form instance for sign in
     */
    public signUpForm: FormGroup;

    /**
     * Api error
     */
    public error: ApiError;

    /**
     * Create SignInComponent with inject services
     * @param {NavController} _navCtrl Service to work with control
     * @param {FormBuilder} _formBuilder Standard angular formBuilder service
     * @param {LoadingController} _ladingService Service to work with loading controller
     * @param {AlertController} _alertController Service to work with ionic alert control
     * @param {SessionInfoService} _sessionInfo Service to work with ionic storage
     * @param {NGXLogger} _logger Service to work with logger
     * @param {SignUpApiService} _signUp Service to work with sign up api
     */
    public constructor(
        private _navCtrl: NavController,
        private _formBuilder: FormBuilder,
        private _ladingService: LoadingController,
        private _alertController: AlertController,
        private _signUp: SignUpApiService,
        private _sessionInfo: SessionInfoService,
        private _logger: NGXLogger
    ) { }

    /**
     * Prepare form on init. See [ngOnInit]{@see OnInit#ngOnInit}
     */
    public ngOnInit() {
        this.signUpForm = this._formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            name: ['', Validators.compose([Validators.required])],
            surname: ['', Validators.compose([Validators.required])],
            confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(7)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(7)])],
            birthday: ['', Validators.compose([Validators.required])]
        });
        this.lockSignUpUi = false;
    }

    /**
     * Sign in user
     */
    public signUp(): Promise<void> {
        this.lockSignUpUi = true;
        const loading: Loading = this._ladingService.create({
            content: 'Loading...'
        }),
        alert: Alert = this._alertController.create({
            subTitle: 'Password does not match',
            buttons: ['OK']
        });

        if(this.signUpModel.confirmPassword !== this.signUpModel.password){
            return  alert.present()
                .then(() => {
                    this.signUpForm.get('password').reset();
                    this.signUpForm.get('confirmPassword').reset();
                    this.lockSignUpUi = false;
                })
        }

        return loading.present()
            .then(() => {
                return this._signUp.signUpUser(this.signUpModel)
            })
            .then((token: string) => this._sessionInfo.setToken(token))
            .then(() => this._navCtrl.setRoot(MainComponent))
            .catch((error: ApiError) => {
                this.error = error;
                this._logger.error(error.message, error);
            })
            .then(() => {
                this.lockSignUpUi = false;
                return loading.dismiss();
            })
    }

    /**
     * Get error field status
     * @param {string} fieldName Field name
     * @param {string} error Field error
     * @returns {boolean} Field error status
     */
    public getErrorFieldStatus(fieldName: string, error: string): boolean{
        return this.signUpForm.get(fieldName).hasError(error)
            && (this.signUpForm.get(fieldName).dirty || this.signUpForm.get(fieldName).touched);
    }

    /**
     * Return to previous page
     */
    public back(): Promise<void> {
        return this._navCtrl.pop();
    }
}
