'use strict';

import { AlertController, IonicModule, LoadingController } from "ionic-angular";
import { NgModule } from "@angular/core";

import { MainComponent } from "./main.component";
import { UserApiService } from "./user-api.service";

/**
 * Main module
 */
@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        IonicModule
    ],
    entryComponents: [
        MainComponent
    ],
    providers: [
        LoadingController,
        AlertController,
        UserApiService
    ]
})
export class MainModule {
}
