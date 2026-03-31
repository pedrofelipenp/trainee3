import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class QueryProductsDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt({ message: 'A página deve ser um número inteiro.' })
  @Min(1, { message: 'A página deve ser maior ou igual a 1.' })
  page = 1;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt({ message: 'O limite deve ser um número inteiro.' })
  @Min(1, { message: 'O limite deve ser maior ou igual a 1.' })
  @Max(100, { message: 'O limite não pode ultrapassar 100 itens por página.' })
  limit = 10;

  @IsOptional()
  @IsString({ message: 'O termo de busca deve ser um texto.' })
  search?: string;
}
