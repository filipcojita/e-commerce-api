export class CreateOrderDto {
  userId: number;
  items: {
    productId: number;
    quantity: number;
  }[];
  status?: number;  // Optional status field
}
