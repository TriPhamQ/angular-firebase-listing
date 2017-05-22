import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
  listingKey: string;
  title: string;
  type: string;
  image: string;
  city: string;
  owner: string;
  bedrooms: string;
  price: string;
  path: string;


  constructor(private router: Router, private activatedRouter: ActivatedRoute, private flashMessage: FlashMessagesService, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.listingKey = this.activatedRouter.snapshot.params['listingKey'];
    this.firebaseService.getListingDetails(this.listingKey).subscribe(listing => {
      this.title = listing.title;
      this.type = listing.type;
      this.city = listing.city;
      this.owner = listing.owner;
      this.bedrooms = listing.bedrooms;
      this.price = listing.price;
    });
  }

  onEditSubmit() {
    let listing = {
      title: this.title,
      type: this.type,
      city: this.city,
      owner: this.owner,
      bedrooms: this.bedrooms,
      price: this.price
    }

    this.firebaseService.updateListing(this.listingKey, listing);
    this.router.navigate(['/listings']);
  }

}
