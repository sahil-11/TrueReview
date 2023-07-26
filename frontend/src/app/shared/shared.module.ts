import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShopComponent } from './components/shop/shop.component';
import { ShopsComponent } from './components/shops/shops.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { FormsModule } from '@angular/forms';
import { CategoryCardComponent } from './category-card/category-card.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomSnackbarComponent } from './components/customsnackbar/custom-snackbar.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FileDragNDropDirective } from './directives/file-drag-n-drop.directive';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './components/loader/loader.component';
import { RatingComponent } from './components/rating/rating.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faStar,
  faStarHalfAlt,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    ShopComponent,
    ShopsComponent,
    ReviewsComponent,
    CategoryCardComponent,
    CustomSnackbarComponent,
    FileDragNDropDirective,
    DialogConfirmComponent,
    LoaderComponent,
    RatingComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule,
    NgxDropzoneModule,
    NgbCarouselModule,
    NgbRatingModule,
    BarRatingModule,
    FontAwesomeModule,
    NgxSkeletonLoaderModule,
  ],
  exports: [MaterialModule, NavbarComponent, LoaderComponent, RatingComponent],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faStar, faStarHalfAlt, farStar, faTimesCircle);
  }
}
