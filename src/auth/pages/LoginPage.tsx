import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import { IAuthRequest } from "../interfaces/auth-request";

export const LoginPage = () => {

  const [nombreUsuario, setNombreUsuario] = useState('pepa');
  const [clave, setClave] = useState('123');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const authRequest: IAuthRequest = { nombreUsuario, clave };
    const data = await AuthService(authRequest);


    if (data) {
      navigate("/bus", {replace: true});
      setMessage(`Bienvenido, ${data.usuario.nombreUsuario}!`);
    } else {
      setMessage('Error al iniciar sesión.');
    }
  };


  return (
    <>
      <div className="min-h-screen flex items-center justify-center w-full">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
            Iniciar Sesión
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                id="email"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ingrese su username"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ingrese su contraseña"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Ingresar
            </button>
            {message && <p>{message}</p>}
          </form>
        </div>
      </div>
    </>
  );
};
