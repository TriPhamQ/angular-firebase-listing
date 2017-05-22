import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;
  userFirebase: Object;

  constructor(private router: Router, private authService: AuthService, private angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
    if (!JSON.parse(localStorage.getItem('user')).additionalUserInfo) {
      this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
      }, err => {
        console.log(err);
        return false;
      });
    }
    else {
      this.angularFireAuth.authState.subscribe(profile => {
        this.userFirebase = profile;        
      }, err => {
        console.log(err);
        return false;
      })
    }
  }

}
