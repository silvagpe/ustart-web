import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public isLoggedIn: boolean = false;
  public isCollapsed: boolean = false;
  constructor(private authService: AuthService) {
    this.authService.isLoggedInChanged.subscribe(
      (loggedIn) => {
        this.isLoggedIn = loggedIn;        
      });
  }

  ngOnInit(): void {
  }

}
