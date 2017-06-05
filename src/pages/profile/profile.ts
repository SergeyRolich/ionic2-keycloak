import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirstRunPage } from '../pages';
import { KeycloakService } from '../../keycloak-service/keycloak.service'

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  name = '';
  email = '';
  username = '';

  constructor(public navCtrl: NavController,
    public keycloak: KeycloakService) {

    if (keycloak.authenticated()) {
      keycloak.profile()
        .then((profile: any) => {
          this.name = `${profile.lastName} ${profile.firstName}`;
          this.email = profile.email;
          this.username = profile.username;
        })
        .catch((error: any) => {
          console.log(error)
        });
    }

  }

  account() {
    this.keycloak.account();
  }

  logout() {
    this.keycloak.logout()
      .then(() => {
        console.log("logout")
        this.navCtrl.popToRoot();
      })
      .catch((error: any) => {
        console.log(error)
      });
  }


}
