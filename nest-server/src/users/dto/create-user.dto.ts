export class CreateUserDto {
  email: string;
  first_name: string;
  last_name: string;
  age: number;
  role?: string;
  username: string;
  password: string;
}
