import { useEffect, useState } from "react";
import { IBus, IBusResponse } from "../interfaces/bus-response";
import { getBusById } from "../services/BusService";
import { IBusModalProps } from "../interfaces/bus-modal-props";
import { IErrorResponse } from "../../utils/interfaces/error-response";

export const BusModal: React.FC<IBusModalProps> = ({ isOpen, onClose, id }) => {
  const [bus, setBus] = useState<IBus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusData = async () => {
      if (!id || !isOpen) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getBusById(id);
        if (!data) {
          setError("Error al obtener los datos del bus.");
          return;
        }
        if (data.status === "FAIL") {
          const errorResponse = data as IErrorResponse;
          setError(errorResponse.errorMessage);
          return;
        }
        if (data.status === "SUCCESS") {
          const dataResponse = data as IBusResponse;
          setBus(dataResponse.data as IBus);
        } 
      } catch (err) {
        setError("Error al obtener los datos del bus.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusData();
  }, [id, isOpen]);

  if (!isOpen) return null;

  const formatFecha = (fecha: string) => {
    const date = new Date(fecha);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-between p-5 border-b border-solid border-gray-200 rounded-t">
              <h3 className="text-xl font-semibold">Información del Bus</h3>
              <button
                className="p-1 ml-auto bg-black border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={onClose}
              >
                <span className="text-white text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              {loading ? (
                <p>Cargando información...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : bus ? (
                <div>
                  <p>
                    <b>Número de Bus:</b> {bus.numeroBus}
                  </p>
                  <p>
                    <b>Placa:</b> {bus.placa}
                  </p>
                  <p>
                    <b>Fecha de Creación:</b> {formatFecha(bus.fechaCreacion)}
                  </p>
                  <p>
                    <b>Características:</b> {bus.caracteristicas}
                  </p>
                  <p>
                    <b>Marca:</b> {bus.marca.nombre}
                  </p>
                  <p>
                    <b>Estado:</b> {bus.estado}
                  </p>
                </div>
              ) : (
                <p>No hay datos disponibles.</p>
              )}
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
              <button
                className="bg-red-500 text-white font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
