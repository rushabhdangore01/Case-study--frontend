import { Component, OnInit,Input } from '@angular/core';
import { User } from '../user';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { TokenStorageService } from '../token-storage.service';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userlogin = {

    username:'',

    password:''

  }

  /*form: any = {
    username: null,
    password: null
  };*/
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  //-----------------------
  @Input() user:any=new User('','');
  

  constructor(private authService : AuthService, private tokenStorage: TokenStorageService, private router : Router) { }


  

   ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    } else {
      this.isLoggedIn = false;
      this.roles = [];
    }
   }

   onClickSubmit(): void {
    if (!this.userlogin.username) {
      alert('UserName is Required!');
      return;
    }
    
    if (!this.userlogin.password) {
      alert('Password is Required!');
      return;
    }
    
    this.authService.login(this.userlogin).subscribe(
      (data) => {
        console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        console.log(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        alert('You have successfully logged in as ' + this.roles);
        this.router.navigate(['home']).then(() => {
          window.location.reload();
        });
        this.authService.setLoggedIn(true);
      },
      (error: any) => {
        console.error(error);
        if (error.status === 401) {
          alert('Invalid UserName or Password.');
        }
      }
    );
  }
  
  
    logout(): void {
      this.tokenStorage.signOut();
      this.router.navigate(['/login']);
      this.authService.setLoggedIn(false);
    }
    
    

}