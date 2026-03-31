import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @Length(2, 120, { message: 'O nome deve ter entre 2 e 120 caracteres.' })
  name: string;

  @IsString({ message: 'A descrição deve ser um texto.' })
  @IsOptional()
  @Length(2, 1000, { message: 'A descrição deve ter entre 2 e 1000 caracteres.' })
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O preço deve ser um número com até 2 casas decimais.' })
  @Min(0, { message: 'O preço não pode ser negativo.' })
  @Max(99999999.99, { message: 'O preço excede o valor máximo permitido.' })
  price: number;

  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'O estoque deve ser um número inteiro.' })
  @Min(0, { message: 'O estoque não pode ser negativo.' })
  @Max(1000000, { message: 'O estoque não pode ultrapassar 1.000.000 unidades.' })
  stock: number;
}
