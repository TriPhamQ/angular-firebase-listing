import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';

import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  listingKey: any;
  listing: any;
  imageUrl: any;

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.listingKey = this.activatedRouter.snapshot.params['listingKey'];
    this.firebaseService.getListingDetails(this.listingKey).subscribe(listing => {
      this.listing = listing;

      if (listing.path) {
        let storageRef = firebase.storage().ref();
        let spaceRef = storageRef.child(listing.path);
        storageRef.child(listing.path).getDownloadURL().then((url) => {
          this.imageUrl = url;
        }).catch((error) => {
          console.log(error);
        });
      }
    });
  }

  onDeleteClick() {
    this.firebaseService.deleteListing(this.listingKey);
    this.router.navigate(['/listings']);
  }

}
