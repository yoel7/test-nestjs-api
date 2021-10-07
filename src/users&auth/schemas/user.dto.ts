export class UserDto {
  password : string;
  readonly username: string;
  readonly phone?: string;
  readonly email?: string;
  readonly country?: string;
  readonly language?: string;
}
