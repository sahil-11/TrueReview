import { Component } from '@angular/core';
import { categories } from '../constants/constants';
import { Category } from '../models/categoryModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent {
  category: Category[];
  constructor(private router: Router) {}

  selectedCategory(value: string) {
    this.router.navigate([`shops`, { queryParams: value }]);
  }
}
