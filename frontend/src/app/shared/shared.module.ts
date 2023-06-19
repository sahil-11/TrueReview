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

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    ShopComponent,
    ShopsComponent,
    ReviewsComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [MaterialModule, NavbarComponent],
})
export class SharedModule {}
