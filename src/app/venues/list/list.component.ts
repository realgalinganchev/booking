import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Router, Params } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-venues-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class VenuesListComponent implements OnInit {

  priceValue = 0;
  searchValue = '';
  items: Array<any>;
  priceFilteredItems: Array<any>;
  nameFilteredItems: Array<any>;
  customersUid: string;
  avatarLink = 'https://a.wattpad.com/useravatar/Rachey_B.256.684953.jpg';

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    public db: AngularFirestore,
  ) { }

  ngOnInit() {
    this.getData();
    this.customersUid = firebase.auth().currentUser.uid;
  }

  getData() {
    this.avatarLink = 'https://a.wattpad.com/useravatar/Rachey_B.256.684953.jpg';
    this.firebaseService.getVenues()
      .subscribe(result => {
        this.items = result;
        this.priceFilteredItems = result;
        this.nameFilteredItems = result;
      });
  }

  viewDetails(item) {
    this.router.navigate(['/venues/details/' + item.payload.doc.id]);
  }

  addVenueToFavourites(item) {
    const venueToBeAdded = this.db.collection('venues').doc(item.payload.doc.id);
    venueToBeAdded.get().toPromise().then(documentSnapshot => {
      const data = documentSnapshot.data();
      const currentUserRef = this.db.collection('users').doc(this.customersUid);
      currentUserRef.update({
        favourites: firebase.firestore.FieldValue.arrayUnion(data)
      });
    });
  }
  capitalizeFirstLetter(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName() {
    const value = this.searchValue.toLowerCase();
    this.firebaseService.searchVenues(value)
      .subscribe(result => {
        this.nameFilteredItems = result;
        this.items = this.combineLists(result, this.priceFilteredItems);
      });
  }

  rangeChange(venue) {
    this.firebaseService.searchVenuesByPrice(venue.value)
      .subscribe(result => {
        this.priceFilteredItems = result;
        this.items = this.combineLists(result, this.nameFilteredItems);
      });
  }

  combineLists(a, b) {
    const result = [];

    a.filter(x => {
      return b.filter(x2 => {
        if (x2.payload.doc.id === x.payload.doc.id) {
          result.push(x2);
        }
      });
    });
    return result;
  }

}

