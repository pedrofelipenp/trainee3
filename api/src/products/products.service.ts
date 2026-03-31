import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductsDto } from './dto/query-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const entity = this.productRepository.create({
      ...createProductDto,
      price: createProductDto.price.toFixed(2),
    });

    return this.productRepository.save(entity);
  }

  async findAll(query: QueryProductsDto): Promise<{
    data: Product[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const where = query.search
      ? [{ name: ILike(`%${query.search.trim()}%`) }]
      : undefined;
 
    const [data, total] = await this.productRepository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Produto nao encontrado');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    const nextPrice =
      typeof updateProductDto.price === 'number'
        ? updateProductDto.price.toFixed(2)
        : product.price;

    Object.assign(product, {
      ...updateProductDto,
      price: nextPrice,
    });

    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}
