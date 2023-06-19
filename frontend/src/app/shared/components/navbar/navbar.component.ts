import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() authenticated: boolean;
  // @Input() role: string | null;
  @Output() logout: EventEmitter<boolean> = new EventEmitter();

  isAuthenticated: boolean = false;
  role: string | null;
  username: string | null;
  constructor(private router: Router, private session: SessionService) {}

  ngOnInit() {
    this.session.getAuthenticatedUser().subscribe((_data) => {
      this.isAuthenticated = _data.isAuthenticated;
      this.role = _data.role;
      this.username = _data.username;
    });
  }

  navigateToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  Logout() {
    this.logout.emit(true);
  }
}
