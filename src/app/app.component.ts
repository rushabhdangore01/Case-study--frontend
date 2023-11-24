import { Component,EventEmitter } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TekGain';
  
  loggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) {
    this.authService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.loggedIn = isLoggedIn;
    });
  }

  flag=false;
  ngOnInit(): void {
    
 //  fill the code
 
      
  }  
  
  onLogout(){

    this.tokenStorage.signOut();

    alert('You have logged out successfully');

    this.router.navigate(['login']).then(()=>{

      window.location.reload();

    });

  }
  
}