import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, finalize } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


    public isBusy = false;
    constructor(
    private http: HttpClient
    ) { }

    public Login(username:string, password:string) {
          console.log("hol")
        let url = `${environment.urlApi}Login`;
    
        //if (this.dataProvider.currentWf && this.dataProvider.currentWf[guid]) {
       
        //}
        const body={

            UserName:username,
            Password:password
        }
    
        this.isBusy = true;
    
        const options = {
          headers: new HttpHeaders({
            'Authorization': `Basic`,
            'Content-Type': 'application/json',
            //'Context': `${this.dataProvider.context}`,
            //'Lang': `${this.dataProvider.lang}`
          })
        };

    
        return this.http.post<any>(url, body, options).pipe(
            map(response => {
              return response;
            }),
            catchError(error => {
              console.error('Error:', error);
              throw error;
            }),
            finalize(() => {
              this.isBusy = false;
            })
          );


      }

}


