import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from 'src/app/login-dialog/login-dialog.component';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  user: {
    name: string;
    email: string;
    admin: boolean;
    createdAt: Date;
    likeCount: number;
    likeIds: string[];
  };

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent);
  }

}
