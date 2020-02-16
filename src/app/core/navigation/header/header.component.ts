import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() SideNavigationToggle = new EventEmitter();
  // get isLogged() { return this.userService.isLogged; }

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    // this.userService.logout();
    this.router.navigate(['']);
  }
  onToggleOpenSidenav() {

    this.SideNavigationToggle.emit();

  }

}
