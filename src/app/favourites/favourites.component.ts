import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase.service';
import { Router, Params } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  priceValue = 0;
  searchValue = '';

  items: any;
  priceFilteredItems: Array<any>;
  nameFilteredItems: Array<any>;
  avatarLink: string;
  noFavouritesLink : string;
  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    public db: AngularFirestore,
  ) { }

  ngOnInit() {
    this.getData();
  }


  getData() {
    this.avatarLink = 'https://a.wattpad.com/useravatar/Rachey_B.256.684953.jpg';
    // tslint:disable-next-line: max-line-length
    this.noFavouritesLink = 'https://d3vhc53cl8e8km.cloudfront.net/hello-staging/wp-content/uploads/2016/06/04224142/mag_mylifeasanintrovertedraver_720.jpg';
    this.db.collection('users').doc(firebase.auth().currentUser.uid)
      .get()
      .toPromise()
      .then((doc) => {
        if (doc.exists) {
          this.items = (doc.data().favourites);
          console.log(this.items);
        }
      }
      );
  }

  removeFromFavourites(nameToSearch: string) {
    const venueToBeRemoved = this.db.collection('users').doc(firebase.auth().currentUser.uid);
    venueToBeRemoved.get().toPromise().then(documentSnapshot => {
      const data = documentSnapshot.data().favourites;
      // console.log(`Retrieved data: ${JSON.stringify(data)}`);
      data.filter((favourite) => {
        return favourite.nameToSearch === nameToSearch;
      });
      const currentUserRef = this.db.collection('users').doc(firebase.auth().currentUser.uid);
      currentUserRef.update({
        favourites: firebase.firestore.FieldValue.arrayRemove(data[0])
      }).then(() => {
        this.getData();
      });

    });
    // let favouritesRef = this.db.ref(`users/${firebase.auth().currentUser.uid}`);
  }
}

