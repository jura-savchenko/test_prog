'use strict';

import { enableProdMode } from "@angular/core";

/**
 * Application constants
 */
export const CONSTANTS: { BACKEND_URL: string } =
    {
        BACKEND_URL: enableProdMode() ? '/api/' : 'http://localhost:8888/api/'
    };
