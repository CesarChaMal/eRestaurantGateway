import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CompositePermissionComponent } from '../list/composite-permission.component';
import { CompositePermissionDetailComponent } from '../detail/composite-permission-detail.component';
import { CompositePermissionUpdateComponent } from '../update/composite-permission-update.component';
import { CompositePermissionRoutingResolveService } from './composite-permission-routing-resolve.service';

const compositePermissionRoute: Routes = [
  {
    path: '',
    component: CompositePermissionComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CompositePermissionDetailComponent,
    resolve: {
      compositePermission: CompositePermissionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CompositePermissionUpdateComponent,
    resolve: {
      compositePermission: CompositePermissionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CompositePermissionUpdateComponent,
    resolve: {
      compositePermission: CompositePermissionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(compositePermissionRoute)],
  exports: [RouterModule],
})
export class CompositePermissionRoutingModule {}
