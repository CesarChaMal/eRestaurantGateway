import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'restaurant-user',
        data: { pageTitle: 'eRestaurantGatewayApp.eRestaurantUsersRestaurantUser.home.title' },
        loadChildren: () =>
          import('./eRestaurantUsers/restaurant-user/restaurant-user.module').then(m => m.ERestaurantUsersRestaurantUserModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
