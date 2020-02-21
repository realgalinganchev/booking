import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateEventComponent implements OnInit {

  exampleForm: FormGroup;
  avatarLink = 'https://i.pinimg.com/280x280_RS/8e/7c/08/8e7c086dec4bf5fe8101440c26b21870.jpg';

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
      { type: 'required', message: 'Price is required.' },
    ]
  };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  resetFields() {
    this.avatarLink = 'https://i.pinimg.com/280x280_RS/8e/7c/08/8e7c086dec4bf5fe8101440c26b21870.jpg';
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });
  }

  onSubmit(value) {
    this.firebaseService.createEvent(value, this.avatarLink)
      .then(
        res => {
          this.resetFields();
          this.router.navigate(['/events']);
        }
      );
  }
}
