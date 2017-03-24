import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'nd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuIsVisible = false;

  constructor() { }

  ngOnInit() {
  }

  hideMenu() {
    this.menuIsVisible = false;
  }

  showMenu() {
    this.menuIsVisible = true;
  }
}
