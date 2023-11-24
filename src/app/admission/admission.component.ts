import { Component, OnInit, Input,ViewChild  } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { AdmissionService } from '../admission.service';
import { Admission } from '../admission';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent implements OnInit {

  paymentLink: string = ''; 
  // registrationId:string='';	
  // courseId	:string='';
  // associateId:string=''	;
  fees:number=0;	
  feedback	:number=0;
   returnfees:number=0;
   message:string=''; 
   error:string=''; 
   //rating:number=0;
   returnCourseId:any='';
 // @Input() admission:any=new Admission('','','',0,'',0); 
 // admissionModel:any=new Admission('','','',0,'',0); 

@ViewChild('myForm') myForm: any;

 private roles: string[] = [];
 isLoggedIn = false;
 showRegistration = false;
 showCalculateFees = false;
 showAddFeedback = false;
 showHighestFee = false;
 showViewFeedbackById = false;
 showViewAll = false;
 showDeactivate = false;

 showAdmissionDetails=false;
   
 admission: any =
 {
  registrationId:'',
  courseId:'',
  associateId:'',
  fees:'',
  feedback:''
}
    admissionById:Array<Admission> = [];
    admissions: Array<any>=[];
   // feedbackArray:Array<Admission> = []; 
    AdmissionsArray= []; 
    paramFlag=1;
    sub:any="";

  

    flag1=0;
    flag2=0;
errorFlag= false;
  successFlag= true;
  //@Input()title:string='';

constructor(private admissionService: AdmissionService, private tokenStorage: TokenStorageService,private router: Router,private _Activatedroute:ActivatedRoute) { }

 ngOnInit() {
   this.sub = this._Activatedroute.queryParams.subscribe(params => {
    this.paramFlag = params['paramFlag'];

    this.admissionService.viewAll().subscribe(
      (response: any) => {
          this.admissionById=response;
        },
        (error) => {
          this.errorFlag=true;
          console.error(error);
        }
        );
  });


  this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.roles = user.roles;

      this.showRegistration = this.roles.includes('ROLE_USER');
      this.showCalculateFees = this.roles.includes('ROLE_ADMIN');
      this.showAddFeedback = this.roles.includes('ROLE_USER');
      this.showHighestFee = this.roles.includes('ROLE_ADMIN');
      this.showViewFeedbackById = this.roles.includes('ROLE_USER');
      this.showDeactivate = this.roles.includes('ROLE_ADMIN');
      this.showViewAll = this.roles.includes('ROLE_ADMIN');
  



    }

 
  

  
   
}

ngOnDestroy() {
   this.sub.unsubscribe();
  
}

 
 

registration(): void {
  this.admissionService.registration(this.admission).subscribe(data => {
      console.log(data);
      this.admissionService.viewAll().subscribe(
      (response: any) => {
          console.log(response);
          this.showAdmissionDetails=true;
          this.admissionById=response;
        },
        (error) => {
          this.errorFlag=true;
          console.error(error);
        }
        );
      
    
alert('Associate added successfully!');
 this.myForm.resetForm(); 
      });
  }

 
  totalFees(){
  this.admissionService.calculateFees(this.admission.associateId).subscribe(
       (response: any) => {
          console.log(response);
          this.fees= response;
          
    
          this.showAdmissionDetails = true;
          console.log('fees:', this.fees);
          this.errorFlag=false;
        },
        (error) => {
          console.error(error);
          this.errorFlag=true;
        }
      );
    
  //  fill the code
  }
 
  updateFeedback() : void {
  this.admissionService.updateFeedback(this.admission.registrationId,this.admission.feedback).subscribe(data=>{

       console.log(data);

       this.admissionService.viewAll().subscribe(
      (response: any) => {
          console.log(response);
          this.showAdmissionDetails=true;
          this.admissionById=response;
        },
        (error) => {
          this.errorFlag=true;
          console.error(error);
        }
        );
      
    
    this.errorFlag=false;
      alert('Feedback updated successfully!');
       this.myForm.resetForm(); 
    },
    (error) => {
      this.successFlag=false;
      this.errorFlag=true;
      console.error(error);
    }
    );
  
  //  fill the code
  
  }
 
  highestFee() : void {  
   
  //  fill the code
  this.admissionService.highestFeeForTheRegisteredCourse(this.admission.associateId).subscribe(
         (response: any) => {
          console.log(response);
          this.highestFee= response;
          
    
          this.showAdmissionDetails = true;
          console.log('highestFee:', this.highestFee);
          this.errorFlag=false;
        },
        (error) => {
          console.error(error);
          this.errorFlag=true;
           this.showAdmissionDetails = false;
        }
      );
  
  }
 
  viewFeedbackByCourseId(){
  
  this.admissionService.viewFeedbackByCourseId(this.admission.courseId).subscribe(
(response: any) => {
          console.log(response);
         
      
    
          this.feedback= response;
          
    
          this.showAdmissionDetails = true;
          console.log('feedback:', this.feedback);
          this.errorFlag=false;
        },
        (error) => {
          console.error(error);
          this.errorFlag=true;
        }
      );
      
  }


confirmDisableAdmission(): void {
    const confirmed = confirm('Are you sure you want to disable the admission?');
    if (confirmed) {
      this.deactivateAdmission();
    }
  }

  deactivateAdmission(){
    this.admissionService.deactivateAdmission(this.admission.courseId).subscribe(data=>{
      console.log(data);
      this.admissionService.viewAll().subscribe(
      (response: any) => {
          console.log(response);
          this.showAdmissionDetails=true;
          this.admissionById=response;
        },
        (error) => {
          this.errorFlag=true;
          console.error(error);
        }
        );
      
    
   this.errorFlag=false;
        alert('Course disabled successfully!')
        },
        (error) => {
          console.error(error);
          this.errorFlag=true;
        }
      );
  }

  viewAll(){
     this.admissionService.viewAll().subscribe(
      (response: any) => {
          console.log(response);
          this.showAdmissionDetails=true;
          this.admissionById=response;
        },
        (error) => {
          this.errorFlag=true;
          console.error(error);
           this.myForm.resetForm(); 
        }
        );
      
    }
    
    makePayment(): void {
      this.admissionService.makePayment(this.admission.registrationId).subscribe(
        (response) => {
          // Assuming the response is the payment link in plain text format
          console.log('Payment link:', response);
          // Open the payment link in a new tab
          window.open(response, '_blank');
        },
        (error) => {
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