export interface IOrder {
  id?: string;
  description?: string | null;
  rating?: number;
}

export class Order implements IOrder {
  constructor(public id?: string, public description?: string | null, public rating?: number) {}
}

export function getOrderIdentifier(order: IOrder): string | undefined {
  return order.id;
}
