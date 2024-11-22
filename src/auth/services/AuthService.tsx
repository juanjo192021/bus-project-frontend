import { IAuthRequest } from '../interfaces/auth-request';
import { IAuthResponse } from '../interfaces/auth-response';

export const AuthService = async (authRequest:IAuthRequest): Promise<IAuthResponse | null> => {
  try {
    const response = await fetch('http://localhost:8080/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authRequest),
    });

    if (!response.ok) {
      throw new Error('Error al autenticar');
    }

    const data: IAuthResponse = await response.json();

    localStorage.setItem('usuarioData', JSON.stringify(data));

    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
