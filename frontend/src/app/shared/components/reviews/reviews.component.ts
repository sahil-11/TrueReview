import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ReviewItems, ReviewModel } from '../../models/reviewModel';
import { ShopsService } from '../../services/shop/shops.service';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { SessionService } from '../../services/session/session.service';
import { ReviewService } from '../../services/review/review.service';
// import { UidDialogComponent } from '../uid-dialog/uid-dialog.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit, AfterViewInit {
  // @ViewChild('templateRef') templateRef: MatDialog;
  dialogData: { name: string; uid: string | null; review: string } = {
    name: '',
    uid: '',
    review: '',
  };
  shopName: string = 'HELLO';
  length = 50;
  pageSize = 5;
  pageIndex = 1;
  data = { uid: '', name: '', review: '' };

  hidePageSize = true;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent;
  reviewList: ReviewItems[];
  circleColor: string;
  sessionData: any;
  isAuthenticated = false;
  role: string | null = null;
  shopId: string;
  private colors = [
    '#EB7181', // red
    '#468547', // green
    '#FFD558', // yellow
    '#3670B2', // blue
    '#ff9933', // saffron
  ];
  constructor(
    private activeRoute: ActivatedRoute,
    private service: ShopsService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private session: SessionService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.params?.['id'];
    this.sessionData = this.fetchSession();
    console.log(this.sessionData);
    if (this.sessionData !== null) {
      this.role = this.sessionData.role;
      this.isAuthenticated = this.sessionData.isAuthenticated;
    }

    if (id) {
      this.fetchReviews(id);
      this.fetchShop(id);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const randomIndex = Math.floor(
        Math.random() * Math.floor(this.colors.length)
      );
      this.circleColor = this.colors[randomIndex]; // Update the property inside setTimeout
    }, 0); // Update the property value
    this.cdr.detectChanges(); // Call detectChanges()
  }

  fetchReviews(id: any) {
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
  }

  fetchShop(id: any) {
    this.service.getShop(id).subscribe({
      next: (res) => {
        this.shopName = res.shop.shopName;
        this.shopId = res.shop._id;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  getInitials(
    username: string,
    i: number
  ): { initials: string; color: string } {
    // const randomIndex = Math.floor(
    //   Math.random() * Math.floor(this.colors.length)
    // );

    const user = username.split(' ');
    return {
      initials: user[0].substring(0, 1) + user[1].substring(0, 1),
      color: this.colors[i],
    };
  }

  openModal(templateRef: any) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '250px',

      data: this.dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result, '---result');
      console.log('The dialog was closed');
      this.dialogData.name = '';
      // this.animal = result;
    });
  }

  onCancelClick(): void {
    this.dialog.closeAll();
  }

  addUID(uid: string | null) {
    if (uid !== null && uid !== '') {
      console.log('sendUID');
      this.reviewService.addUID(uid, this.sessionData.token).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  fetchSession() {
    return this.session.getSession();
  }

  getColor() {
    const randomIndex = Math.floor(
      Math.random() * Math.floor(this.colors.length)
    );
    this.circleColor = this.colors[randomIndex];
    return this.circleColor;
  }

  addReview(uid: string, review: string) {
    console.log(this.shopId);
    if (uid !== '' && review !== '') {
      console.log('sendUID');
      this.reviewService
        .addReview(uid, review, this.sessionData.token, this.shopId)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
}
