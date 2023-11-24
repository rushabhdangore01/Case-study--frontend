import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AssociateService } from '../associate.service';
import { Associate } from '../associate';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {
/*
  associateId:string='';
  associateName:string='';
  associateAddress:string='';
  associateEmailId:string='';*/
@ViewChild('myForm') myForm: any;



  private roles: string[] = [];
  isLoggedIn = false;
  showAddAssociate = false;
  showUpdateAssociate = false;
  showAssociateById= false;
  showViewAll=false;
  showAssociateDetails=false;
  

   message:string=''; 
   error:string='';

 
 //@Input() associate:any=new Associate('','','',''); 
 //associateModel:any=new Associate('','','',''); 

 associate: any =

    {
        associateId:'',
        associateName:'',
        associateAddress:'',
        associateEmailId:''


    }

  associates: Array<any>=[];
 associatesById: Array<Associate>=[];
 associateById: Array<Associate>=[];
 paramFlag=1;
 sub:any="";
errorFlag= false;
  successFlag= true;
 flag1=0;
  flag2=0;

   constructor(private associateService: AssociateService,private router: Router,private _Activatedroute:ActivatedRoute, private storageService: TokenStorageService) { }
 
 ngOnInit() {

  
    this.associateService.viewAll().subscribe(
      (response: any) => {
          console.log(response);
          this.associatesById=response;

          console.log('associate',this.associatesById);
          
         
      })




this.isLoggedIn = !!this.storageService.getToken();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAddAssociate = this.roles.includes('ROLE_ADMIN');
      this.showUpdateAssociate = this.roles.includes('ROLE_USER');
      this.showAssociateById = this.roles.includes('ROLE_USER');
      this.showViewAll = this.roles.includes('ROLE_ADMIN');
    


    }

  
  this.sub = this._Activatedroute.queryParams.subscribe(params => {
    this.paramFlag = params['paramFlag'];
  });

}
 
 
   // instructorNames =[];
 

 //@Input()title:string='';

 


   //this.addAssociate();
   //this.updateAssociate();
   //this.viewAssociates();
 //  fill the code
  



ngOnDestroy() {
  this.sub.unsubscribe();
 //  fill the code
 
}

 
 
 
 addAssociate() : void {

  this.associateService.addAssociate(this.associate).subscribe(data=>{
      console.log(data);
        this.associateService.viewAll().subscribe(
      (response: any) => {
          console.log(response);
          this.showAssociateDetails=true;
          this.associatesById=response;
          this.myForm.resetForm();
        },
        (error) => {
          this.errorFlag=true;
          console.error(error);
        }
        );
    alert('Associate added successfully!');
    this.myForm.resetForm(); 
      });
 //  fill the code
 
 }


updateAssociate() : void {
 
  this.associateService.updateAssociate(this.associate.associateId,this.associate.associateAddress).subscribe(data=>{
    console.log(data);
      this.associateService.viewAll().subscribe(
      (response: any) => {
          console.log(response);
          this.showAssociateDetails=true;
          this.associatesById=response;
          this.myForm.resetForm();
        },
        (error) => {
          this.errorFlag=true;
          console.error(error);
        }
        );
  this.errorFlag=false;
      alert('Associate updated successfully!');
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

 viewByAssociateId() : void {
 
  this.associateService.viewByAssociateId(this.associate.associateId).subscribe(
     (response: any) => {
        console.log(response);
      
        const associate: Associate = new Associate(
          response.associateId,
          response.associateName,
          response.associateAddress,
          response.associateEmailId,
         
        );
  
        this.associatesById = [associate];
        this.showAssociateDetails = true;
        this.errorFlag = false;
        
      },
      (error) => {
        console.error(error);
        this.errorFlag = true;
      }
    );
    }

    viewAll() : void {
        this.associateService.viewAll().subscribe(
      (response: any) => {
          console.log(response);
          this.showAssociateDetails=true;
          this.associatesById=response;
          this.myForm.resetForm();
        },
        (error) => {
          this.errorFlag=true;
          console.error(error);
        }
        );
      
    }



 onLogout(){

    this.storageService.signOut();

    alert('You have logged out successfully');

    this.router.navigate(['login']).then(()=>{

      window.location.reload();

    });

  }

 //  fill the code
 
 
}