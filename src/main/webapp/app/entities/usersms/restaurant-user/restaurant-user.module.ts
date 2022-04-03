import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RestaurantUserComponent } from './list/restaurant-user.component';
import { RestaurantUserDetailComponent } from './detail/restaurant-user-detail.component';
import { RestaurantUserUpdateComponent } from './update/restaurant-user-update.component';
import { RestaurantUserDeleteDialogComponent } from './delete/restaurant-user-delete-dialog.component';
import { RestaurantUserRoutingModule } from './route/restaurant-user-routing.module';

@NgModule({
  imports: [SharedModule, RestaurantUserRoutingModule],
  declarations: [
    RestaurantUserComponent,
    RestaurantUserDetailComponent,
    RestaurantUserUpdateComponent,
    RestaurantUserDeleteDialogComponent,
  ],
  entryComponents: [RestaurantUserDeleteDialogComponent],
})
export class UsersmsRestaurantUserModule {}
