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
  // items: Array<any>;
  items: any;
  priceFilteredItems: Array<any>;
  nameFilteredItems: Array<any>;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    public db: AngularFirestore,
  ) { }

  ngOnInit() {
    this.getData();
  }
///ngOnChanges or ngDoCheck
  getData() {
    this.db.collection('users').doc(firebase.auth().currentUser.uid)
      .get()
      .toPromise()
      .then((doc) => {
        if (doc.exists) {
          this.items = (doc.data().favourites);
          // console.log(this.items);
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
        return  favourite.nameToSearch === nameToSearch;
      });
      const currentUserRef = this.db.collection('users').doc(firebase.auth().currentUser.uid);
      currentUserRef.update({
        favourites: firebase.firestore.FieldValue.arrayRemove(data[0])
      });
    });
  }
}

