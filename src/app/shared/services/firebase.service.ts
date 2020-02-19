import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(public db: AngularFirestore) { }

    getAvatars() {
        return this.db.collection('/avatar').valueChanges();
    }

    addToFavourites(venueKey, userKey) {
        return this.db.collection('venues').doc(venueKey).set({
            state: this.db.collection('users').doc(Object.assign({}, userKey)),
        });
    }
    getUser(userKey) {
        return this.db.collection('users').doc(userKey).snapshotChanges();
    }
    getEvent(eventKey) {
        return this.db.collection('events').doc(eventKey).snapshotChanges();
    }
    getVenue(venueKey) {
        return this.db.collection('venues').doc(venueKey).snapshotChanges();
    }
    getUsersFavourites(userKey){
        return this.db.collection('users').doc(userKey).snapshotChanges();
    }

    updateUser(userKey, value) {
        // value.nameToSearch = value.name.toLowerCase();
        return this.db.collection('users').doc(userKey).set(value);
    }
    updateEvent(eventKey, value) {
        value.nameToSearch = value.name.toLowerCase();
        return this.db.collection('events').doc(eventKey).set(value);
    }
    updateVenue(venueKey, value) {
        value.nameToSearch = value.name.toLowerCase();
        return this.db.collection('venues').doc(venueKey).set(value);
    }


    deleteUser(userKey) {
        return this.db.collection('users').doc(userKey).delete();
    }
    deleteEvent(eventKey) {
        return this.db.collection('events').doc(eventKey).delete();
    }
    deleteVenue(venueKey) {
        return this.db.collection('venues').doc(venueKey).delete();
    }

    getUsers() {
        return this.db.collection('users').snapshotChanges();
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

    searchUsers(searchValue) {
        return this.db.collection('users', ref => ref.where('nameToSearch', '>=', searchValue)
            .where('nameToSearch', '<=', searchValue + '\uf8ff'))
            .snapshotChanges();
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


    searchUsersByAge(value) {
        return this.db.collection('users', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
    }
    searchEventsByPrice(value) {
        return this.db.collection('events', ref => ref.orderBy('price').startAt(value)).snapshotChanges();
    }
    searchVenuesByPrice(value) {
        return this.db.collection('venues', ref => ref.orderBy('price').startAt(value)).snapshotChanges();
    }

    createUser(value, avatar) {
        return this.db.collection('users').add({
            name: value.name,
            nameToSearch: value.name.toLowerCase(),
            surname: value.surname,
            // tslint:disable-next-line: radix
            age: parseInt(value.age),
            avatar
        });
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
            // tslint:disable-next-line: radix
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
