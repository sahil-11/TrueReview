import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellerService } from '../../services/seller.service';
import { PageEvent } from '@angular/material/paginator';
import { ReviewItems, ReviewModel } from 'src/app/shared/models/reviewModel';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  shopName: string = 'HELLO';
  length = 50;
  pageSize = 5;
  pageIndex = 1;

  hidePageSize = true;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent;
  reviewList: ReviewItems[];
  circleColor: string;
  shopImgUrl: string;
  private colors = [
    '#EB7181', // red
    '#468547', // green
    '#FFD558', // yellow
    '#3670B2', // blue
  ];
  constructor(
    private activeRoute: ActivatedRoute,
    private service: SellerService
  ) {}
  ngOnInit(): void {
    const id = this.activeRoute.snapshot.params?.['id'];

    if (id) {
      this.service.getReviews(id).subscribe({
        next: (res) => {
          if (res.success === true) {
            this.length = res.count;
            this.pageIndex = res.pages;
            this.reviewList = res.reviews;
          }
        },
        error: (error) => {
          console.log(error);
        },
      });

      this.service.getShop(id).subscribe({
        next: (res) => {
          this.shopName = res.shop.shopName;
          this.shopImgUrl = res.shop.imageUrl[0];
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  getInitials(username: string): string {
    const randomIndex = Math.floor(
      Math.random() * Math.floor(this.colors.length)
    );
    this.circleColor = this.colors[randomIndex];

    const user = username.split(' ');
    return user[0].substring(0, 1) + user[1].substring(0, 1);
  }
}
