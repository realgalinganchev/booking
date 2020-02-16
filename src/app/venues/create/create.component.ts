import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AvatarDialogComponent } from '../../avatar-dialog/avatar-dialog.component';
import { Router } from '@angular/router';
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'app-create-venue',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateVenueComponent implements OnInit {

  exampleForm: FormGroup;
  avatarLink = 'https://media-cdn.tripadvisor.com/media/photo-s/01/3d/58/c7/dancing-to-billy-jean.jpg';

  validationMessages = {
    name: [
      { type: 'required', message: 'Name is required.' }
    ],
    location: [
      { type: 'required', message: 'Location is required.' }
    ],
    music: [
      { type: 'required', message: 'Music is required.' }
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
      music: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.avatarLink = result.link;
      }
    });
  }

  resetFields() {
    this.avatarLink = 'https://media-cdn.tripadvisor.com/media/photo-s/01/3d/58/c7/dancing-to-billy-jean.jpg';
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      music: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });
  }

  onSubmit(value) {
    this.firebaseService.createVenue(value, this.avatarLink)
      .then(
        res => {
          this.resetFields();
          this.router.navigate(['/venues']);
        }
      );
  }

}
