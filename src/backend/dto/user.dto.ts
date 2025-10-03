export interface RegisterUserDto {
  email: string;
  password: string;
  name?: string;
}

export interface UserResponseDto {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
}
