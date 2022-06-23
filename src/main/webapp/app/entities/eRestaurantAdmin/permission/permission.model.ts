export interface IPermission {
  id?: string;
  description?: string | null;
}

export class Permission implements IPermission {
  constructor(public id?: string, public description?: string | null) {}
}

export function getPermissionIdentifier(permission: IPermission): string | undefined {
  return permission.id;
}
