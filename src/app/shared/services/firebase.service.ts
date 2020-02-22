import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(public db: AngularFirestore) { }

    addToFavourites(venueKey, userKey) {
        return this.db.collection('venues').doc(venueKey).set({
            state: this.db.collection('users').doc(Object.assign({}, userKey)),
        });
    }
    getEvent(eventKey) {
        return this.db.collection('events').doc(eventKey).snapshotChanges();
    }
    getVenue(venueKey) {
        return this.db.collection('venues').doc(venueKey).snapshotChanges();
    }
    getUsersFavourites(userKey) {
        return this.db.collection('users').doc(userKey).snapshotChanges();
    }
    updateEvent(eventKey, value) {
        value.nameToSearch = value.name.toLowerCase();
        return this.db.collection('events').doc(eventKey).set(value);
    }
    updateVenue(venueKey, value) {
        value.nameToSearch = value.name.toLowerCase();
        return this.db.collection('venues').doc(venueKey).set(value);
    }
    deleteEvent(eventKey) {
        return this.db.collection('events').doc(eventKey).delete();
    }
    deleteVenue(venueKey) {
        return this.db.collection('venues').doc(venueKey).delete();
    }
    getEvents() {
        return this.db.collection('events').snapshotChanges();
    }
    getVenues() {
        return this.db.collection('venues').snapshotChanges();
    }
    getFavourites(userKey) {
        return this.db.collection('users').doc(userKey).snapshotChanges();
    }
    searchEvents(searchValue) {
        return this.db.collection('events', ref => ref.where('nameToSearch', '>=', searchValue)
            .where('nameToSearch', '<=', searchValue + '\uf8ff'))
            .snapshotChanges();
    }
    searchVenues(searchValue) {
        return this.db.collection('venues', ref => ref.where('nameToSearch', '>=', searchValue)
            .where('nameToSearch', '<=', searchValue + '\uf8ff'))
            .snapshotChanges();
    }
    searchEventsByPrice(value) {
        return this.db.collection('events', ref => ref.orderBy('price').endAt(value)).snapshotChanges();
    }
    searchVenuesByPrice(value) {
        return this.db.collection('venues', ref => ref.orderBy('price').endAt(value)).snapshotChanges();
    }

    createEvent(value, avatar) {
        return this.db.collection('events').add({
            name: value.name,
            nameToSearch: value.name.toLowerCase(),
            location: value.location,
            // tslint:disable-next-line: radix
            date: value.date,
            // tslint:disable-next-line: radix
            price: parseInt(value.price),
            avatar
        });
    }
    createVenue(value, avatar) {
        return this.db.collection('venues').add({
            name: value.name,
            nameToSearch: value.name.toLowerCase(),
            location: value.location,
            music: value.music,
            // tslint:disable-next-line: radix
            price: parseInt(value.price),
            avatar
        });
    }
    // id here is the unique firebase id for auth users
    createFavouritesProperty(id) {
        return this.db.collection('users').doc(id).set({
            favourites: [],
            loyaltyPoints: 0,
        });
    }
}
