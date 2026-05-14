export interface Order {
  id?: number;
  orderNumber: string;
  status: string;
  totalAmount: number;
  notes: string;
  customer: {
    id: number;
    fullName?: string;
  };
}