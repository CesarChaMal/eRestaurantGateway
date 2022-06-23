export interface IPayment {
  id?: string;
  description?: string | null;
}

export class Payment implements IPayment {
  constructor(public id?: string, public description?: string | null) {}
}

export function getPaymentIdentifier(payment: IPayment): string | undefined {
  return payment.id;
}
