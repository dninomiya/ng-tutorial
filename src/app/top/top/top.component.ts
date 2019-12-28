import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from 'src/app/login-dialog/login-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { DemoService } from 'src/app/demo.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  demo = this.demoService.demo;
  user$ = this.authService.user$;
  user: {
    name: string;
    email: string;
    admin: boolean;
    createdAt: Date;
    likeCount: number;
    likeIds: string[];
  };

  posts$: any = this.db.collection(`posts`).valueChanges();

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private demoService: DemoService,
    private db: AngularFirestore
  ) {
    this.authService.confirmEmailSignIn();
  }

  ngOnInit() {
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent);
  }

  setLog(uid: string) {
    this.authService.setLastCheckId(uid);
  }
}
