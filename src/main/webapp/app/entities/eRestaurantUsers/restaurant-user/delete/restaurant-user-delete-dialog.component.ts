import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRestaurantUser } from '../restaurant-user.model';
import { RestaurantUserService } from '../service/restaurant-user.service';

@Component({
  templateUrl: './restaurant-user-delete-dialog.component.html',
})
export class RestaurantUserDeleteDialogComponent {
  restaurantUser?: IRestaurantUser;

  constructor(protected restaurantUserService: RestaurantUserService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.restaurantUserService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
