import { Component } from '@angular/core';
import { CommentService } from './services/comment.service';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  comments$ = this.commentService.getComments();
  moreItems$: Observable<{
    docs: any[];
    lastDoc: QueryDocumentSnapshot<any>;
  }>;

  constructor(
    private commentService: CommentService
  ) {

  }

  testAlert(event) {
    alert(event);
  }

  getMore(startAfter: QueryDocumentSnapshot<any>) {
    this.moreItems$ = this.commentService.getComments(
      startAfter
    );
  }
}
