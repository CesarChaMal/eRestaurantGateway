export interface IProducts {
  id?: string;
  name?: string;
  description?: string | null;
  imageContentType?: string | null;
  image?: string | null;
  estimatedPreparaingTime?: number;
}

export class Products implements IProducts {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string | null,
    public imageContentType?: string | null,
    public image?: string | null,
    public estimatedPreparaingTime?: number
  ) {}
}

export function getProductsIdentifier(products: IProducts): string | undefined {
  return products.id;
}
