import { Component, OnInit } from '@angular/core';
import { locations, shops, categories } from '../../constants/constants';
import { Location } from '../../models/locationModel';
import { Category } from '../../models/categoryModel';
import { Shops } from '../../models/ShopsModel';
import { Shop } from '../../models/shopModel';
import { ShopsService } from '../../services/shop/shops.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
})
export class ShopsComponent implements OnInit {
  locations: Location[];
  categories: Category[];
  shopsArray: Shop[];
  categorySelected: string = '';
  locationSelected: string = '';
  pageIndex: number = 1;
  page: number = 1;
  totalCount: number;
  pageSize: number = 6;
  constructor(
    private service: ShopsService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const category = this.activatedRoute.snapshot.params['queryParams'];
    if (category !== undefined) {
      this.categorySelected = category;
    }
    this.categories = categories;
    this.locations = locations;
    this.fetchShops();
  }

  fetchShops() {
    const param = {
      location: this.locationSelected,
      category: this.categorySelected,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    };
    this.service.getShops(param).subscribe({
      next: (res) => {
        if (res.success === true) {
          this.shopsArray = res.shops;
          this.totalCount = res.count;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  seleted(event: any, controlName: string) {
    if (event.value === undefined && controlName === 'category') {
      this.categorySelected = '';
    }
    if (event.value === undefined && controlName === 'location') {
      this.locationSelected = '';
    }

    this.fetchShops();
  }

  onPageEvent(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.fetchShops();
  }
}
