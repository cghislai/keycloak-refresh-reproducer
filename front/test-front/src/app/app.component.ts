import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'test-front';
  loggedIn: boolean = false;
  userName?: string;

  constructor(
    private oAuthService: OAuthService,
  ) {
  }

  async ngOnInit() {
    await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
    this.loggedIn = this.oAuthService.getAccessToken() != null;
    const claims = this.oAuthService.getIdentityClaims();
    this.userName = claims ? claims['sub'] : undefined;
  }

  onLogoutClick() {
    const idTOken = this.oAuthService.getIdToken();
    this.oAuthService.logOut({
      'id_token_hint': idTOken
    });
  }

  onLoginClick() {
    this.oAuthService.initLoginFlow();
  }
}
