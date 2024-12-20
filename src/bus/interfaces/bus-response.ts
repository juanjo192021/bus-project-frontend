export interface IBusesResponse {
  status: string;
  data:   IData;
}

export interface IBusResponse {
  status: string;
  data:   IBus;
}

export interface IData {
  content:       IBus[];
  page:          number;
  size:          number;
  totalElements: number;
  totalPages:    number;
}

export interface IBus {
  id:              number;
  numeroBus:       string;
  fechaCreacion:   string;
  placa:           string;
  caracteristicas: string;
  marca:           IMarca;
  estado:          string;
}

export interface IMarca {
  id:     number;
  nombre: string;
}

