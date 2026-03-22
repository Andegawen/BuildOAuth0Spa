import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, JsonPipe],
  template: `
    @if (auth.isLoading$ | async) {
      <p>Loading...</p>
    } @else if (auth.isAuthenticated$ | async) {
      @if (auth.user$ | async; as user) {
        <p>Logged in as {{ user.email }}</p>
        <h1>User Profile</h1>
        <pre>{{ user | json }}</pre>
      }
      <button (click)="logout()">Logout</button>
    } @else {
      @if (auth.error$ | async; as error) {
        <p>Error: {{ error.message }}</p>
      }
      <button (click)="signup()">Signup</button>
      <button (click)="login()">Login</button>
    }
  `,
  styles: [],
})
export class App {
  protected readonly auth = inject(AuthService);

  login() {
    this.auth.loginWithRedirect();
  }

  signup() {
    this.auth.loginWithRedirect({
      authorizationParams: { screen_hint: 'signup' },
    });
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}
