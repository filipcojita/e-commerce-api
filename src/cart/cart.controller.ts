import { Controller, Post, Get, Param, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('carts')
@ApiBasicAuth()
@UseGuards(AuthGuard('basic'))
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  createCart() {
    return this.cartService.createCart();
  }

  @Get(':id')
  getCart(@Param('id') id: string) {
    return this.cartService.getCart(+id);
  }

  //see dto
  @Post(':id/items')
  addItemToCart(@Param('id') id: string, @Body() addCartItemDto: AddCartItemDto) {
    return this.cartService.addItemToCart(+id, addCartItemDto);
  }

  //update function can only update the quantity - see dto
  @Put(':id/items/:itemId')
  updateCartItem(@Param('id') id: string, @Param('itemId') itemId: string, @Body() updateCartItemDto: UpdateCartItemDto) {
    return this.cartService.updateCartItem(+id, +itemId, updateCartItemDto);
  }

  @Delete(':id/items/:itemId')
  removeItemFromCart(@Param('id') id: string, @Param('itemId') itemId: string) {
    return this.cartService.removeItemFromCart(+id, +itemId);
  }

  @Delete(':id/items')
  clearCart(@Param('id') id: string) {
    return this.cartService.clearCart(+id);
  }
}