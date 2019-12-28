import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  emailControl = new FormControl('', [Validators.required]);

  constructor(
    private authSerivice: AuthService,
    private dialog: MatDialogRef<LoginDialogComponent>
  ) { }

  ngOnInit() {
  }

  login() {
    this.authSerivice.login().then(() => {
      this.dialog.close();
    });
  }

  loginWithEmail(email: string) {
    this.authSerivice.loginWithEmail(email)
      .then(() => {
        this.dialog.close();
      });
  }

}
