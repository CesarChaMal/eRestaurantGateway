export interface IRestaurantDiscount {
  id?: string;
  code?: string;
  description?: string | null;
  percentage?: number;
}

export class RestaurantDiscount implements IRestaurantDiscount {
  constructor(public id?: string, public code?: string, public description?: string | null, public percentage?: number) {}
}

export function getRestaurantDiscountIdentifier(restaurantDiscount: IRestaurantDiscount): string | undefined {
  return restaurantDiscount.id;
}
