import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  userFirebase: Observable<firebase.User>;
  authToken: any;
  user: any;

  constructor(private router: Router, private angularFireAuth: AngularFireAuth, private authService: AuthService, private flashMessage: FlashMessagesService) {
    this.userFirebase = angularFireAuth.authState;
  }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['dashboard']);
      }
      else {
        this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['login']);
      }
    });
  }

  firebaseGoogleLogin() {
    this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user => {
      if (user) {
        this.authService.storeFirebaseUserData(user.credential.idToken, user);
        this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['dashboard']);
      }
      else {
        this.flashMessage.show("Wrong log in credentials", {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['login']);
      }
    });
  }

}
