import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RegisterUserRequest} from '../interfaces/register-user-request';
import {catchError, Observable, throwError} from 'rxjs';

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


}
