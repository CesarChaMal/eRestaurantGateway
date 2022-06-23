export interface IEmployee {
  id?: string;
  description?: string | null;
}

export class Employee implements IEmployee {
  constructor(public id?: string, public description?: string | null) {}
}

export function getEmployeeIdentifier(employee: IEmployee): string | undefined {
  return employee.id;
}
