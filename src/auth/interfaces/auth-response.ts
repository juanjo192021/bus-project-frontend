export interface IAuthResponse {
  usuario:     IUsuario;
  accessToken: string;
}

export interface IUsuario {
  nombreUsuario:  string;
  nombreRol: string;
}