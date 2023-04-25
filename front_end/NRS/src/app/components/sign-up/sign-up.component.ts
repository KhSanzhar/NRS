import { Component } from '@angular/core';
import { RegisterService } from "../../services/register.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  username = '';
  password = '';

  router: Router;
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  constructor(private registrationService: RegisterService, router: Router) {
    this.router = router;
  }

  onSubmit() {
    this.registrationService.registerUser(this.username, this.password).subscribe(
      (response) => {
        this.navigateTo('/sign-in');
      },
      (error) => {
        console.error(error);
      }
    )
  }
}
