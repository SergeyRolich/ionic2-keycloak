/*
 * Copyright 2017 Red Hat, Inc. and/or its affiliates
 * and other contributors as indicated by the @author tags.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/// <reference path="keycloak.d.ts"/>

import { Injectable } from '@angular/core';

let Keycloak = require("./keycloak"); // load keycloak.js locally
type KeycloakClient = KeycloakModule.KeycloakClient;

@Injectable()
export class KeycloakService {
  static keycloakAuth: KeycloakClient = Keycloak({
    url: 'http://localhost:8080/auth',
    realm: 'demo',
    clientId: 'ionic',
  });

  static init(options?: any): Promise<any> {

    return new Promise((resolve, reject) => {
      KeycloakService.keycloakAuth.init(options)
        .success(() => {
          resolve();
        })
        .error((errorData: any) => {
          reject(errorData);
        });
    });
  }

  authenticated(): boolean {
    return KeycloakService.keycloakAuth.authenticated;
  }

  login(): Promise<any> {
    return new Promise((resolve, reject) => {
      KeycloakService.keycloakAuth.login()
        .success(() => {
          resolve();
        })
        .error((errorData: any) => {
          reject(errorData);
        });
    })
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      KeycloakService.keycloakAuth.logout()
        .success(() => {
          resolve();
        })
        .error((errorData: any) => {
          reject(errorData);
        });
    })
  }



  account() {
    KeycloakService.keycloakAuth.accountManagement();
  }

  register() {
    KeycloakService.keycloakAuth.register();
  }

  profile(): Promise<any> {
    return new Promise((resolve, reject) => {
      KeycloakService.keycloakAuth.loadUserProfile()
        .success((profile: any) => {
          resolve(profile);
        })
        .error((errorData: any) => {
          reject(errorData);
        });
    })
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (KeycloakService.keycloakAuth.token) {
        KeycloakService.keycloakAuth
          .updateToken(5)
          .success(() => {
            resolve(<string>KeycloakService.keycloakAuth.token);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      } else {
        reject('Not loggen in');
      }
    });
  }
}
