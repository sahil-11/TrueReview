import { Component, OnInit } from '@angular/core';
import { locations, shops, categories } from '../../constants/constants';
import { Location } from '../../models/locationModel';
import { Category } from '../../models/categoryModel';
import { Shops } from '../../models/ShopsModel';
import { Shop } from '../../models/shopModel';
import { ShopsService } from '../../services/shop/shops.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
})
export class ShopsComponent implements OnInit {
  locations: Location[];
  categories: Category[];
  shopsArray: Shop[];
  constructor(private service: ShopsService) {}
  ngOnInit(): void {
    // this.shopsArray = shops;
    this.categories = categories;
    this.locations = locations;
    this.fetchShops();
  }

  fetchShops() {
    const param = { location: '', category: '' };
    this.service.getShops(param).subscribe({
      next: (res) => {
        if (res.success === true) {
          this.shopsArray = res.shops;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
