import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: Observable<firebase.User>;
  userLoggedIn = {};

  constructor(private router: Router, private flashMessage: FlashMessagesService, private angularFireAuth: AngularFireAuth, private authService: AuthService) {
    this.user = angularFireAuth.authState;
  }

  ngOnInit() {
  }

  login() {
    this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.flashMessage.show('You have logged out', {cssClass: 'alert-success', timeout: 3000});
    this.angularFireAuth.auth.signOut();
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You have logged out', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/']);
    return false;
  }

}
