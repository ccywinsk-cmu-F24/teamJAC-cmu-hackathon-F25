export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResultDto {
  token: string;
  userId: string;
  email: string;
}

export interface LogoutDto {
  token: string;
}
