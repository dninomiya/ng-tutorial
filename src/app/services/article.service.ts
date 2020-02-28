import { Observable } from 'rxjs';
import { Article } from './../interfaces/article';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private db: AngularFirestore) {}

  getArticle(id: string): Observable<Article> {
    return this.db.doc<Article>(`articles/${id}`).valueChanges();
  }
}
