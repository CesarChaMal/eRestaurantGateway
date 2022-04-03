import { IUser } from 'app/entities/user/user.model';

export interface IRestaurantUser {
  id?: string;
  internalUser?: IUser | null;
}

export class RestaurantUser implements IRestaurantUser {
  constructor(public id?: string, public internalUser?: IUser | null) {}
}

export function getRestaurantUserIdentifier(restaurantUser: IRestaurantUser): string | undefined {
  return restaurantUser.id;
}
