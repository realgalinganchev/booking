import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class EventsDetailsComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;
  avatarLink: 'https://i.pinimg.com/280x280_RS/8e/7c/08/8e7c086dec4bf5fe8101440c26b21870.jpg';
  validationMessages = {
    name: [
      { type: 'required', message: 'Name is required.' }
    ],
    location: [
      { type: 'required', message: 'Location is required.' }
    ],
    date: [
      { type: 'required', message: 'Date is required.' }
    ],
    price: [
      { type: 'required', message: 'Price is required.' }
    ],
  };

  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = routeData.data;
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    });
  }

  createForm() {
    this.avatarLink = 'https://i.pinimg.com/280x280_RS/8e/7c/08/8e7c086dec4bf5fe8101440c26b21870.jpg';
    this.exampleForm = this.fb.group({
      name: [this.item.name, Validators.required],
      location: [this.item.location, Validators.required],
      date: [this.item.date, Validators.required],
      price: [this.item.price, Validators.required],
    });
  }

  onSubmit(value) {
    this.firebaseService.updateEvent(this.item.id, value)
      .then(
        res => {
          this.router.navigate(['/events']);
        }
      );
  }

  delete() {
    this.firebaseService.deleteEvent(this.item.id)
      .then(
        res => {
          this.router.navigate(['/events']);
        },
        err => {
          console.log(err);
        }
      );
  }

  cancel() {
    this.router.navigate(['/events']);
  }

}
