import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
