import {Component, OnDestroy, OnInit} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {JsonPipe} from "@angular/common";
import {filter, Subscription} from "rxjs";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, OnDestroy {
  idToken?: string;
  accessToken?: string;
  sessionState?: string;
  private sub?: Subscription;

  constructor(
    private oAuthService: OAuthService,
  ) {
  }

  ngOnInit() {
    this.loadTokens();

    this.sub = this.oAuthService.events.pipe(
      filter(e => e.type === 'token_received')
    ).subscribe(e => this.loadTokens());
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  private loadTokens() {
    this.idToken = this.oAuthService.getIdToken();
    this.accessToken = this.oAuthService.getAccessToken();
    this.sessionState = sessionStorage.getItem("session_state") || undefined;
  }
}
