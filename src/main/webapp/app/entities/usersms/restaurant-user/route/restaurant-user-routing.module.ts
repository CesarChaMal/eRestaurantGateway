import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RestaurantUserComponent } from '../list/restaurant-user.component';
import { RestaurantUserDetailComponent } from '../detail/restaurant-user-detail.component';
import { RestaurantUserUpdateComponent } from '../update/restaurant-user-update.component';
import { RestaurantUserRoutingResolveService } from './restaurant-user-routing-resolve.service';

const restaurantUserRoute: Routes = [
  {
    path: '',
    component: RestaurantUserComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RestaurantUserDetailComponent,
    resolve: {
      restaurantUser: RestaurantUserRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RestaurantUserUpdateComponent,
    resolve: {
      restaurantUser: RestaurantUserRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RestaurantUserUpdateComponent,
    resolve: {
      restaurantUser: RestaurantUserRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(restaurantUserRoute)],
  exports: [RouterModule],
})
export class RestaurantUserRoutingModule {}
