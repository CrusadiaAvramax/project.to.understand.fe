import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {UserType} from '../../interfaces/user/user-type';

@Injectable({
  providedIn: 'root'
})
export class User {

  private httpClient = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/user';

  getUser(email: string): Observable<UserType> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Costruisci l'URL con il parametro query
    const url = `${this.apiUrl}?email=${encodeURIComponent(email)}`;

    return this.httpClient.get<UserType>(url, {headers}).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Errore nella richiesta HTTP:', error);
        let errorMessage = 'Unable to find user';
        if (error.error instanceof ErrorEvent) {
          // Errore lato client
          errorMessage = `Errore: ${error.error.message}`;
        } else {
          // Errore lato server
          errorMessage = `Errore ${error.status}: ${error.error?.message || error.message}`;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }


}
