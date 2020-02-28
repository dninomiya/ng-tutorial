import { Article } from './../interfaces/article';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
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
    switchMap(map => {
      const id = map.get('id');
      return this.articleService.getArticle(id);
    })
  );

  article: Article;
  articleId: string;
  likeCount: number;
  user$ = this.authService.user$;
  isLiked: boolean;
  sub = new Subscription();
  isLiked$ = combineLatest([this.article$, this.user$]).pipe(
    switchMap(([article, user]) => {
      return this.likeService.isLiked(article.id, user.id);
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
  }

  like(uid: string) {
    this.isLiked = true;
    this.likeCount++;
    this.likeService.likeArticle(this.articleId, uid);
  }

  unlike(uid: string) {
    this.isLiked = false;
    this.likeCount--;
    this.likeService.unLikeArticle(this.articleId, uid);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
