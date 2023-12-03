import { IDataType } from '../base.type';

export interface ShopDataType extends IDataType {
  managerId?: string;
  name: string;
  description?: string;
  location: LocationType;
  url?: string;
  workingHours: object;
  isOnline?: boolean;
  isDeactivated?: boolean;
}

export type LocationType = {
  name: string;
  lat: number;
  lng: number;
};

export type WorkingHoursType = {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  /**
   * 0: Sunday, 1: Monday, 2: Tuesday, 3: Wednesday, 4: Thursday, 5: Friday, 6: Saturday.
   */
  weekDays: number[];
};
