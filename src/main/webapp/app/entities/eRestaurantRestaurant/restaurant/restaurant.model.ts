export interface IRestaurant {
  id?: string;
  name?: string;
  description?: string | null;
  imageContentType?: string | null;
  image?: string | null;
  email?: string | null;
  rating?: number;
}

export class Restaurant implements IRestaurant {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string | null,
    public imageContentType?: string | null,
    public image?: string | null,
    public email?: string | null,
    public rating?: number
  ) {}
}

export function getRestaurantIdentifier(restaurant: IRestaurant): string | undefined {
  return restaurant.id;
}
