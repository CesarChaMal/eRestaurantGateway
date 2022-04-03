import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRestaurantUser, getRestaurantUserIdentifier } from '../restaurant-user.model';

export type EntityResponseType = HttpResponse<IRestaurantUser>;
export type EntityArrayResponseType = HttpResponse<IRestaurantUser[]>;

@Injectable({ providedIn: 'root' })
export class RestaurantUserService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/restaurant-users', 'usersms');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(restaurantUser: IRestaurantUser): Observable<EntityResponseType> {
    return this.http.post<IRestaurantUser>(this.resourceUrl, restaurantUser, { observe: 'response' });
  }

  update(restaurantUser: IRestaurantUser): Observable<EntityResponseType> {
    return this.http.put<IRestaurantUser>(`${this.resourceUrl}/${getRestaurantUserIdentifier(restaurantUser) as string}`, restaurantUser, {
      observe: 'response',
    });
  }

  partialUpdate(restaurantUser: IRestaurantUser): Observable<EntityResponseType> {
    return this.http.patch<IRestaurantUser>(
      `${this.resourceUrl}/${getRestaurantUserIdentifier(restaurantUser) as string}`,
      restaurantUser,
      { observe: 'response' }
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IRestaurantUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRestaurantUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRestaurantUserToCollectionIfMissing(
    restaurantUserCollection: IRestaurantUser[],
    ...restaurantUsersToCheck: (IRestaurantUser | null | undefined)[]
  ): IRestaurantUser[] {
    const restaurantUsers: IRestaurantUser[] = restaurantUsersToCheck.filter(isPresent);
    if (restaurantUsers.length > 0) {
      const restaurantUserCollectionIdentifiers = restaurantUserCollection.map(
        restaurantUserItem => getRestaurantUserIdentifier(restaurantUserItem)!
      );
      const restaurantUsersToAdd = restaurantUsers.filter(restaurantUserItem => {
        const restaurantUserIdentifier = getRestaurantUserIdentifier(restaurantUserItem);
        if (restaurantUserIdentifier == null || restaurantUserCollectionIdentifiers.includes(restaurantUserIdentifier)) {
          return false;
        }
        restaurantUserCollectionIdentifiers.push(restaurantUserIdentifier);
        return true;
      });
      return [...restaurantUsersToAdd, ...restaurantUserCollection];
    }
    return restaurantUserCollection;
  }
}
