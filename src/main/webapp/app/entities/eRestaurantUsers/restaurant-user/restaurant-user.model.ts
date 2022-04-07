import { IUser } from 'app/entities/user/user.model';

export interface IRestaurantUser {
  id?: string;
  name?: string;
  description?: string | null;
  imageContentType?: string | null;
  image?: string | null;
  email?: string | null;
  internalUser?: IUser | null;
}

export class RestaurantUser implements IRestaurantUser {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string | null,
    public imageContentType?: string | null,
    public image?: string | null,
    public email?: string | null,
    public internalUser?: IUser | null
  ) {}
}

export function getRestaurantUserIdentifier(restaurantUser: IRestaurantUser): string | undefined {
  return restaurantUser.id;
}
