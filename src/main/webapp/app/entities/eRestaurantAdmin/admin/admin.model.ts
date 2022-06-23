export interface IAdmin {
  id?: string;
  name?: string;
  description?: string | null;
  imageContentType?: string | null;
  image?: string | null;
  email?: string | null;
}

export class Admin implements IAdmin {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string | null,
    public imageContentType?: string | null,
    public image?: string | null,
    public email?: string | null
  ) {}
}

export function getAdminIdentifier(admin: IAdmin): string | undefined {
  return admin.id;
}
