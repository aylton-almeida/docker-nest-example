import { IsEmail, MinLength, IsNotEmpty, IsInt } from 'class-validator';

export class EmailAndPasswordPayload {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class IdAndEmailPayload {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
