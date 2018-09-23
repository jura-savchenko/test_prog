'use strict';

import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SignInComponent } from "./components/auth/sign-in/sign-in.component";
import { SessionInfoService } from "../shared/session-info/session-info.service";
import { MainComponent } from "./components/main/main.component";

/**
 * Application component
 */
@Component({
    templateUrl: 'app.html'
})
export class ApplicationComponent implements OnInit {

    /**
     * Application root page
     */
    rootPage: any;

    /**
     * Create Application module
     * @param {Platform} _platform Service to work with platform
     * @param {StatusBar} _statusBar Service to work with status bar
     * @param {SplashScreen} _splashScreen Service to work with ionic splash screen
     * @param {SessionInfoService} _sessionInfo Service to work with ionic storage
     */
    constructor(
        private _platform: Platform,
        private _statusBar: StatusBar,
        private _splashScreen: SplashScreen,
        private _sessionInfo: SessionInfoService
    ) {

    }

    /**
     * Prepare data on init
     * @returns {Promise<void>}
     */
    public ngOnInit(): Promise<void> {
        return this._platform.ready().then(() => {
            this._statusBar.styleDefault();
            this._splashScreen.hide();
        })
            .then(() => this._sessionInfo.getToken())
            .then((token: string) => token? MainComponent : SignInComponent)
            .then((page: any) => this.rootPage = page)
            .catch(() => this.rootPage = SignInComponent)
    }
}
