import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewsComponent } from './components/reviews/reviews.component';

const routes: Routes = [
  // { path: '', redirectTo: '/review/:id', pathMatch: 'prefix' },
  { path: 'review/:id', component: ReviewsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
