import { Injectable } from '@angular/core';

import { HttpClient,HttpErrorResponse,HttpHeaders,HttpInterceptor } from '@angular/common/http';
import { observable, Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})

export class AdmissionService {
returnMsg:any='';

ngOnInit() {
    
}

  constructor(private http: HttpClient,private authService:AuthService) { }


  registration(admission:{
    registrationId:any,
    courseId:any,
    associateId:any,
    fees:any,
    feedback:any
  },
  order = {
    // Define the properties of the Order object that match the backend's Order class
    // For example:
    price:100, // Replace with the actual price
    currency: 'USD', // Replace with the actual currency
    method: 'paypal', // Replace with the actual payment method
    intent: 'sale', // Replace with the actual intent
    description: 'Payment for course', // Replace with the actual description
  }
  ){

 //  fill the code
return this.http.post(`http://localhost:9093/admission/register/${admission.associateId}/${admission.courseId}`,admission);
  }

  calculateFees( associateId:any){
     
 //  fill the code
 
 return this.http.put(`http://localhost:9093/admission/calculateFees/${associateId}`,associateId);
  }

  updateFeedback( regNo:any,  feedback:any) {

   
 //  fill the code
return this.http.post(`http://localhost:9093/admission/feedback/${regNo}/${feedback}`,regNo ,feedback);
   }

  highestFeeForTheRegisteredCourse(associateId:any){

return this.http.get(`http://localhost:9093/admission/highestFee/${associateId}`,associateId);
 //  fill the code
  }

 viewFeedbackByCourseId( courseId:any){


 //  fill the code
 return this.http.get(`http://localhost:9093/admission/viewFeedbackByCourseId/${courseId}`,courseId);
 
 }

 deactivateAdmission(courseId:any){
  return this.http.delete(`http://localhost:9093/admission/deactivate/${courseId}`,courseId);
 }
 
 viewAll(): Observable<any> {
   
     
 //  fill the code
return this.http.get(`http://localhost:9093/admission/viewAll`);
  }


  makePayment(registrationId: any): Observable<string> {
    const order = {
      // Define the properties of the Order object that match the backend's Order class
      // For example:
      price: 200, // Replace with the actual price
      currency: 'USD', // Replace with the actual currency
      method: 'paypal', // Replace with the actual payment method
      intent: 'sale', // Replace with the actual intent
      description: 'Payment for course', // Replace with the actual description
    };

    return this.http.post('http://localhost:9093/admission/makePayment/' + registrationId, order, {
      responseType: 'text', // Specify responseType as 'text'
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}

  

   
