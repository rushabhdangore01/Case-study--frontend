import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { Associate } from './associate';
import { Admission } from './admission';
import { AssociateComponent } from './associate/associate.component';
import { AdmissionComponent } from './admission/admission.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  
 // { path: 'app', component: AppComponent },

  { path: 'course', component: CourseComponent },
  { path: 'course/addCourse', component: CourseComponent, data: { paramFlag: 1 } },
  { path: 'course/update', component: CourseComponent, data: { paramFlag: 2 } },
  { path: 'course/view', component: CourseComponent, data: { paramFlag: 3 } },
  { path: 'course/ratings', component: CourseComponent, data: { paramFlag: 4 } },
  { path: 'course/deactivate', component: CourseComponent, data: { paramFlag: 5 } },
  { path: 'course/viewAll', component: CourseComponent, data: { paramFlag: 6 } },
  { path: 'course/calculateAverageFeedback', component: CourseComponent, data: { paramFlag: 7 } },

  { path: 'associate', component: AssociateComponent },
  { path: 'associate/add', component: AssociateComponent, data: { paramFlag: 1 } },
  { path: 'associate/update', component: AssociateComponent, data: { paramFlag: 2 } },
  { path: 'associate/viewById', component: AssociateComponent, data: { paramFlag: 3 } },
  { path:  'associate/viewAll',component: AssociateComponent, data: { paramFlag: 4 } },
  
  { path: 'admission', component: AdmissionComponent },
  { path: 'admission/registration', component: AdmissionComponent, data: { paramFlag: 1 } },
  { path: 'admission/totalFees', component: AdmissionComponent, data: { paramFlag: 2 } },
  { path: 'admission/addFeedback', component: AdmissionComponent, data: { paramFlag: 3 } },
  { path: 'admission/highestFee', component: AdmissionComponent, data: { paramFlag: 4 } },
  { path: 'admission/viewFeedback', component: AdmissionComponent, data: { paramFlag: 5 } },
  { path: 'admission/deactivateAdmission', component: AdmissionComponent, data: { paramFlag: 6 } },
  { path: 'admission/viewAll', component: AdmissionComponent, data: { paramFlag: 7 } },
  { path: 'admission/makePayment', component: AdmissionComponent, data: { paramFlag: 8 } },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  loggedIn: boolean = false;
  
  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) {
    this.authService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.loggedIn = isLoggedIn;
    });
    if (!this.loggedIn) {
      this.router.navigate(['/login']);
    }
  }
}