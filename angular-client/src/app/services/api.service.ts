import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // TODO: Move this into resources
  private apiUrl = 'http://localhost:8080/';

  constructor(
    private http: HttpClient
  ) { }

  httpGetRequest(endpointUrl: string, options: any): Observable<any> {
    const requestUrl = this.apiUrl + endpointUrl;

    // const requestOptions = params ?
    //   { params: new HttpParams().set('name', term) } : {};
    return this.http.get<any>(requestUrl, options)
      .pipe(
        tap(data => console.log('get response loaded')),
        catchError(this.handleError('getItems', []))
      );
  }

  httpPutRequest(endpointUrl: string, data: any): Observable<any> {
    const requestUrl = this.apiUrl + endpointUrl;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.put<any>(requestUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError('putItem', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    // TODO: Log to a service
    console.error(message);
  }

}
