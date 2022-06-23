export interface INotification {
  id?: string;
  description?: string | null;
}

export class Notification implements INotification {
  constructor(public id?: string, public description?: string | null) {}
}

export function getNotificationIdentifier(notification: INotification): string | undefined {
  return notification.id;
}
