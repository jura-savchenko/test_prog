'use strict';

import { NgModule } from "@angular/core";
import { IonicStorageModule } from "@ionic/storage";

import { SessionInfoService } from "./session-info.service";

/**
 * Session info module
 */
@NgModule({
    imports:[
        IonicStorageModule
    ],
    providers:[
        SessionInfoService,
    ]
})
export class SessionInfoModule {}
