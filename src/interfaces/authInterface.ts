export interface LoginRequest {
  email: string;
  password: string;
}

export interface JwtPayload {
  adminId: number;
  email: string;
}

export interface AuthenticatedAdmin {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  admin: AuthenticatedAdmin;
  token: string;
}
