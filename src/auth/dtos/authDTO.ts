import { IsString, MaxLength, MinLength } from 'class-validator';

class AuthDTO {
  @IsString()
  @MinLength(6)
  @MaxLength(15)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(10)
  password: string;
}

export { AuthDTO };
