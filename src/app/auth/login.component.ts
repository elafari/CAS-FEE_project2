import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../shared/auth.service";

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  myForm:FormGroup;
  error = false;

  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private router:Router
  ) {}

  onLogin() {
    this.authService.loginUser(this.myForm.value);

    /* todo: Login error abfangen */
    // hier wird auch nach einem fehlerhaften Login weitergeroutet ..
    this.router.navigate(['/patients']);
  };

  ngOnInit():any {
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


}
