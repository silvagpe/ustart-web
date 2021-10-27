import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isCollapsed: boolean = false;
  public isLoggedIn: boolean = false;
  public username: string;

  constructor(
    private router: Router,
    private authService: AuthService) {
    this.authService.isLoggedInChanged.subscribe(
      (loggedIn) => {
        this.isLoggedIn = loggedIn;
        if (this.isLoggedIn == false) {

          this.username = '';
          this.router.navigateByUrl('login', { replaceUrl: true });          
        } 
        else{
          this.username = this.authService.userName;
        }
        
        // else {
        //   this.username = this.authService.userName;
        //   this.router.navigateByUrl('/', { replaceUrl: true });
        // }
      });
  }

  public logout(): void {
    this.authService.signOut();
  }
}
