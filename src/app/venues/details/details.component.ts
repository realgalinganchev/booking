import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AvatarDialogComponent } from '../../avatar-dialog/avatar-dialog.component';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venues-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class VenuesDetailsComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;

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
    this.exampleForm = this.fb.group({
      name: [this.item.name, Validators.required],
      location: [this.item.location, Validators.required],
      music: [this.item.music, Validators.required],
      price: [this.item.price, Validators.required],
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.item.avatar = result.link;
      }
    });
  }

  onSubmit(value) {
    this.firebaseService.updateVenue(this.item.id, value)
      .then(
        res => {
          this.router.navigate(['/venues']);
        }
      );
  }

  delete() {
    this.firebaseService.deleteVenue(this.item.id)
      .then(
        res => {
          this.router.navigate(['/venues']);
        },
        err => {
          console.log(err);
        }
      );
  }

  cancel() {
    this.router.navigate(['/venues']);
  }

}