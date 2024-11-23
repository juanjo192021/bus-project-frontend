import { IErrorResponse } from "../../utils/interfaces/error-response";
import { IAuthRequest } from "../interfaces/auth-request";
import { IAuthResponse, IData } from "../interfaces/auth-response";

/**
 * Realiza la petición de inicio de sesión.
 * @param authRequest Datos de autenticación.
 * @returns Promesa que resuelve a un objeto de tipo IAuthResponse, IErrorResponse o null.
 */
export const login = async (
  authRequest: IAuthRequest
): Promise<IAuthResponse | IErrorResponse | null> => {
  try {
    const response: Response = await fetch(
      "http://localhost:8080/api/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authRequest),
      }
    );

    if (!response.ok) {
      const errorData: IErrorResponse = await response.json();
      return errorData;
    }

    const data: IAuthResponse | IErrorResponse = await response.json();

    if (data.status == "FAIL") {
      return data as IErrorResponse;
    }

    const usuarioData = data as IAuthResponse;
    localStorage.setItem("usuarioData", JSON.stringify(usuarioData.data as IData));

    return data as IAuthResponse;
  } catch (error: any) {
    return null;
  }
};
