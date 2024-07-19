export class UpdateOrderDto {
    items: {
      productId: number;
      quantity: number;
    }[];
    total: number;
  }
  