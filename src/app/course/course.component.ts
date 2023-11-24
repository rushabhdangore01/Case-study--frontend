import { Component, OnInit, Input,ViewChild  } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../course';
import { TokenStorageService } from '../token-storage.service';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  /*courseId:string='';
  courseName:string='';
  fees:number=0;
  rating:number=0;
  duration:number=0;
  courseType:string='';*/
@ViewChild('myForm') myForm: any;




  message:string='';
  instructorNames:string='';
  error:string='';

  private roles: string[] = [];
  isLoggedIn = false;
  showAddCourse = false;
  showUpdateCourse = false;
  showViewCourseById = false;
  showRating = false;
  showDeactivateCourse = false;
  showViewAll = false;
  showCalculateAverageFeedback = false;
  feedbackRating:number=0;

  showCourseDetails=false;
  
 // @Input() //course:any=new Course('','',0,0,'',0); 
  //courseModel:any=new Course('','',0,0,'',0);  
  
  course: any =

    {

      courseId:'',
      courseName:'',
      fees:'',
      rating:'',
      duration:'',
      courseType:''

    }
  
  courses: Array<any>=[];
  courseById:Array<Course> = []; 
  ratings:Array<Course> = []; 
  coursArray:Array<Course>=[]; 
 
  flag1=0;
  flag2=0;
  paramFlag=1;
  sub:any="";
  errorFlag= false;
  successFlag= true;
  averageFeedback:number=0;

  //@Input()title:string='';

  constructor(private courseService: CourseService, private tokenStorage: TokenStorageService,private router: Router,private _Activatedroute:ActivatedRoute, private storageService: TokenStorageService) { }

  ngOnInit() {


    this.courseService.viewAll().subscribe(
      (response: any) => {
          console.log(response);
          this.coursArray=response;

          console.log('course',this.coursArray);
          
         
      })

 
    this.sub = this._Activatedroute.queryParams.subscribe(params => {
      this.paramFlag = params['paramFlag'];
    });
    
    this.isLoggedIn = !!this.storageService.getToken();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAddCourse = this.roles.includes('ROLE_ADMIN');
      this.showUpdateCourse = this.roles.includes('ROLE_ADMIN');
      this.showViewCourseById = this.roles.includes('ROLE_USER');
      this.showRating = this.roles.includes('ROLE_ADMIN');
      this.showDeactivateCourse = this.roles.includes('ROLE_ADMIN');
      this.showViewAll = this.roles.includes('ROLE_ADMIN'&&'ROLE_USER');
      this.showCalculateAverageFeedback = this.roles.includes('ROLE_ADMIN');
  
      
  


    }
    
 //  fill the code
 
 }

 ngOnDestroy() {
  this.sub.unsubscribe();
 //  fill the code
 
 }
 


  
  addCourse() {
    //if (this.paramFlag === 1) {
      this.courseService.addCourse(this.course).subscribe(data => {
        console.log(data);
        this.courseService.viewAll().subscribe(
      (response: any) => {
          console.log(response);
          this.showCourseDetails=true;
          this.courseById=response;
        },
        (error) => {
          this.errorFlag=true;
          console.error(error);
        }
        );
        alert('Course added successfully!');
        this.myForm.resetForm(); 
      });
      // Fill in the remaining code for adding a course
   // }
   
  }
 

updateCourse() : void {
  //if (this.paramFlag === 2) {
    this.courseService.updateCourse(this.course.courseId, this.course.fees).subscribe(data => {
      console.log(data);
      this.courseService.viewAll().subscribe(
      (response: any) => {
          console.log(response);
          this.showCourseDetails=true;
          this.courseById=response;
        },
        (error) => {
          this.errorFlag=true;
          console.error(error);
        }
        );
      this.errorFlag=false;
      alert('Course updated successfully!');
      this.myForm.resetForm(); 
    },
    (error) => {
      this.successFlag=false;
      this.errorFlag=true;
      console.error(error);
    }
    );
    // Fill in the remaining code for updating a course
 // }
  }

  
  viewCourseById(): void {
    this.courseService.viewCourseById(this.course.courseId).subscribe(
      (response: any) => {
        console.log(response);
  
        const course: Course = new Course(
          response.courseId,
          response.courseName,
          response.fees,
          response.duration,
          response.courseType,
          response.rating
        );
  
        this.courseById = [course];
        this.showCourseDetails = true;
        this.errorFlag = false;
        
      },
      (error) => {
        console.error(error);
        this.errorFlag = true;
      }
    );
  }
  

  viewRating() : void{
      this.courseService.viewRating(this.course.courseId).subscribe(
        (response: any) => {
          console.log(response);

         


          this.feedbackRating= response;
          
    
          this.showCourseDetails = true;
          console.log('feedbackRating:', this.feedbackRating);
          this.errorFlag=false;
         
        },
        (error) => {
          console.error(error);
          this.errorFlag=true;
        }
      );
      
  }

  disableCourse(): void {
    const confirmation = confirm('Are you sure you want to delete the course?');
    if (confirmation) {
      this.courseService.disableCourse(this.course.courseId).subscribe(
        (data) => {
          console.log(data);
  
          const viewAllSubscription = this.courseService.viewAll().subscribe(
            (response: any) => {
              console.log(response);
              this.showCourseDetails = true;
              this.courseById = response;
            },
            (error) => {
              this.errorFlag = true;
              console.error(error);
            }
          );
  
          this.errorFlag = false;
          alert('Course disabled successfully!');
          this.myForm.resetForm();
  
          viewAllSubscription.unsubscribe(); // Unsubscribe from viewAll() subscription
  
        },
        (error) => {
          console.error(error);
          this.errorFlag = true;
        }
      );
    }
  }
  

 viewAll() : void {
    this.courseService.viewAll().subscribe(
      (response: any) => {
          console.log(response);
          this.showCourseDetails=true;
          this.courseById=response;
          this.myForm.resetForm(); 
        },
        (error) => {
          this.errorFlag=true;
          console.error(error);
        }
        );
      
    }

    calculateAverageFeedback() : void {
          this.courseService.calculateAverageFeedback(this.course.courseId, this.course.rating).subscribe(
            (response: any) => {
              
              this.averageFeedback= response.rating;
              
        
              this.showCourseDetails = true;
            this.errorFlag=false;
           
          },
          (error) => {
            this.errorFlag=true;
            console.error(error);
          }
          );
        
      }

  onLogout(){

    this.tokenStorage.signOut();

    alert('You have logged out successfully');

    this.router.navigate(['login']).then(()=>{

      window.location.reload();

    });

  }

}