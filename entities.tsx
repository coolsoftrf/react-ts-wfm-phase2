export const SERVICE_STATUS_NORMAL = 1;
export const SERVICE_STATUS_FAIL = 2;

export const HARDWARE_STATUS_NORMAL = 1;
export const HARDWARE_STATUS_FAIL = 2;
export const HARDWARE_STATUS_UNDER_MAINT = 3;
export const HARDWARE_STATUS_TO_REPLACE = 4;

export interface Base {
  id: number;
  name: string;
}
export interface Service {
  id: number;
  name: string;
  serviceStatus: Base;
}
export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
}
export interface Equipment extends Base {
  serial: string;
  hardwareStatus: Base;
}

export interface Items {
  services: Service[];
  customers: Customer[];
  hardwares: Equipment[];
}
export interface SearchResults {
  _embedded: Items;
}
