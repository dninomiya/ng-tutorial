import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user$: Observable<any>;
  userId: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {
    route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      this.user$ = this.userService.getUser(
        this.userId
      );
    });
  }

  ngOnInit() {
  }

  updateAvatar(event) {
    if (event.target.files.length) {
      const image = event.target.files[0];
      this.userService.updateAvatar(
        this.userId,
        image
      ).then(() => {
        this.snackBar.open('アップロードしました', null, {
          duration: 2000
        });
      });
    }
  }

}
