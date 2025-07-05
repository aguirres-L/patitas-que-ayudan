import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navbar } from './Navbar';
import { obtenerProfesionalPorUid, buscarMascotasPorChip } from '../data/firebase/firebase';
import { SistemaCitas } from './SistemaCitas';

// Este componente no recibe props
const DashboardProfesional = () => {
  const navigate = useNavigate();
  const { usuario, cerrarSesion, isCargandoLogout } = useAuth();
  const [datosProfesional, setDatosProfesional] = useState(null);
  const [isCargandoProfesional, setIsCargandoProfesional] = useState(false);
  const [mascotasEncontradas, setMascotasEncontradas] = useState([]);
  const [isBuscandoMascotas, setIsBuscandoMascotas] = useState(false);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [pestañaActiva, setPestañaActiva] = useState('buscar');
  const [mostrarCitas, setMostrarCitas] = useState(false);

  // Cargar datos del profesional
  useEffect(() => {
    const cargarDatosProfesional = async () => {
      if (!usuario?.uid) return;
      
      setIsCargandoProfesional(true);
      try {
        const datos = await obtenerProfesionalPorUid(usuario.uid);
        setDatosProfesional(datos);
      } catch (error) {
        console.error("Error al cargar datos del profesional:", error);
      } finally {
        setIsCargandoProfesional(false);
      }
    };

    cargarDatosProfesional();
  }, [usuario?.uid]);

  // Función para cerrar sesión
  const handleCerrarSesion = async () => {
    try {
      await cerrarSesion();
      navigate('/login-profesional');
    } catch (error) {
      alert('Error al cerrar sesión. Inténtalo de nuevo.');
    }
  };

  // Función para buscar mascotas
  const handleBuscarMascotas = async (e) => {
    e.preventDefault();
    if (!terminoBusqueda.trim()) return;

    setIsBuscandoMascotas(true);
    try {
      const resultado = await buscarMascotasPorChip(terminoBusqueda);
      setMascotasEncontradas(resultado || []);
    } catch (error) {
      console.error('Error al buscar mascotas:', error);
      setMascotasEncontradas([]);
    } finally {
      setIsBuscandoMascotas(false);
    }
  };

  console.log(datosProfesional, 'datosProfesional');
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 pt-16">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hidden md:block absolute -top-20 -right-20 w-40 h-40 lg:w-60 lg:h-60 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="hidden md:block absolute -bottom-20 -left-20 w-40 h-40 lg:w-60 lg:h-60 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="hidden lg:block absolute top-20 left-20 w-40 h-40 lg:w-60 lg:h-60 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="md:hidden absolute top-2 right-2 w-16 h-16 bg-orange-200 rounded-full mix-blend-multiply filter blur-lg opacity-50 animate-blob"></div>
        <div className="md:hidden absolute bottom-2 left-2 w-16 h-16 bg-yellow-200 rounded-full mix-blend-multiply filter blur-lg opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      {/* Navbar modular */}
      <Navbar 
        tipo="dashboard"
        onCerrarSesion={handleCerrarSesion}
        isCargandoLogout={isCargandoLogout}
      />

      {/* Main Content */}
      <div className="relative container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header del Dashboard */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Dashboard Profesional
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {datosProfesional ? `${datosProfesional.tipoProfesional === 'veterinario' ? 'Dr.' : ''} ${datosProfesional.nombre} - ${datosProfesional.especialidad}` : 'Cargando...'}
          </p>
        </div>

        {/* Información del Profesional */}
        {datosProfesional && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mi Información Profesional</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Nombre</p>
                <p className="font-medium">{datosProfesional.nombre}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Especialidad</p>
                <p className="font-medium">{datosProfesional.especialidad}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Teléfono</p>
                <p className="font-medium">{datosProfesional.telefono}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Dirección</p>
                <p className="font-medium">{datosProfesional.direccion}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Horario</p>
                <p className="font-medium">{datosProfesional.horario}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Experiencia</p>
                <p className="font-medium">{datosProfesional.experiencia} años</p>
              </div>
            </div>
          </div>
        )}

                  {/* Pestañas */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8">
            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-4 overflow-x-auto">
                <button 
                  onClick={() => setPestañaActiva('buscar')}
                  className={`pb-2 font-medium transition-colors duration-200 whitespace-nowrap ${
                    pestañaActiva === 'buscar' 
                      ? 'border-b-2 border-orange-500 text-orange-600' 
                      : 'text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-300'
                  }`}
                >
                  Buscar Mascotas
                </button>
                <button 
                  onClick={() => setPestañaActiva('historial')}
                  className={`pb-2 font-medium transition-colors duration-200 whitespace-nowrap ${
                    pestañaActiva === 'historial' 
                      ? 'border-b-2 border-orange-500 text-orange-600' 
                      : 'text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-300'
                  }`}
                >
                  Historial de Atenciones
                </button>
                <button 
                  onClick={() => setMostrarCitas(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
                >
                  Gestionar Citas
                </button>
              </div>
            </div>

          {/* Contenido de Pestañas */}
          {pestañaActiva === 'buscar' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Buscar Mascotas por Chip</h3>
              
              {/* Formulario de búsqueda */}
              <form onSubmit={handleBuscarMascotas} className="mb-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Ingresa el número de chip de la mascota"
                      value={terminoBusqueda}
                      onChange={(e) => setTerminoBusqueda(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      disabled={isBuscandoMascotas}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isBuscandoMascotas || !terminoBusqueda.trim()}
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isBuscandoMascotas ? 'Buscando...' : 'Buscar'}
                  </button>
                </div>
              </form>

              {/* Resultados de búsqueda */}
              {isBuscandoMascotas && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                  <p className="mt-2 text-gray-600">Buscando mascotas...</p>
                </div>
              )}

              {!isBuscandoMascotas && mascotasEncontradas.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Mascotas encontradas:</h4>
                  {mascotasEncontradas.map((mascota, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={mascota.fotoUrl || "/dog-avatar.png"} 
                            alt={mascota.nombre} 
                            className="w-12 h-12 rounded-full object-cover" 
                          />
                          <div>
                            <h5 className="font-semibold text-gray-900">{mascota.nombre}</h5>
                            <p className="text-sm text-gray-600">{mascota.raza} • {mascota.edad} años</p>
                            <p className="text-xs text-gray-500">Dueño: {mascota.propietario?.nombre}</p>
                          </div>
                        </div>
                        <Link 
                          to={`/pet-profile/${mascota.id}`}
                          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 text-sm"
                        >
                          Ver Perfil
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!isBuscandoMascotas && terminoBusqueda && mascotasEncontradas.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">No se encontraron mascotas con ese chip</p>
                </div>
              )}
            </div>
          )}

          {pestañaActiva === 'historial' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Historial de Citas</h3>
              
              {datosProfesional?.citas && datosProfesional.citas.length > 0 ? (
                <div className="space-y-4">
                  {datosProfesional.citas.map((cita, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            </div>
                                                          <div className="flex-1">
                                <h5 className="font-semibold text-gray-900">
                                  {cita.mascotaNombre || 'Mascota no especificada'}
                                </h5>
                                <p className="text-sm text-gray-600">
                                  {cita.fecha} • {cita.hora} • {cita.duracion}min
                                </p>
                                <p className="text-xs text-gray-500">
                                  Cliente: {cita.clienteNombre} • {cita.telefonoContacto}
                                </p>
                                <div className="mt-1">
                                  {cita.servicios && cita.servicios.length > 0 && (
                                    <p className="text-xs text-gray-600">
                                      Servicios: {cita.servicios.join(', ')}
                                    </p>
                                  )}
                                  {cita.tipoCorte && (
                                    <p className="text-xs text-gray-600">
                                      Tipo: {cita.tipoCorte}
                                    </p>
                                  )}
                                  {cita.observaciones && (
                                    <p className="text-xs text-gray-500 italic">
                                      Obs: {cita.observaciones}
                                    </p>
                                  )}
                                </div>
                                <div className="mt-2">
                                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                    cita.estado === 'confirmada' ? 'bg-green-100 text-green-800' :
                                    cita.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                                    cita.estado === 'cancelada' ? 'bg-red-100 text-red-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {cita.estado}
                                  </span>
                                  {cita.esPrimeraVisita && (
                                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 ml-2">
                                      Primera visita
                                    </span>
                                  )}
                                </div>
                              </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {cita.mascotaId && (
                            <Link 
                              to={`/pet-profile/${cita.mascotaId}`}
                              className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors duration-200"
                            >
                              Ver Mascota
                            </Link>
                          )}
                          <button 
                            className="bg-orange-500 text-white px-3 py-1 rounded text-xs hover:bg-orange-600 transition-colors duration-200"
                            onClick={() => {
                              // Aquí puedes agregar lógica para editar la cita
                              console.log('Editar cita:', cita);
                            }}
                          >
                            Editar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">No hay citas registradas</p>
                  <p className="text-sm text-gray-500 mt-1">Las citas aparecerán aquí cuando sean creadas</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Información para Profesionales
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Puedes buscar mascotas por su número de chip y acceder a sus perfiles para actualizar información médica, vacunas, tratamientos y otros datos relevantes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Sistema de Citas */}
      {mostrarCitas && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <SistemaCitas 
              onCerrar={() => setMostrarCitas(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardProfesional; 