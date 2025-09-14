import React, { useState, useEffect, useMemo } from 'react';
import { useDogsAPI } from '../../../hooks/useDogsAPI';

export default function BusquedaAvanzada({ onRazaSeleccionada, razaSeleccionada }) {
  // Estados locales
  const [busqueda, setBusqueda] = useState('');
  const [mostrarCarrusel, setMostrarCarrusel] = useState(false);
  const [razaSeleccionadaLocal, setRazaSeleccionadaLocal] = useState(razaSeleccionada || '');
  const [cargandoInicial, setCargandoInicial] = useState(false);

  // Hook de la API
  const {
    razas,
    imagenesRandom,
    cargando,
    cargandoCarrusel,
    error,
    obtenerImagenesRandom,
    crearArrayBusqueda,
    crearArrayCarrusel
  } = useDogsAPI();

  // Array de búsqueda procesado
  const arrayBusqueda = useMemo(() => {
    return crearArrayBusqueda(razas);
  }, [razas, crearArrayBusqueda]);

  // Array de carrusel procesado
  const arrayCarrusel = useMemo(() => {
    return crearArrayCarrusel(imagenesRandom);
  }, [imagenesRandom, crearArrayCarrusel]);

  // Filtrar razas según búsqueda
  const razasFiltradas = useMemo(() => {
    if (!busqueda.trim()) return [];
    
    return arrayBusqueda.filter(raza =>
      raza.nombre.toLowerCase().includes(busqueda.toLowerCase())
    ).slice(0, 10); // Limitar a 10 resultados
  }, [arrayBusqueda, busqueda]);

  // Manejar selección de raza
  const manejarSeleccionRaza = (raza) => {
    setRazaSeleccionadaLocal(raza);
    onRazaSeleccionada?.(raza);
    setBusqueda('');
  };

  // Manejar selección desde carrusel
  const manejarSeleccionCarrusel = (raza) => {
    setRazaSeleccionadaLocal(raza);
    onRazaSeleccionada?.(raza);
    setMostrarCarrusel(false);
  };

  // Cargar más imágenes del carrusel
  const cargarMasImagenes = async () => {
    setCargandoInicial(true);
    try {
      await obtenerImagenesRandom(10, 3);
    } finally {
      setCargandoInicial(false);
    }
  };

  // Efecto para cargar imágenes del carrusel
  useEffect(() => {
    if (mostrarCarrusel && imagenesRandom.length === 0) {
      setCargandoInicial(true);
      obtenerImagenesRandom(15, 3).finally(() => {
        setCargandoInicial(false);
      });
    }
  }, [mostrarCarrusel, imagenesRandom.length, obtenerImagenesRandom]);

console.log(arrayCarrusel,'arrayCarrusel');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Selecciona la raza de tu mascota
        </h2>
        <p className="text-gray-600 text-sm">
          Busca por nombre o explora visualmente
        </p>
      </div>

      {/* Raza seleccionada */}
      {razaSeleccionadaLocal && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Raza seleccionada:</p>
              <p className="text-lg font-semibold text-green-800 capitalize">
                {razaSeleccionadaLocal}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setRazaSeleccionadaLocal('');
                onRazaSeleccionada?.('');
              }}
              className="text-green-600 hover:text-green-800 text-sm font-medium"
            >
              Cambiar
            </button>
          </div>
        </div>
      )}

      {/* Opciones de búsqueda */}
      <div className="grid flex-col">
        {/* Opción 1: Búsqueda por texto */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            ¿Sabes la raza?
          </h3>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Escribe el nombre de la raza..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            {cargando && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>

          {/* Resultados de búsqueda */}
          {busqueda && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {razasFiltradas.length > 0 ? (
                razasFiltradas.map((raza) => (
                  <button
                    key={raza.id}
                    type="button"
                    onClick={() => manejarSeleccionRaza(raza.nombre)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-medium text-gray-800 capitalize">
                      {raza.nombre}
                    </div>
                    {raza.tipo === 'subraza' && (
                      <div className="text-sm text-gray-500">
                        Subraza de {raza.razaPadre}
                      </div>
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500 text-center">
                  No se encontraron razas
                </div>
              )}
            </div>
          )}
        </div>

        {/* Opción 2: Carrusel visual */}
        <div className="space-y-3 mt-4">
          <h3 className="font-semibold text-gray-700 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            ¿No sabes la raza?
          </h3>
          
          <button
            type="button"
            onClick={() => setMostrarCarrusel(!mostrarCarrusel)}
            disabled={cargandoInicial}
            className="w-full px-4 py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {cargandoInicial ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500 mr-2"></div>
                Preparando carrusel...
              </div>
            ) : mostrarCarrusel ? (
              'Ocultar carrusel'
            ) : (
              'Explorar visualmente'
            )}
          </button>

          {/* Carrusel de imágenes */}
          {mostrarCarrusel && (
            <div className="space-y-3">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-700">Selecciona una imagen</h4>
                  {(cargandoCarrusel || cargandoInicial) && (
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500 mr-2"></div>
                      {cargandoInicial ? 'Cargando imágenes...' : 'Procesando...'}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                  {Array.isArray(arrayCarrusel) && arrayCarrusel.length > 0 ? (
                    arrayCarrusel.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => manejarSeleccionCarrusel(item.raza)}
                        className="group relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-purple-500 transition-all"
                      >
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200"></div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                          <p className="text-white text-xs font-medium text-center capitalize">
                            {item.nombre}
                          </p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="col-span-full flex items-center justify-center py-8 text-gray-500">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-2"></div>
                        <p className="text-sm">
                          {cargandoInicial ? 'Cargando imágenes...' : 'Preparando carrusel...'}
                        </p>
                        {cargandoInicial && (
                          <p className="text-xs text-gray-400 mt-1">
                            Esto puede tomar unos segundos
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  type="button"
                  onClick={cargarMasImagenes}
                  disabled={cargandoCarrusel || cargandoInicial}
                  className="w-full mt-3 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-all duration-200"
                >
                  {cargandoInicial ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Cargando más imágenes...
                    </div>
                  ) : cargandoCarrusel ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Procesando...
                    </div>
                  ) : (
                    'Cargar más imágenes'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error handling */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">
            Error al cargar datos: {error}
          </p>
        </div>
      )}

      {/* Información adicional */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Tip:</strong> Si no estás seguro de la raza, usa el carrusel visual para comparar imágenes y encontrar la que más se parezca a tu mascota.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}