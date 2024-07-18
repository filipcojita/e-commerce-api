import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  findAll(filter?: any): Promise<Product[]> {
    const queryBuilder = this.productsRepository.createQueryBuilder('product');

    if (filter.name) {
      queryBuilder.andWhere('product.name LIKE :name', { name: `%${filter.name}%` });
    }
    if (filter.category) {
      queryBuilder.andWhere('product.category = :category', { category: filter.category });
    }
    if (filter.minPrice) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice: filter.minPrice });
    }
    if (filter.maxPrice) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice: filter.maxPrice });
    }

    return queryBuilder.getMany();
  }

  findOne(id: number): Promise<Product> {
    return this.productsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.productsRepository.update(id, updateProductDto);
    return this.productsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
