export interface IAuthResponse {
  status: string;
  data:   IData;
}

export interface IData {
  usuario:     IUsuario;
  accessToken: string;
}

export interface IUsuario {
  nombreUsuario:  string;
  nombreRol: string;
}