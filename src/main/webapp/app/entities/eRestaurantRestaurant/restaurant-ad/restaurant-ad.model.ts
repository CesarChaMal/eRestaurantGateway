export interface IRestaurantAd {
  id?: string;
  url?: string;
  description?: string | null;
}

export class RestaurantAd implements IRestaurantAd {
  constructor(public id?: string, public url?: string, public description?: string | null) {}
}

export function getRestaurantAdIdentifier(restaurantAd: IRestaurantAd): string | undefined {
  return restaurantAd.id;
}
