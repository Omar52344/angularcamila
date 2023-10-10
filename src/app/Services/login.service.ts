import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


    public isBusy = false;
    constructor(
    private http: HttpClient
    ) { }

    public Login(username:string, password:string) {

        let url = `${environment.urlApi}Login`;
    
        //if (this.dataProvider.currentWf && this.dataProvider.currentWf[guid]) {
       
        //}
    
        this.isBusy = true;
    
        const options = {
          headers: new HttpHeaders({
            //'Authorization': `Basic ${this.dataProvider.token}`,
            'Content-Type': 'application/json',
            //'Context': `${this.dataProvider.context}`,
            //'Lang': `${this.dataProvider.lang}`
          })
        };
    
        return this.http.get(url, options).pipe(map((response: Response) => {
          return response;
        }), finalize(() => {
          this.isBusy = false;
        }));
      }

}


