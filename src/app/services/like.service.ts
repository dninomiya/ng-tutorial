import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  constructor(private db: AngularFirestore) {}

  likeArticle(articleId: string, userId: string) {
    return this.db.doc(`articles/${articleId}/likedUserIds/${userId}`).set({
      like: true
    });
  }

  unLikeArticle(articleId: string, userId: string) {
    return this.db.doc(`articles/${articleId}/likedUserIds/${userId}`).delete();
  }

  isLiked(articleId: string, userId: string): Observable<boolean> {
    return this.db
      .doc(`articles/${articleId}/likedUserIds/${userId}`)
      .valueChanges()
      .pipe(
        map(data => {
          return !!data;
        })
      );
  }
}
