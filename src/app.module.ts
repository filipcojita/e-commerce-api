import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/cart.entity';
import { CartItem } from './cart/cart-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'ecommerce.db',
      entities: [User, Product, Cart, CartItem],
      synchronize: true,
    }),
    UserModule,
    ProductModule,
    CartModule,
  ],
})
export class AppModule {}
