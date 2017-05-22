import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  listings: FirebaseListObservable<any[]>;
  listing: FirebaseObjectObservable<Listing>;
  folder: any;

  constructor(private angularFireDatabase: AngularFireDatabase) {
    this.folder = 'listingimages';
    this.listings = this.angularFireDatabase.list('/listings') as FirebaseListObservable<Listing[]>;
  }

  getListings() {
    return this.listings;
  }
  getListingDetails(id) {
    this.listing = this.angularFireDatabase.object('/listings/' + id) as FirebaseObjectObservable<Listing>;
    return this.listing;
  }
  addListing(addListing: Listing){
    // Create root ref
    let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
      if (selectedFile) {
        let path = `/${this.folder}/${selectedFile.name}`;
        let iRef = storageRef.child(path);
        iRef.put(selectedFile).then((snapshot) => {
          addListing.image = selectedFile.name;
          addListing.path = path;
          return this.listings.push(addListing);
        });
      }
      else {
        let database = firebase.database().ref('listings');
        return database.push(addListing);
      }
    }
  }
  updateListing(listingKey, listing) {
    return this.listings.update(listingKey, listing);
  }
  deleteListing(listingKey) {
    return this.listings.remove(listingKey);
  }

}

interface Listing {
  $key?: string;
  title?: string;
  type?: string;
  image?: string;
  city?: string;
  owner?: string;
  bedrooms?: string;
  price?: string;
  path?: string;
}