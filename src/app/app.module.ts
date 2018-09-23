'use strict';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from "@ionic/storage";
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";

import { ApplicationComponent } from './app.component';
import { AuthModule } from "./components/auth/auth.module";
import { MainModule } from "./components/main/main.module";

/**
 * Application module
 */
@NgModule({
    declarations: [
        ApplicationComponent,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(ApplicationComponent),
        AuthModule,
        IonicStorageModule.forRoot(),
        LoggerModule.forRoot({level: NgxLoggerLevel.ERROR}),
        MainModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        ApplicationComponent
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
