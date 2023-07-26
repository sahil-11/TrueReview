import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { HomeComponent } from './shared/components/home/home.component';
import { ShopsComponent } from './shared/components/shops/shops.component';
import { ReviewsComponent } from './shared/components/reviews/reviews.component';
import { authGuard } from './mainservices/auth.guard';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
// import { ReviewsComponent } from './seller/components/reviews/reviews.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shops', component: ShopsComponent },
  { path: 'shops/:id', component: ReviewsComponent },
  { path: 'login', canActivate: [authGuard], component: LoginComponent },
  { path: 'register', canActivate: [authGuard], component: RegisterComponent },

  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'seller',
    loadChildren: () =>
      import('./seller/seller.module').then((m) => m.SellerModule),
  },
  { path: '**', component: NotfoundComponent },
  // { path: 'seller/review/:id', component: ReviewsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
