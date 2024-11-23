import { useEffect, useState } from "react";
import { IBus, IBusesResponse, IData } from "../interfaces/bus-response";
import { getBusesByPageAndSize } from "../services/BusService";
import { BusModal } from "../components/BusModal";

const BusPage = () => {
  const [buses, setBuses] = useState<IBus[]>([]);
  const [pagination, setPagination] = useState<IData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState<number | null>(null);

  const handleOpenModal = (id: number) => {
    setSelectedBusId(id);
    setShowModal(true);
  };

  useEffect(() => {
    const getBuses = async () => {
      try {
        const data = await getBusesByPageAndSize(currentPage);
        if(!data) {
          setError('Error al obtener los datos de los buses.');
          return;
        }
        if (data.status === 'SUCCESS') {
          const dataResponse = data as IBusesResponse;
          setBuses(dataResponse.data.content);
          setPagination(dataResponse.data);
        } else {
          setError("No se encontraron datos de buses");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };
    getBuses();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (pagination && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination && currentPage < pagination.totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

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
      <div className="max-w-[840px] my-[25px] mx-auto flex justify-center items-center flex-col">
        <div className="block mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[460px]">
          <a className="block w-full px-4 py-2 text-center text-slate-700 transition-all text-[45px] ">
            Listado de Buses
          </a>
        </div>

        <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none text-slate-500">
                    Número de bus
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none text-slate-500">
                    Placa
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none text-slate-500">
                    Fecha de Creación
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none text-slate-500">
                    Características
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none text-slate-500">
                    Marca
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none text-slate-500">
                    Estado
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                  <p className="text-sm font-normal leading-none text-slate-500">
                    Acciones
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {error ? (
                <tr>
                  <td colSpan={5} className="text-center p-4">
                    <p>Error: {error}</p>
                  </td>
                </tr>
              ) : (
                buses.map((bus) => (
                  <tr
                    key={bus.id}
                    className="hover:bg-slate-50 border-b border-slate-200"
                  >
                    <td className="p-4 py-5">
                      <p className="block font-semibold text-sm text-slate-800">
                        {bus.numeroBus}
                      </p>
                    </td>
                    <td className="p-4 py-5">
                      <p className="text-sm text-slate-500">{bus.placa}</p>
                    </td>
                    <td className="p-4 py-5">
                      <p className="text-sm text-slate-500">
                        {formatFecha(bus.fechaCreacion)}
                      </p>
                    </td>
                    <td className="p-4 py-5">
                      <p className="text-sm text-slate-500">
                        {bus.caracteristicas}
                      </p>
                    </td>
                    <td className="p-4 py-5">
                      <p className="text-sm text-slate-500">
                        {bus.marca.nombre}
                      </p>
                    </td>
                    <td className="p-4 py-5">
                      <p className="text-sm text-slate-500">{bus.estado}</p>
                    </td>
                    <td className="p-4 py-5">
                      <button
                        onClick={() => handleOpenModal(bus.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                      >
                        Ver info
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Bus Modal */}
          <BusModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            id={selectedBusId}
          />

          <div className="flex justify-between items-center px-4 py-3">
            <div className="text-sm text-slate-500">
              {pagination && (
                <>
                  Mostrando del <b>{pagination.page * pagination.size + 1}</b>{" "}
                  al <b>{(pagination.page + 1) * pagination.size}</b> de{" "}
                  <b>{pagination.totalElements}</b>
                </>
              )}
            </div>
            <div className="flex space-x-1">
              <button
                onClick={handlePrevPage}
                disabled={!pagination || currentPage === 0}
                className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
              >
                Prev
              </button>
              {pagination &&
                Array.from({ length: pagination.totalPages }).map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal ${
                        currentPage === index
                          ? "text-white bg-slate-800 border-slate-800"
                          : "text-slate-500 bg-white border-slate-200"
                      } rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease`}
                    >
                      {index + 1}
                    </button>
                  )
                )}
              <button
                onClick={handleNextPage}
                disabled={
                  !pagination || currentPage >= pagination.totalPages - 1
                }
                className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusPage;
