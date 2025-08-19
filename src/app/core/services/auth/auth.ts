import {computed, effect, inject, Injectable, signal} from "@angular/core";
import {RegisterUserRequest} from '../../interfaces/auth/register-user-request';
import {catchError, Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginUserRequest} from '../../interfaces/auth/login-user-request';
import {LoginUserResponse} from '../../interfaces/auth/login-user-response';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private toastrService = inject(ToastrService);
  token = signal<string | null>(null);
  isLoggedIn = computed(() => !!this.token());
  private httpClient = inject(HttpClient);

  constructor() {
    this.monitorTokenWithEffect();
  }

  setToken(token: string) {
    this.token.set(token);
    this.toastrService.success('Login effettuato con successo', 'Successo!');
  }

  logout() {
    this.token.set(null);
    this.toastrService.success('Logout effettuato con successo', 'Successo!');
  }

  registerUser(registerUserRequest: RegisterUserRequest): Observable<void> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpClient
      .post<void>('http://localhost:8080/api/auth/register', registerUserRequest, {headers})
      .pipe(
        catchError((error) => {
          console.error('Errore durante la registrazione:', error);
          return throwError(() => new Error('Unable to register user'));
        })
      );
  }

  loginUser(loginRequest: LoginUserRequest): Observable<LoginUserResponse> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpClient
      .post<LoginUserResponse>('http://localhost:8080/api/auth/login', loginRequest, {headers})
      .pipe(
        catchError((error) => {
          console.error('Errore durante il login:', error);
          return throwError(() => new Error('Unable to login user'));
        })
      );
  }

  private monitorTokenWithEffect() {
    effect(() => {
      const currentToken = this.token();
      if (!currentToken) {
        this.logout();
      }
    });
  }
}
