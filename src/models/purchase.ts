/**
 * @id purchase id
 * @productId purchased product's id
 * @timestamp the time when the product is purchased
 * @price the purchased product's price
 */
export interface Purchase {
  id?: string;
  productId: string;
  timestamp: string;
  price: number;
}
