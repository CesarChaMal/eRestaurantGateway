import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICompositePermission, getCompositePermissionIdentifier } from '../composite-permission.model';

export type EntityResponseType = HttpResponse<ICompositePermission>;
export type EntityArrayResponseType = HttpResponse<ICompositePermission[]>;

@Injectable({ providedIn: 'root' })
export class CompositePermissionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/composite-permissions', 'erestaurantadmin');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(compositePermission: ICompositePermission): Observable<EntityResponseType> {
    return this.http.post<ICompositePermission>(this.resourceUrl, compositePermission, { observe: 'response' });
  }

  update(compositePermission: ICompositePermission): Observable<EntityResponseType> {
    return this.http.put<ICompositePermission>(
      `${this.resourceUrl}/${getCompositePermissionIdentifier(compositePermission) as string}`,
      compositePermission,
      { observe: 'response' }
    );
  }

  partialUpdate(compositePermission: ICompositePermission): Observable<EntityResponseType> {
    return this.http.patch<ICompositePermission>(
      `${this.resourceUrl}/${getCompositePermissionIdentifier(compositePermission) as string}`,
      compositePermission,
      { observe: 'response' }
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ICompositePermission>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICompositePermission[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCompositePermissionToCollectionIfMissing(
    compositePermissionCollection: ICompositePermission[],
    ...compositePermissionsToCheck: (ICompositePermission | null | undefined)[]
  ): ICompositePermission[] {
    const compositePermissions: ICompositePermission[] = compositePermissionsToCheck.filter(isPresent);
    if (compositePermissions.length > 0) {
      const compositePermissionCollectionIdentifiers = compositePermissionCollection.map(
        compositePermissionItem => getCompositePermissionIdentifier(compositePermissionItem)!
      );
      const compositePermissionsToAdd = compositePermissions.filter(compositePermissionItem => {
        const compositePermissionIdentifier = getCompositePermissionIdentifier(compositePermissionItem);
        if (compositePermissionIdentifier == null || compositePermissionCollectionIdentifiers.includes(compositePermissionIdentifier)) {
          return false;
        }
        compositePermissionCollectionIdentifiers.push(compositePermissionIdentifier);
        return true;
      });
      return [...compositePermissionsToAdd, ...compositePermissionCollection];
    }
    return compositePermissionCollection;
  }
}
