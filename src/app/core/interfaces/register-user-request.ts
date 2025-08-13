export interface RegisterUserRequest {

  id: number;
  password: string;
  nome: string;
  cognome: string;
  roles: string[];
  email: string;
  bio: string;

}
