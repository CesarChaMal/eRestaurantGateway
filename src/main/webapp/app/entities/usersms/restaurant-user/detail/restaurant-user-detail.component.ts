import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRestaurantUser } from '../restaurant-user.model';

@Component({
  selector: 'jhi-restaurant-user-detail',
  templateUrl: './restaurant-user-detail.component.html',
})
export class RestaurantUserDetailComponent implements OnInit {
  restaurantUser: IRestaurantUser | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ restaurantUser }) => {
      this.restaurantUser = restaurantUser;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
