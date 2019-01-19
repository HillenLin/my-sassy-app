import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from "rxjs/operators";
import { BarsModel, ApiUrl } from 'src/models/bars';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  GetEndPoint(): Observable<BarsModel> {
    return this.http.get<BarsModel>(`${ApiUrl}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof ErrorEvent) {
      let errMessage = '';
      try {
        errMessage = error.error.message;
      } catch (err) {
        errMessage = error.statusText;
      }
      return Observable.throw(errMessage);
    }
  }

}
