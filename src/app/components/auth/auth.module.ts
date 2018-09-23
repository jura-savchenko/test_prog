'use strict';

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AlertController, IonicApp, IonicModule, LoadingController } from "ionic-angular";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { SignInApiService } from "./sign-in/sign-in-api.service";
import { SignUpApiService } from "./sign-up/sign-up-api.service";
import { SessionInfoModule } from "../../../shared/session-info/session-info.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

/**
 * Authenticate module
 */
@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent
    ],
    imports: [
        BrowserModule,
        IonicModule,
        FormsModule,
        HttpModule,
        SessionInfoModule,
        BrowserAnimationsModule
    ],
    bootstrap: [
        IonicApp
    ],
    entryComponents: [
        SignInComponent,
        SignUpComponent
    ],
    providers: [
        LoadingController,
        AlertController,
        SignInApiService,
        SignUpApiService
    ]
})
export class AuthModule {}
