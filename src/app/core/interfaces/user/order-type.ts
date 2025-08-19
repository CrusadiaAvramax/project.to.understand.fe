export interface OrderType {
  idUser: number;
  orderDate: string; // formato ISO 8601 (date-time)
  status: string;
  totalAmount: number;
  idItems: number[];
}
