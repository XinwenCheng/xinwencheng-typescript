import { IDataType } from '../base.type';

export interface IProductData extends IDataType {
  name: string;
  description?: string;
  organizationId: string;
  category?: ProductCategoryType;
  isDeactivated?: boolean;
}

export type ProductCategoryType = 'electronicDevice' | 'accessory' | 'gadget';
