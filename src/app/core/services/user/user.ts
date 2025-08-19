import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {UserType} from '../../interfaces/user/user-type';

@Injectable({
  providedIn: 'root'
})
export class User {

  httpClient = inject(HttpClient);

  getUser(token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<UserType>('http://localhost:8080/api/user', {headers}).pipe(
      catchError(error => {
        console.error('Errore:', error);
        return throwError(() => new Error('Unable to find user'));
      })
    );
  }


}
