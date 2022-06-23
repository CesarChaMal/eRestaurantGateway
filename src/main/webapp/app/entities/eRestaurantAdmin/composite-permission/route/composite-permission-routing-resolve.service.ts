import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICompositePermission, CompositePermission } from '../composite-permission.model';
import { CompositePermissionService } from '../service/composite-permission.service';

@Injectable({ providedIn: 'root' })
export class CompositePermissionRoutingResolveService implements Resolve<ICompositePermission> {
  constructor(protected service: CompositePermissionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICompositePermission> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((compositePermission: HttpResponse<CompositePermission>) => {
          if (compositePermission.body) {
            return of(compositePermission.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CompositePermission());
  }
}
