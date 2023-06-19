import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
  @Input() name: string;
  @Input() category: string;
  @Input() location: string;
  @Input() imageUrl: string;
  @Input() _id: string;

  isHovered = false;

  onCardHover(hovered: boolean): void {
    this.isHovered = hovered;
  }
}
