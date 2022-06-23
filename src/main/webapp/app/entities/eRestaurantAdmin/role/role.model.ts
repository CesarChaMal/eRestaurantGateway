export interface IRole {
  id?: string;
  description?: string | null;
}

export class Role implements IRole {
  constructor(public id?: string, public description?: string | null) {}
}

export function getRoleIdentifier(role: IRole): string | undefined {
  return role.id;
}
