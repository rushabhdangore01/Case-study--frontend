import { tap, delay } from 'rxjs/operators';
import { Injectable,EventEmitter } from '@angular/core';
import { User } from './user';
import { HttpClient,HttpErrorResponse,HttpHeaders,HttpResponse } from '@angular/common/http';
import { BehaviorSubject, observable, Observable, of,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

  import { Router } from '@angular/router';

//const AUTH_API = 'http://localhost:9098/app/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
   providedIn: 'root'
})
export class AuthService { 

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  

   token:any=[];
   logstatus:any = new EventEmitter<string>();
   
   constructor(private httpClient:HttpClient,private router:Router){
    const initialLoginStatus = false; // Update with your logic
    this.isLoggedInSubject.next(initialLoginStatus);
   }
   
  login(login:{username:any,password:any}):Observable<any>{

    return this.httpClient.post('http://localhost:9098/app/signin',login);
    
}
   
   getToken():any{
     
 //  fill the code
        return "";
   }
   
     
   logout(): void {
 
      
 //  fill the code
 
   }
   setLoggedIn(value: boolean): void {
    this.isLoggedInSubject.next(value);
  }
   
}