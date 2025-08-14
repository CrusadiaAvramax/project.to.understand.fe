import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RegisterUserRequest} from '../interfaces/register-user-request';
import {catchError, Observable, throwError} from 'rxjs';
import {LoginUserRequest} from '../interfaces/login-user-request';
import {LoginUserResponse} from '../interfaces/login-user-response';

@Injectable({
  providedIn: 'root'
})
export class Utenti {

  httpClient = inject(HttpClient);


  registerUser(registerUserRequest: RegisterUserRequest): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log("Utenti Request", registerUserRequest)
    return this.httpClient.post<void>('http://localhost:8080/api/auth/register', registerUserRequest, {headers}).pipe(
      catchError(error => {
        console.error('Errore durante la registrazione:', error);
        return throwError(() => new Error('Unable to register user'));
      })
    );
  }

  loginUser(loginRequest: LoginUserRequest): Observable<LoginUserResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log("Utenti Request", loginRequest)
    return this.httpClient.post<LoginUserResponse>('http://localhost:8080/api/auth/login', loginRequest, {headers}).pipe(
      catchError(error => {
        console.error('Errore durante la registrazione:', error);
        return throwError(() => new Error('Unable to login user'));
      })
    );

  }
}
