import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private db: AngularFirestore
  ) { }

  getComments(startAfter?: QueryDocumentSnapshot<any>): Observable<{
    docs: any[];
    lastDoc: QueryDocumentSnapshot<any>;
  }> {
    return this.db.collection('comments', ref => {
      let rule = ref.orderBy('createdAt').limit(2);

      if (startAfter) {
        rule = rule.startAfter(startAfter);
      }

      return rule;
    }).snapshotChanges().pipe(
      map(actions => {
        return {
          docs: actions.map(doc => doc.payload.doc.data()),
          lastDoc: actions[actions.length - 1].payload.doc
        };
      })
    );
  }
}
