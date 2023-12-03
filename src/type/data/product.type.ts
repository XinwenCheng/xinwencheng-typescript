import { IDataType } from '../base.type';

export interface ProductDataType extends IDataType {
  name: string;
  description?: string;
  organizationId: string;
  category?: ProductCategoryType;
  isDeactivated?: boolean;
}

export type ProductCategoryType = 'electronicDevice' | 'accessory' | 'gadget';
