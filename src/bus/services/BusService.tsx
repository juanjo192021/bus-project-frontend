import { IErrorResponse } from "../../utils/interfaces/error-response";
import { IBusesResponse, IBusResponse } from "../interfaces/bus-response";

/**
 * Obtiene la lista de buses con paginación.
 * @param page Número de página (por defecto 0).
 * @param size Tamaño de página (por defecto 5).
 * @returns Promesa que resuelve a un objeto de tipo IData o null.
 */
export const getBusesByPageAndSize = async (
  page: number = 0,
  size: number = 5
): Promise<IBusesResponse | IErrorResponse | null> => {

  try {

    const usuarioData = localStorage.getItem("usuarioData");
    const token = usuarioData ? JSON.parse(usuarioData).accessToken : null;
    if (!token) {
      throw new Error("No se encontró el token de acceso");
    }

    const response: Response = await fetch(
      `http://localhost:8080/api/v1/bus?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData: IErrorResponse = await response.json();
      return errorData;
    }

    const data: IBusesResponse | IErrorResponse = await response.json();

    if (data.status == "FAIL") {
      return data as IErrorResponse;
    }

    return data as IBusesResponse;

  } catch (error: any) {
    throw new Error(error.message || "Error al procesar la solicitud");
  }
};

/**
 * Obtiene la información de un bus por su ID.
 * @param id Identificador del bus.
 * @returns Promesa que resuelve a un objeto de tipo IBus o null.
 */
export const getBusById = async (id: number): Promise<IBusResponse | IErrorResponse | null> => {

  try {

    const usuarioData = localStorage.getItem("usuarioData");
    const token = usuarioData ? JSON.parse(usuarioData).accessToken : null;
    if (!token) {
      throw new Error("No se encontró el token de acceso");
    }

    const response = await fetch(`http://localhost:8080/api/v1/bus/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData: IErrorResponse = await response.json();
      return errorData;
    }

    const data: IBusResponse | IErrorResponse = await response.json();

    if (data.status == "FAIL") {
      return data as IErrorResponse;
    }

    return data as IBusResponse;
    
  } catch (error: any) {
    return null;
  }
};
