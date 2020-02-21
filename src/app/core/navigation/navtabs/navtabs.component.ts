import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navtabs',
  templateUrl: './navtabs.component.html',
  styleUrls: ['./navtabs.component.scss']
})
export class NavtabsComponent implements OnInit {

  customersUid: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.customersUid = firebase.auth().currentUser.uid;
  }

}
