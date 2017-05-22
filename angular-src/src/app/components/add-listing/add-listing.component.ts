import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { FirebaseService } from '../../services/firebase.service';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  title: string;
  city: string;
  owner: string;
  bedrooms: string;
  type: string;
  price: string;
  image: any;

  constructor(private router: Router, private flashMessage: FlashMessagesService, private firebaseService: FirebaseService, private validateService: ValidateService) { }

  ngOnInit() {
  }

  onAddSubmit() {
    let listing = {
      title: this.title,
      city: this.city,
      owner: this.owner,
      bedrooms: this.bedrooms,
      type: this.type,
      price: this.price
    };

    // Validate fields
    if (!this.validateService.validateAddListing(listing)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    };

    this.firebaseService.addListing(listing);
    this.router.navigate(['listings'])
  }

}
