import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

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

}
