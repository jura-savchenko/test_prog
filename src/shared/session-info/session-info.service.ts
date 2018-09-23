'use strict';

import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';

/**
 * Service to work with ionic storage
 */
@Injectable()
export class SessionInfoService {

    /**
     * Create SessionInfoService
     * @param {Storage} _storage Service to work with ionic storage
     */
    public constructor(
        private _storage: Storage
    ){}

    /**
     * Set token to storage
     * @param {string} token Token value
     * @returns {Promise<string>} Return when token setted
     */
    public setToken(token: string): Promise<string>{
        return this._storage.set('auth-token', token)
            .then(()=> token);
    }

    /**
     * Get token value
     * @returns {Promise<string>} Return token
     */
    public getToken(): Promise<string>{
        return this._storage.get('auth-token');
    }


    /**
     * Remove token from storage
     * @returns {Promise<string>} Return when token removed
     */
    public removeToken(): Promise<string>{
        return this._storage.remove('auth-token');
    }
}
