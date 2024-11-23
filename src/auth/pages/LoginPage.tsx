import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";
import { IAuthRequest } from "../interfaces/auth-request";
import { IErrorResponse } from '../../utils/interfaces/error-response';

export const LoginPage = () => {

  const [nombreUsuario, setNombreUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const authRequest: IAuthRequest = { nombreUsuario, clave };
    const data = await login(authRequest);

    if (!data) {
      setMessage('Error al iniciar sesión.');
      return;
    }

    if (data.status === 'FAIL') {
      const errorData = data as IErrorResponse;
      setMessage(errorData.errorMessage);
      return;
    }

    if (data.status === 'SUCCESS') {
      navigate("/bus", {replace: true});
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center w-full">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-10 py-8 min-w-[30rem]">
          <h1 className="text-2xl font-bold text-center mb-4 xl:mb-6 dark:text-gray-200">
            Iniciar Sesión
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Username
              </label>
              <input
                type="text"
                id="nombre de usuario"
                className="shadow-sm rounded-md w-full px-3 py-2 border text-black dark:text-white border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ingrese su nombre de usuario"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="shadow-sm rounded-md w-full px-3 py-2 border text-black dark:text-white border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ingrese su contraseña"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center mt-10 mb-4">
              <button
                type="submit"
                className="w-6/12 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Ingresar
              </button>
            </div>
            {message && <p className="mt-6 text-red-700 text-sm">{message}</p>}
          </form>
        </div>
      </div>
    </>
  );
};
