import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  items = [
    {
      label: 'google',
      url: 'https://google.com'
    },
    {
      label: 'apple',
      url: 'https://apple.com'
    },
    {
      label: 'google',
      url: 'https://google.com'
    },
    {
      label: 'google',
      url: 'https://google.com'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
