import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRestaurantUser, RestaurantUser } from '../restaurant-user.model';
import { RestaurantUserService } from '../service/restaurant-user.service';

@Injectable({ providedIn: 'root' })
export class RestaurantUserRoutingResolveService implements Resolve<IRestaurantUser> {
  constructor(protected service: RestaurantUserService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRestaurantUser> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((restaurantUser: HttpResponse<RestaurantUser>) => {
          if (restaurantUser.body) {
            return of(restaurantUser.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RestaurantUser());
  }
}
