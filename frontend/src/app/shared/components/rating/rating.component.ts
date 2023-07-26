import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  @Input() rate: number;
  @Input() readOnly = true;
  ratingArray: any[];

  @Output() userRating = new EventEmitter<number>();

  star = faStar;
  @Input() isModal: boolean = false;
  ngOnInit(): void {}

  updateRating(ratingValue: any) {
    this.userRating.emit(ratingValue);
  }
}
