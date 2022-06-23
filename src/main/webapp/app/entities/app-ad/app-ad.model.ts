export interface IAppAd {
  id?: string;
  url?: string;
  description?: string | null;
}

export class AppAd implements IAppAd {
  constructor(public id?: string, public url?: string, public description?: string | null) {}
}

export function getAppAdIdentifier(appAd: IAppAd): string | undefined {
  return appAd.id;
}
