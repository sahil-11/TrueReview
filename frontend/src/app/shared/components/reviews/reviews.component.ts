import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ReviewItems, ReviewModel } from '../../models/reviewModel';
import { ShopsService } from '../../services/shop/shops.service';
import { MatDialog } from '@angular/material/dialog';

import { SessionService } from '../../services/session/session.service';
import { ReviewService } from '../../services/review/review.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/common';

interface ShopImg {
  url: string;
  index: number;
}
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
  length: number;
  pageSize = 5;
  pageIndex = 0;
  data = { uid: '', name: '', review: '' };

  hidePageSize = true;
  showPageSizeOptions = true;
  showFirstLastButtons = false;
  disabled = false;

  pageEvent: PageEvent;
  reviewList: ReviewItems[];
  circleColor: string;
  sessionData: any;
  isAuthenticated = false;
  role: string | null = null;
  shopId: string;
  shopImgUrl: string;
  shopImages: ShopImg[];
  addImg = false;
  files: any[] = [];
  imageUploadSuccess = false;
  imageUrl: string;
  selectedFile: File;
  uploadingImg = false;
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  index: null | number = null;
  currentId: null | string = null;
  rating: number;
  isImageLoaded = false;
  palette: any;
  backgroundcolor: string;
  userRatingValue: number | null = null;

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;
  @ViewChild('imageElement', { static: false }) imageElement: ElementRef;
  private colors = [
    '#EB7181', // red
    '#468547', // green
    '#FFD558', // yellow
    '#3670B2', // blue
    '#ff9933', // saffron
    '#781C08',
  ];
  constructor(
    @Inject(DOCUMENT) private _document: any,
    private activeRoute: ActivatedRoute,
    private service: ShopsService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private session: SessionService,
    private reviewService: ReviewService,
    private snackbarService: SnackbarService,
    public fireStorage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.params?.['id'];
    this.sessionData = this.fetchSession();
    if (this.sessionData !== null) {
      this.role = this.sessionData.role;
      this.isAuthenticated = this.sessionData.isAuthenticated;
    }
    this.shopImages = [];
    if (id) {
      this.currentId = id;
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

    // Call the color extraction function once the image is rendered
  }

  fetchReviews(id: any) {
    const params = {
      pageSize: this.pageSize,
      pageIndex: this.pageIndex + 1,
    };
    this.service.getReviews(id, params).subscribe({
      next: (res) => {
        if (res.success === true) {
          this.length = res.count;
          this.pageIndex = res.pageIndex - 1;
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
        console.log(res);
        this.shopId = res.shop._id;
        console.log(this.shopId, '--------shopId');
        this.mapShopImages(res.shop.imageUrl);
        console.log(res.rating);
        this.rating = res.rating;
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
    this.fetchReviews(this.shopId);
  }

  getInitials(
    username: string,
    i: number
  ): { initials: string; color: string } {
    const user = username.split(' ');
    return {
      initials: user[0].substring(0, 1) + user[1].substring(0, 1),
      color: this.colors[i],
    };
  }

  openModal(templateRef: any) {
    this.dialogData.name = this.shopName;
    let dialogRef = this.dialog.open(templateRef, {
      width: '50vw',
      height: '70vh',

      data: this.dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.dialogData.name = '';
      this.dialogData.uid = '';
      this.dialogData.review = '';
      this.userRatingValue = null;

      // this.animal = result;
    });
  }

  onCancelClick(): void {
    this.dialog.closeAll();
  }

  addUID(uid: string | null) {
    if (uid !== null && uid !== '') {
      this.reviewService.addUID(uid, this.sessionData.token).subscribe({
        next: (response) => {
          this.snackbarService.showSuccessMessage('UID added');
        },
        error: (error) => {
          this.snackbarService.showErrorMessage(
            error.error.error + '! Try Again'
          );
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
    if (uid !== '' && review !== '') {
      console.log(this.shopId, '---------------------insideadreview');
      this.reviewService
        .addReview(
          uid,
          review,
          this.sessionData.token,
          this.shopId,
          this.userRatingValue!
        )
        .subscribe({
          next: (response) => {
            this.fetchReviews(this.shopId);
            this.snackbarService.showSuccessMessage(
              'Review Added Successfully'
            );
          },
          error: (error) => {
            console.log(error);
            this.snackbarService.showErrorMessage(error.error.error);
          },
        });
    }
  }

  showDropBox() {
    this.addImg = true;
    this.index = null;
  }

  cancel() {
    this.addImg = false;
    this.uploadingImg = false;
    this.index = null;
  }

  //File Upload
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onFileChange(pFileList: any) {
    this.files = Object.keys(pFileList).map((key: any) => pFileList[key]);
    this.uploadImage();
  }

  onFileChanges(file: any) {
    this.onFileChange(file?.files);
  }

  uploadImage = async () => {
    let file = this.files[0];

    if (file) {
      this.uploadingImg = true;
      const path = `shops/${file.name}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      console.log(url, this.index);
      if ((url && this.index) || this.index === 0) {
        this.editImage(url, this.index);
      } else if (url) {
        this.imageUploadSuccess = true;
        this.addImage(url);
      }
    }
  };

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    const slideEvents = JSON.stringify(slideEvent);
    console.log(slideEvents);
    const imageIndex = parseInt(slideEvent.current.replace('slideId_', ''), 10);

    // this.getColorPalate(this.shopImages[imageIndex].url);

    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }

  mapShopImages(ImageUrlArr: any) {
    this.shopImages = ImageUrlArr.map((url: string, index: number) => ({
      url,
      index: index,
    }));
    // this.getColorPalate(this.shopImages[0].url);
  }

  addImage(url: string) {
    this.service
      .addImage({ shopId: this.shopId, url: url }, this.sessionData.token)
      .subscribe({
        next: (response) => {
          this.mapShopImages(response.imageUrl);
          this.uploadingImg = false;
          this.addImg = false;
          this.snackbarService.showSuccessMessage('Photo added SucessFully');
        },
        error: (error) => {
          console.log(error);
          this.snackbarService.showSuccessMessage(error.error.error);
        },
      });
  }
  updateImage(index: number) {
    this.index = index;
    this.addImg = true;
    console.log(index);
    console.log(this.index);
  }

  editImage(url: string, index: number) {
    this.service
      .editImage({ shopId: this.shopId, url, index }, this.sessionData.token)
      .subscribe({
        next: (response) => {
          this.mapShopImages(response.imageUrl);
          this.uploadingImg = false;
          this.addImg = false;
          this.snackbarService.showSuccessMessage('Photo added SucessFully');
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  //Imageloader ShimmerEffect
  imageLoaded(event: any) {
    this.isImageLoaded = true;
  }

  //getting rendered Images Color Pallete
  // async getColorPalate(url: string) {
  //   const colorThief = new ColorThief();
  //   const dominantColor = await colorThief.getColorAsync(url);
  //   const palette = await colorThief.getPaletteAsync(url, 5);

  //   // console.log(dominantColor);
  //   // console.log(palette);
  //   // this.setbackgroudColor(dominantColor);
  // }

  // setbackgroudColor(color: any) {
  //   this.backgroundcolor = color;
  //   this._document.body.style.backgroundcolor = color;
  // }

  // ngOnDestroy() {
  //   // remove the class form body tag
  //   // this._document.body.style.backgroundcolor = '#fff';
  // }
  userRating(rating: number) {
    this.userRatingValue = rating;
  }
}
