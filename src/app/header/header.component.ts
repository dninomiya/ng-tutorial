import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Output() clickAction = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  login() {
    this.clickAction.emit('クリックされました');
  }

}
