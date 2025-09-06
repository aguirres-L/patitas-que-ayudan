import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navbar } from './Navbar';
import { obtenerProfesionalPorUid, buscarMascotasPorChip, subirImagenProfesional, updateDataCollection } from '../data/firebase/firebase';
import { SistemaCitas } from './SistemaCitas';
import GestionTienda from './GestionTienda';
import { ImageUploaderProfesional } from './ImageUploaderProfesional';

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
  const [isActualizandoTienda, setIsActualizandoTienda] = useState(false);
  
  // Estados para edición de imagen
  const [mostrarModalEditarImagen, setMostrarModalEditarImagen] = useState(false);
  const [isSubiendoImagen, setIsSubiendoImagen] = useState(false);
  const [archivoImagen, setArchivoImagen] = useState(null);
  const [urlImagenLocal, setUrlImagenLocal] = useState('');

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

// almacenar id de la mascota para luego puedo ver el perfil
// de la mascota y editarlo desde el dashboard de veterinario o peluquero

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
  
  // Función para actualizar datos de la tienda
  const handleActualizarTienda = async (datosActualizados) => {
    setIsActualizandoTienda(true);
    try {
      // Aquí deberías implementar la función para actualizar en Firebase
      // await actualizarProfesional(usuario.uid, datosActualizados);
      setDatosProfesional(datosActualizados);
      console.log('Tienda actualizada:', datosActualizados);
    } catch (error) {
      console.error('Error al actualizar tienda:', error);
      alert('Error al actualizar la tienda');
    } finally {
      setIsActualizandoTienda(false);
    }
  };

  // Función para manejar la actualización de imagen
  const handleActualizarImagen = async () => {
    if (!archivoImagen) {
      alert('Por favor selecciona una imagen');
      return;
    }

    setIsSubiendoImagen(true);
    try {
      console.log('🔄 Subiendo nueva imagen del local...');
      const nuevaUrlImagen = await subirImagenProfesional(usuario.uid, archivoImagen);
      console.log('✅ Nueva imagen subida:', nuevaUrlImagen);

      // Actualizar en Firestore
      await updateDataCollection('profesionales', usuario.uid, {
        fotoLocalUrl: nuevaUrlImagen
      });

      // Actualizar estado local
      setDatosProfesional(prev => ({
        ...prev,
        fotoLocalUrl: nuevaUrlImagen
      }));

      // Cerrar modal y limpiar estados
      setMostrarModalEditarImagen(false);
      setArchivoImagen(null);
      setUrlImagenLocal('');
      
      alert('¡Imagen del local actualizada exitosamente!');
    } catch (error) {
      console.error('❌ Error al actualizar imagen:', error);
      alert('Error al actualizar la imagen: ' + error.message);
    } finally {
      setIsSubiendoImagen(false);
    }
  };

  // Función para cancelar edición de imagen
  const handleCancelarEdicionImagen = () => {
    setMostrarModalEditarImagen(false);
    setArchivoImagen(null);
    setUrlImagenLocal('');
  };

  // Renderizar contenido específico según tipo de profesional
  const renderContenidoEspecifico = () => {
    if (!datosProfesional) return null;

    switch (datosProfesional.tipoProfesional) {
      case 'tienda':
        return (
          <GestionTienda 
            datosTienda={datosProfesional}
            onActualizarTienda={handleActualizarTienda}
            profesionalId={usuario?.uid}
          />
        );
      case 'veterinario':
      case 'peluquero':
      default:
        return renderContenidoServicios();
    }
  };

  // Renderizar contenido para veterinarios y peluqueros
  const renderContenidoServicios = () => {
    return (
      <>
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
      </>
    );
  };

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
            {datosProfesional?.tipoProfesional === 'tienda' ? 'Dashboard de Tienda' : 'Dashboard Profesional'}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {datosProfesional ? `${datosProfesional.tipoProfesional === 'veterinario' ? 'Dr.' : ''} ${datosProfesional.nombre} - ${datosProfesional.especialidad}` : 'Cargando...'}
          </p>
        </div>

                {/* Información del Profesional */}
        {datosProfesional && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {datosProfesional.tipoProfesional === 'tienda' ? 'Mi Información de Tienda' : 'Mi Información Profesional'}
            </h3>
            
            {/* Imagen del local */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-600">
                  {datosProfesional.fotoLocalUrl ? 'Foto del local' : 'Agregar foto del local'}
                </h4>
                <button
                  onClick={() => setMostrarModalEditarImagen(true)}
                  className="text-xs bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {datosProfesional.fotoLocalUrl ? 'Editar' : 'Agregar'}
                </button>
              </div>
              
              {datosProfesional.fotoLocalUrl ? (
                <div className="relative">
                  <img 
                    src={datosProfesional.fotoLocalUrl} 
                    alt={`Local de ${datosProfesional.nombre}`}
                    className="w-full max-w-md h-48 object-cover rounded-lg shadow-sm"
                  />
                  <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full p-1">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-md h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-sm text-gray-500">Sin foto del local</p>
                    <p className="text-xs text-gray-400">Haz clic en "Agregar" para subir una imagen</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Nombre</p>
                <p className="font-medium">{datosProfesional.nombre}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {datosProfesional.tipoProfesional === 'tienda' ? 'Tipo de Tienda' : 'Especialidad'}
                </p>
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
              {datosProfesional.tipoProfesional !== 'tienda' && (
                <div>
                  <p className="text-sm text-gray-600">Experiencia</p>
                  <p className="font-medium">{datosProfesional.experiencia} años</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contenido específico según tipo de profesional */}
        {renderContenidoEspecifico()}

        {/* Información adicional */}
        {datosProfesional?.tipoProfesional === 'tienda' ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Información para Tiendas
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  Gestiona tus productos y descuentos. El plan gratuito incluye hasta 7 productos. Considera actualizar tu plan para agregar más productos y acceder a funciones premium.
                </p>
              </div>
            </div>
          </div>
        ) : (
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
        )}
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

      {/* Modal para editar imagen del local */}
      {mostrarModalEditarImagen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {datosProfesional?.fotoLocalUrl ? 'Editar foto del local' : 'Agregar foto del local'}
                </h3>
                <button
                  onClick={handleCancelarEdicionImagen}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Componente de carga de imagen */}
              <div className="mb-6">
                <ImageUploaderProfesional
                  onImageSelect={setArchivoImagen}
                  onImageUploaded={setUrlImagenLocal}
                  isCargando={isSubiendoImagen}
                  profesionalId={usuario?.uid}
                  imagenActual={datosProfesional?.fotoLocalUrl}
                />
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3">
                <button
                  onClick={handleCancelarEdicionImagen}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleActualizarImagen}
                  disabled={!archivoImagen || isSubiendoImagen}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubiendoImagen ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Subiendo...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {datosProfesional?.fotoLocalUrl ? 'Actualizar' : 'Agregar'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardProfesional; 