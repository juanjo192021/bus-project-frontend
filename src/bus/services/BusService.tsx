import { IBusResponse, IData } from "../interfaces/bus-response";

export const BusService = async (page: number = 0, size: number = 5): Promise<IData | null> => {
  const usuarioData = localStorage.getItem('usuarioData'); 
  const token = usuarioData ? JSON.parse(usuarioData).accessToken : null;
  if (!token) {
    throw new Error('No se encontró el token de acceso');
  }

  try {
    const response = await fetch(`http://localhost:8080/api/v1/bus?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los datos de los buses');
    }

    const data: IBusResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
