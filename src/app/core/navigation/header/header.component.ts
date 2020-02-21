import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() SideNavigationToggle = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  // to be added
  logout() {
    this.router.navigate(['']);
  }
  onToggleOpenSidenav() {
    this.SideNavigationToggle.emit();

  }

}
