import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders,HttpInterceptor } from '@angular/common/http';
import { observable, Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  host:string='';
  token:any="";
  returnMsg:any='';
 
  ngOnInit() {
    
  }

  constructor(private http: HttpClient,private authService:AuthService) {
  }
  addCourse(course:{
    courseId:any,
      courseName:any,
      fees:any,
      rating:any,
      duration:any,
      courseType:any
  }){
   
  return this.http.post('http://localhost:9091/course/addCourse',course);
 //  fill the code
  }
 
  updateCourse(courseId:any,duration:any){
  
    //  fill the code
    return this.http.put(`http://localhost:9091/course/update/${courseId}/${duration}`,courseId,duration);
      }  
   


//}

     
    viewCourseById(courseId:any){
      return this.http.get(`http://localhost:9091/course/viewByCourseId/${courseId}`,courseId);
    }

    viewRating(courseId:any){
      return this.http.get(`http://localhost:9091/course/viewFeedbackRating/${courseId}`,courseId);
    }
   
   disableCourse(courseId:any){
     
    //  fill the code
    return this.http.delete(`http://localhost:9091/course/deactivate/${courseId}`,courseId);
   }

   viewAll(){
     
    //  fill the code
    return this.http.get(`http://localhost:9091/course/viewAll`);
   }

   calculateAverageFeedback(courseId:any, rating:any){
     
    //  fill the code
    return this.http.put(`http://localhost:9091/course/calculateAverageFeedback/${courseId}/${rating}`,courseId, rating);
   }


   

}