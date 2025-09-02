import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useAuth } from '../contexts/AuthContext';
import { obtenerUsuarioPorUid } from '../data/firebase/firebase';
import { SistemaCitas } from './SistemaCitas';
import { EditarMascota } from './EditarMascota';
import typeProfesionalStore from '../service/zustand';
import MetodoDePago from './metodoDePago/MetodoDePago';

// Este componente recibe props a través de useParams
const PetProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {getTipoProfesional} = typeProfesionalStore();

  const { usuario } = useAuth();
  const [pestañaActiva, setPestañaActiva] = useState('informacion');
  const [mascota, setMascota] = useState(null);
  const [isCargando, setIsCargando] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarEdicion, setMostrarEdicion] = useState(false);
  const [mostrarCitas, setMostrarCitas] = useState(false);
  const [isGuardando, setIsGuardando] = useState(false);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [openMetodoPago, setOpenMetodoPago] = useState(false);

  // Cargar datos de la mascota específica
  useEffect(() => {
    console.log(usuario,'usuario');
    
    const tipoProfesional = getTipoProfesional(); 

    console.log(tipoProfesional,'tipoProfesional');
    
    const cargarMascota = async () => {
      if ( !tipoProfesional || tipoProfesional === 'tienda' ) {
        if(!usuario?.uid || !id){
          setError('No se pudo cargar la información de la mascota');
          setIsCargando(false);
          return;
        }
      }

      try {
        setIsCargando(true);
        const datosUsuario = await obtenerUsuarioPorUid(usuario.uid);
        
        if(tipoProfesional === 'tienda'){
          if (!datosUsuario?.infoMascotas) {
            setError('No se encontraron mascotas');
            setIsCargando(false);
            return;
          }
        }

        // Buscar la mascota por ID
        const mascotaEncontrada = datosUsuario.infoMascotas.find(m => m.id === id);
        
        if (!mascotaEncontrada) {
          setError('Mascota no encontrada');
          setIsCargando(false);
          return;
        }

        setMascota(mascotaEncontrada);
      } catch (error) {
        console.error('Error al cargar mascota:', error);
        setError('Error al cargar la información de la mascota');
      } finally {
        setIsCargando(false);
      }
    };

    cargarMascota();
  }, [usuario?.uid, id]);


  const handleMetodoPago = () => {
    setOpenMetodoPago(!openMetodoPago);
  }


  // Si está cargando, mostrar spinner
  if (isCargando) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 pt-16">
        <Navbar tipo="dashboard" />
        <div className="relative container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              <p className="mt-4 text-gray-600">Cargando perfil de mascota...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si hay error, mostrar mensaje
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 pt-16">
        <Navbar tipo="dashboard" />
        <div className="relative container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
            <p className="text-red-700 mb-4">{error}</p>
{/*             <Link 
              to="/dashboard" 
              className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver al Dashboard
            </Link>
 */}          </div>
        </div>
      </div>
    );
  }

  // Función para manejar la actualización de la mascota
  const handleGuardarMascota = () => {
    setMostrarEdicion(false);
    // Recargar los datos de la mascota
    window.location.reload();
  };

  // Si no hay mascota, no debería llegar aquí pero por seguridad
  if (!mascota) {
    return null;
  }

  
  // Función para abrir el modal con la foto
  const abrirModal = () => {
    setModalAbierto(true);
    document.body.style.overflow = 'hidden'; // Deshabilitar scroll
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setModalAbierto(false);
    document.body.style.overflow = 'auto'; // Habilitar scroll
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 pt-16">
      {/* Fondo decorativo - Responsivo */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Elementos decorativos solo en pantallas medianas y grandes */}
        <div className="hidden md:block absolute -top-20 -right-20 w-40 h-40 lg:w-60 lg:h-60 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="hidden md:block absolute -bottom-20 -left-20 w-40 h-40 lg:w-60 lg:h-60 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="hidden lg:block absolute top-20 left-20 w-40 h-40 lg:w-60 lg:h-60 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Elementos decorativos para móviles - más pequeños */}
        <div className="md:hidden absolute top-2 right-2 w-16 h-16 bg-orange-200 rounded-full mix-blend-multiply filter blur-lg opacity-50 animate-blob"></div>
        <div className="md:hidden absolute bottom-2 left-2 w-16 h-16 bg-yellow-200 rounded-full mix-blend-multiply filter blur-lg opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      {/* Navbar modular */}
      <Navbar tipo="dashboard" />

      {/* Modal para la foto */}
      {modalAbierto && (
        <div className="photo-modal">
          <div className="photo-modal-overlay" onClick={cerrarModal}></div>
          <div className="photo-modal-content">
            <button className="photo-modal-close" onClick={cerrarModal}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={mascota.fotoUrl || "/dog-avatar.png"} 
              alt={mascota.nombre} 
              className="photo-modal-image" 
            />
            <div className="photo-modal-caption">
              <p className="text-lg font-semibold">{mascota.nombre}</p>
              <p className="text-sm text-gray-600">{mascota.raza} • {mascota.edad} años</p>
            </div>
          </div>
        </div>
      )}


      {/* Main Content */}
      <div className="relative container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header del Perfil */}
        <div className="mb-6">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors duration-200 mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al Dashboard
          </Link>
        </div>

        {/* Contenido Principal */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
          {/* Encabezado */}
          <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
            <div className="relative">
              <img 
                src={mascota.fotoUrl || "/dog-avatar.png"} 
                alt={mascota.nombre} 
                onClick={abrirModal}
                className="w-24 h-24 rounded-full mr-6 mb-4 md:mb-0 border-4 border-orange-100 shadow-lg object-cover" 
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{mascota.nombre}</h2>
              <p className="text-gray-600 mb-3">{mascota.raza} • {mascota.edad} años</p>
              <div className="flex space-x-2">
                {usuario && (
                  <button 
                    onClick={() => setMostrarEdicion(true)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 text-sm font-medium"
                  >
                    Editar perfil
                  </button>
                )}
                {usuario && (
                  <button 
                    onClick={() => setMostrarCitas(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
                  >
                    Gestionar Citas
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Pestañas */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-4 overflow-x-auto">
              <button 
                onClick={() => setPestañaActiva('informacion')}
                className={`pb-2 font-medium transition-colors duration-200 whitespace-nowrap ${
                  pestañaActiva === 'informacion' 
                    ? 'border-b-2 border-orange-500 text-orange-600' 
                    : 'text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-300'
                }`}
              >
                Información
              </button>
         {/*      <button 
                onClick={() => setPestañaActiva('historial')}
                className={`pb-2 font-medium transition-colors duration-200 whitespace-nowrap ${
                  pestañaActiva === 'historial' 
                    ? 'border-b-2 border-orange-500 text-orange-600' 
                    : 'text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-300'
                }`}
              >
                Historial Médico
              </button> */}
              <button 
                onClick={() => setPestañaActiva('cuidados')}
                className={`pb-2 font-medium transition-colors duration-200 whitespace-nowrap ${
                  pestañaActiva === 'cuidados' 
                    ? 'border-b-2 border-orange-500 text-orange-600' 
                    : 'text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-300'
                }`}
              >
                Cuidados
              </button>
            </div>
          </div>

          {/* Contenido de Pestañas */}
          {pestañaActiva === 'informacion' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Datos Básicos */}
              <div className="bg-white/60 rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Información Básica</h3>
              <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                </div>
                <div>
                      <p className="text-gray-600 text-sm">Nombre</p>
                      <p className="font-medium">{mascota.nombre}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                </div>
                <div>
                      <p className="text-gray-600 text-sm">Raza</p>
                      <p className="font-medium">{mascota.raza}</p>
                </div>
              </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
            </div>
                    <div>
                      <p className="text-gray-600 text-sm">Edad</p>
                      <p className="font-medium">{mascota.edad} años</p>
            </div>
          </div>
                  {mascota.color && (
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                        </svg>
        </div>
                      <div>
                        <p className="text-gray-600 text-sm">Color</p>
                        <p className="font-medium">{mascota.color}</p>
      </div>
    </div>
                  )}
                  {mascota.contacto && (
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                </div>
                <div>
                        <p className="text-gray-600 text-sm">Contacto</p>
                        <p className="font-medium">{mascota.contacto}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* QR */}
              <div className="flex flex-col items-center bg-white/60 rounded-lg p-6 shadow-sm">
                <div className="p-4 mb-4">
                  <img src={mascota.fotoUrl} style={{borderRadius:'50% '}} alt="QR" className="w-48 h-48 object-cover  " />
                </div>
                {/* <div className="text-center mb-4">
                  <p className="text-xs text-gray-500 mb-2">URL pública para compartir:</p>
                  <div className="bg-gray-100 rounded p-2 text-xs font-mono break-all">
                    {window.location.origin}/pet/{mascota.id}
                  </div>
                </div> */}
                <button onClick={handleMetodoPago} className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-200 font-medium shadow-lg transform hover:scale-105">
                  Quiero una chapita para  {mascota.nombre}
                </button>
                <p className="text-sm text-gray-500 mt-3 text-center">
                  {mascota.estadoChapita === true ? 'La chapita para ' + mascota.nombre + '  esta en produccion' : 'La chapita para ' + mascota.nombre + '  ya esta disponible'}</p>
              </div>
            </div>
          )}

          {pestañaActiva === 'historial' && (
            <div className="bg-white/60 rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-gray-900">Historial Médico</h3>
              {mascota.vacunas && mascota.vacunas.length > 0 ? (
                <div className="space-y-4">
                  {mascota.vacunas.map((vacuna, idx) => (
                    <div key={idx} className="border-l-4 border-green-500 pl-4 py-2">
                      <p className="font-medium text-gray-900">{vacuna.nombre}</p>
                      <p className="text-sm text-gray-600">{vacuna.fecha}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No hay registros médicos disponibles</p>
              )}
            </div>
          )}

          {pestañaActiva === 'cuidados' && (
            <div className="bg-white/60 rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-gray-900">Cuidados Especiales</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {mascota.alergias && (
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">Alergias</h4>
                    <p className="text-sm text-red-700">{mascota.alergias}</p>
                  </div>
                )}
                {mascota.enfermedades && (
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Enfermedades</h4>
                    <p className="text-sm text-yellow-700">{mascota.enfermedades}</p>
                  </div>
                )}
                {mascota.notas && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Notas Adicionales</h4>
                    <p className="text-sm text-blue-700">{mascota.notas}</p>
                  </div>
                )}
                {!mascota.alergias && !mascota.enfermedades && !mascota.notas && (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-gray-500">No hay información de cuidados especiales registrada</p>
                </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Edición */}
      {mostrarEdicion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Editar Perfil de {mascota.nombre}</h3>
                <button
                  onClick={() => setMostrarEdicion(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <EditarMascota 
                mascota={mascota}
                tipoProfesional={usuario?.tipoProfesional}
                onGuardar={handleGuardarMascota}
                onCancelar={() => setMostrarEdicion(false)}
                isCargando={isGuardando}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal de Sistema de Citas */}
      {mostrarCitas && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <SistemaCitas 
              mascotaId={mascota.id}
              mascotaNombre={mascota.nombre}
              propietarioId={usuario?.uid}
              propietarioNombre={usuario?.nombre}
              propietarioTelefono={usuario?.telefono}
              onCerrar={() => setMostrarCitas(false)}
            />
          </div>
        </div>
      )}


{openMetodoPago && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Chapita para {mascota.nombre}
                </h3>
                <button
                  onClick={() => setOpenMetodoPago(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <MetodoDePago 
                mascotaNombre={mascota.nombre}
                monto={5000} // Puedes hacer esto dinámico
                onCerrar={() => setOpenMetodoPago(false)}
              />
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default PetProfile; 