import { OrderUserProduct } from './OrderUserProduct';

export class Orders {
  ID: number;
  OrderDate: string;
  DeliverDate: string;
  TotalOrderCash: number;
  CustomerId: number;
  orderUserProduct: OrderUserProduct[] = new Array();
}
