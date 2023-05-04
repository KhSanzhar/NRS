import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../modules/User";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {

  constructor(public authService: AuthService, private userservice: UserService) {
  }

  logout(): void {
    this.authService.logout();
  }
}
