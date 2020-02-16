import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-events-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class EventsListComponent implements OnInit {

  priceValue = 0;
  searchValue = '';
  items: Array<any>;
  priceFilteredItems: Array<any>;
  nameFilteredItems: Array<any>;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.firebaseService.getEvents()
    .subscribe(result => {
      this.items = result;
      this.priceFilteredItems = result;
      this.nameFilteredItems = result;
    });
  }

  viewDetails(item) {
    this.router.navigate(['/events/details/' + item.payload.doc.id]);
  }

  capitalizeFirstLetter(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName() {
    const value = this.searchValue.toLowerCase();
    this.firebaseService.searchEvents(value)
    .subscribe(result => {
      this.nameFilteredItems = result;
      this.items = this.combineLists(result, this.priceFilteredItems);
    });
  }

  rangeChange(event) {
    this.firebaseService.searchEventsByPrice(event.value)
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

