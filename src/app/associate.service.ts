import { Associate } from './associate';
import { Component, OnInit, Input,  } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders,HttpInterceptor } from '@angular/common/http';
import { observable, Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AssociateService {
  host:string='';
  token:any="";
  returnMsg:any='';
  constructor(private http: HttpClient,private authService:AuthService) { }

  addAssociate(associate:{
    associateId:any,
        associateName:any,
        associateAddress:any,
        associateEmailId:any

  }){
   
    
 //  fill the code
 return this.http.post(`http://localhost:9092/associate/addAssociate`,associate);
   }
 
  updateAssociate(associateId:any,associateAddress:any){
   
 //  fill the code
   return this.http.put(`http://localhost:9092/associate/updateAssociate/${associateId}/${associateAddress}`,associateId,associateAddress);
  }  

  viewByAssociateId(associateId:any){
  return this.http.get(`http://localhost:9092/associate/viewByAssociateId/${associateId}`,associateId);
   
 //  fill the code
      
    }


   viewAll(){
     
    //  fill the code
    return this.http.get(`http://localhost:9092/associate/viewAll`);
   }

}