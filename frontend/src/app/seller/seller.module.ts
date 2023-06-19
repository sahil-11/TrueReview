import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ReviewsComponent],
  imports: [CommonModule, SellerRoutingModule, SharedModule],
})
export class SellerModule {}
