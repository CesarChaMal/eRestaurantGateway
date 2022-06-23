export interface IAppDiscount {
  id?: string;
  code?: string;
  description?: string | null;
  percentage?: number;
}

export class AppDiscount implements IAppDiscount {
  constructor(public id?: string, public code?: string, public description?: string | null, public percentage?: number) {}
}

export function getAppDiscountIdentifier(appDiscount: IAppDiscount): string | undefined {
  return appDiscount.id;
}
