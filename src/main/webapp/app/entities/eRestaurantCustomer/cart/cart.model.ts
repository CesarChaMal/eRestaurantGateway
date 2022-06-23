export interface ICart {
  id?: string;
  description?: string | null;
}

export class Cart implements ICart {
  constructor(public id?: string, public description?: string | null) {}
}

export function getCartIdentifier(cart: ICart): string | undefined {
  return cart.id;
}
