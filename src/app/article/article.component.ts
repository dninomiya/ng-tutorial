import { Article } from './../interfaces/article';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { ArticleService } from './../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { LikeService } from './../services/like.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  article$ = this.route.paramMap.pipe(
    switchMap(paramMap => {
      const id = paramMap.get('id');
      return this.articleService.getArticle(id);
    })
  );
  user$ = this.authService.user$;

  article: Article;
  articleId: string;
  likeCount: number;
  isLiked: boolean;
  sub = new Subscription();
  uid: string;
  isLiked$ = combineLatest([this.article$, this.user$]).pipe(
    switchMap(([article, user]) => {
      if (user) {
        return this.likeService.isLiked(article.id, user.id);
      } else {
        return of(false);
      }
    })
  );

  constructor(
    private likeService: LikeService,
    private articleService: ArticleService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sub.add(
      this.article$.subscribe(article => {
        if (this.articleId !== article.id) {
          this.likeCount = article.likeCount;
        }
        this.article = article;
        this.articleId = article.id;
      })
    );

    this.sub.add(this.isLiked$.subscribe(isLiked => (this.isLiked = isLiked)));

    this.sub.add(this.user$.subscribe(user => (this.uid = user && user.id)));
  }

  like() {
    if (this.uid) {
      this.isLiked = true;
      this.likeCount++;
      this.likeService.likeArticle(this.articleId, this.uid);
    } else {
      alert('ログインしてくださいダイアログ出す');
    }
  }

  unlike(uid: string) {
    if (this.uid) {
      this.isLiked = false;
      this.likeCount--;
      this.likeService.unLikeArticle(this.articleId, uid);
    } else {
      alert('ログインしてくださいダイアログ出す');
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
