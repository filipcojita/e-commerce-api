import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { Product } from '../product/product.entity';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createCart(): Promise<Cart> {
    const cart = this.cartRepository.create();
    return this.cartRepository.save(cart);
  }

  async getCart(cartId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { id: cartId }, relations: ['items', 'items.product'] });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async addItemToCart(cartId: number, addCartItemDto: AddCartItemDto): Promise<Cart> {
    const cart = await this.getCart(cartId);
    const product = await this.productRepository.findOne({ where: { id: addCartItemDto.productId } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const cartItem = this.cartItemRepository.create({
      cart,
      product,
      quantity: addCartItemDto.quantity,
    });

    await this.cartItemRepository.save(cartItem);
    return this.getCart(cartId);
  }

  async updateCartItem(cartId: number, cartItemId: number, updateCartItemDto: UpdateCartItemDto): Promise<Cart> {
    const cartItem = await this.cartItemRepository.findOne({ where: { id: cartItemId, cart: { id: cartId } } });
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    cartItem.quantity = updateCartItemDto.quantity;
    await this.cartItemRepository.save(cartItem);

    return this.getCart(cartId);
  }

  async removeItemFromCart(cartId: number, cartItemId: number): Promise<Cart> {
    const cartItem = await this.cartItemRepository.findOne({ where: { id: cartItemId, cart: { id: cartId } } });
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartItemRepository.remove(cartItem);
    return this.getCart(cartId);
  }

  async clearCart(cartId: number): Promise<void> {
    const cart = await this.getCart(cartId);
    await this.cartItemRepository.remove(cart.items);
  }
}
