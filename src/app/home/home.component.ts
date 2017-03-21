import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  config: Object = {
    paginationClickable: true,
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30,
    loop: true,
    autoplay: 6000,
    autoplayDisableOnInteraction: false,
    preloadImages: false,
    lazyLoading: true,
    lazyLoadingInPrevNext: true,
    lazyLoadingInPrevNextAmount: 1
  };

  images: string[] = [
    'assets/carousel/img1.webp',
    'assets/carousel/img2.webp',
    'assets/carousel/img3.webp',
  ];

  constructor() { }

  ngOnInit() {
  }

}
