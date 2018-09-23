'use strict';

/**
 * Model for sign in user
 */
export interface SignInModel {

  /**
   * User email
   */
  email: string;

  /**
   * User password
   */
  password: string;

}

export interface SignUpModel extends SignInModel {

    /**
     * User name
     */
    name: string;

    /**
     * User surname
     */
    surname: string;

    /**
     * Confirm password field
     */
    confirmPassword: string;

    /**
     * User birthday
     */
    birthday: string;

}
