import { IBaseDataType } from '../base.type';

export interface IProductData extends IBaseDataType {
  name: string;
  description?: string;
  organizationId: string;
  category?: ProductCategoryType;
  isDeactivated?: boolean;
}

export type ProductCategoryType = 'electronicDevice' | 'accessory' | 'gadget';
