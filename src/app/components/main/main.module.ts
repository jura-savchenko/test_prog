'use strict';

import { AlertController, IonicModule, LoadingController } from "ionic-angular";
import { NgModule } from "@angular/core";

import { MainComponent } from "./main.component";
import { UserService } from "./user.service";

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
        UserService
    ]
})
export class MainModule {
}
