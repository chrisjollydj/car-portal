import { Component } from '@angular/core';
import { SocialAuthService, SocialUser, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user!: SocialUser;
  loggedIn!: boolean;

  constructor(private authService: SocialAuthService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      
      this.loggedIn = (user != null);
      console.log(user, this.loggedIn);

      if(this.loggedIn) {
        this.router.navigateByUrl('dashboard');
        localStorage.setItem('loggedIn', 'true');
        this.openSnackBar(`Logged in as ${user.name}`);
      }
    });
  }

  signOut(): void {
    this.authService.signOut();
    localStorage.removeItem('loggedIn');
    this.router.navigateByUrl('login');
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, 'Ok', {
      duration: 2000
    });
  }
}
