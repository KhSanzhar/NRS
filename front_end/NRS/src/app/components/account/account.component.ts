import {Component, OnInit} from '@angular/core';
import {User} from "../../modules/User";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{

  currentUser: User = {
    id: 0,
    user: '',
    image: ''
  }

  route: Router;
  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    this.route = router
  }
  ngOnInit() {
    this.userService.getUserInfo().subscribe(
      (user: User) => {
        this.currentUser = user;
      },
      error => {
        console.error('Failed to get current user: ', error);
      }
    )
  }

  // onUserImageSelected(event: Event) {
  //   const fileInput = event.target as HTMLInputElement;
  //
  //   if (fileInput.files && fileInput.files[0]) {
  //     const selectedFile = fileInput.files[0];
  //     // TODO: Upload the selectedFile to the server and update the currentUser.image property
  //   }
  // }

  onLogout() {
    this.authService.logout();
  }
}
