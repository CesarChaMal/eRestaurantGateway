import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CompositePermissionComponent } from './list/composite-permission.component';
import { CompositePermissionDetailComponent } from './detail/composite-permission-detail.component';
import { CompositePermissionUpdateComponent } from './update/composite-permission-update.component';
import { CompositePermissionDeleteDialogComponent } from './delete/composite-permission-delete-dialog.component';
import { CompositePermissionRoutingModule } from './route/composite-permission-routing.module';

@NgModule({
  imports: [SharedModule, CompositePermissionRoutingModule],
  declarations: [
    CompositePermissionComponent,
    CompositePermissionDetailComponent,
    CompositePermissionUpdateComponent,
    CompositePermissionDeleteDialogComponent,
  ],
  entryComponents: [CompositePermissionDeleteDialogComponent],
})
export class ERestaurantAdminCompositePermissionModule {}
