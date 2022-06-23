export interface ICompositePermission {
  id?: string;
  description?: string | null;
}

export class CompositePermission implements ICompositePermission {
  constructor(public id?: string, public description?: string | null) {}
}

export function getCompositePermissionIdentifier(compositePermission: ICompositePermission): string | undefined {
  return compositePermission.id;
}
