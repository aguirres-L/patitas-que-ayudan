import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navbar } from './Navbar';
import { FormularioCitaVeterinaria } from './FormularioCitaVeterinaria';
import { FormularioCitaPeluqueria } from './FormularioCitaPeluqueria';
import Peluquerias from './Peluquerias';
import Veterinarias from './Veterinarias';
import { agregarMascotaAUsuario, obtenerUsuarioPorUid, obtenerProfesionalesPorTipo, eliminarCita, actualizarCita } from '../data/firebase/firebase';
import { FormularioMascota } from './FormularioMascota';

const Dashboard = () => {
  const navigate = useNavigate();
  const { usuario, cerrarSesion, isCargandoLogout } = useAuth();
  
  // Estados para controlar los modales
  const [mostrarFormularioVeterinaria, setMostrarFormularioVeterinaria] = useState(false);
  const [mostrarFormularioPeluqueria, setMostrarFormularioPeluqueria] = useState(false);
  const [clinicaSeleccionada, setClinicaSeleccionada] = useState(null);
  const [peluqueriaSeleccionada, setPeluqueriaSeleccionada] = useState(null);
  const [isCargandoMascota, setIsCargandoMascota] = useState(false);
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [isCargandoUsuario, setIsCargandoUsuario] = useState(false);
  const [mostrarFormularioMascota, setMostrarFormularioMascota] = useState(false);

  // Estados para profesionales
  const [veterinarios, setVeterinarios] = useState([]);
  const [peluqueros, setPeluqueros] = useState([]);
  const [isCargandoVeterinarios, setIsCargandoVeterinarios] = useState(false);
  const [isCargandoPeluqueros, setIsCargandoPeluqueros] = useState(false);
  const [citasCancelando, setCitasCancelando] = useState(new Set()); // Para controlar qué citas se están cancelando

  // Datos simulados de mascotas del usuario
  const mascotasUsuario = [
    {
      id: 1,
      nombre: "Firulais",
      raza: "Labrador",
      edad: 3
    },
    {
      id: 2,
      nombre: "Luna",
      raza: "Golden Retriever",
      edad: 2
    },
    {
      id: 3,
      nombre: "Rocky",
      raza: "Bulldog Francés",
      edad: 1
    }
  ];

  // Función para mapear datos de profesionales al formato esperado por los componentes
  const mapearProfesionalAVeterinaria = (profesional) => ({
    id: profesional.id,
    nombre: profesional.nombre,
    direccion: profesional.direccion,
    telefono: profesional.telefono,
    especialidades: profesional.especialidad ? [profesional.especialidad] : [],
    horario: profesional.horario || 'Horario no disponible',
    calificacion: 4.5, // Valor por defecto, se puede implementar sistema de calificaciones después
    distancia: 'Distancia no disponible' // Se puede implementar geolocalización después
  });

  const mapearProfesionalAPeluqueria = (profesional) => ({
    id: profesional.id,
    nombre: profesional.nombre,
    direccion: profesional.direccion,
    telefono: profesional.telefono,
    servicios: profesional.especialidad ? [profesional.especialidad] : [],
    horario: profesional.horario || 'Horario no disponible',
    calificacion: 4.5, // Valor por defecto
    distancia: 'Distancia no disponible'
  });

  // Función para cargar profesionales
  const cargarProfesionales = async () => {
    setIsCargandoVeterinarios(true);
    setIsCargandoPeluqueros(true);
    
    try {
      // Cargar veterinarios
      const veterinariosData = await obtenerProfesionalesPorTipo('veterinario');
      const veterinariosMapeados = veterinariosData.map(mapearProfesionalAVeterinaria);
      setVeterinarios(veterinariosMapeados);
      
      // Cargar peluqueros
      const peluquerosData = await obtenerProfesionalesPorTipo('peluquero');
      const peluquerosMapeados = peluquerosData.map(mapearProfesionalAPeluqueria);
      setPeluqueros(peluquerosMapeados);
      
    } catch (error) {
      console.error("Error al cargar profesionales:", error);
    } finally {
      setIsCargandoVeterinarios(false);
      setIsCargandoPeluqueros(false);
    }
  };

  // Cargar profesionales cuando el componente se monta
  useEffect(() => {
    cargarProfesionales();
  }, []);

  // Función para cerrar sesión
  const handleCerrarSesion = async () => {
    try {
      await cerrarSesion();
      navigate('/login'); // Redirigir al login
    } catch (error) {
      alert('Error al cerrar sesión. Inténtalo de nuevo.');
    }
  };

  // Funciones para manejar los formularios
  const manejarAbrirFormularioVeterinaria = (clinica) => {
    setClinicaSeleccionada(clinica);
    setMostrarFormularioVeterinaria(true);
  };

  const manejarAbrirFormularioPeluqueria = (peluqueria) => {
    setPeluqueriaSeleccionada(peluqueria);
    setMostrarFormularioPeluqueria(true);
  };

  const manejarEnviarCitaVeterinaria = (datosCita) => {
    console.log('Cita veterinaria enviada:', datosCita);
    // Aquí iría la lógica para enviar a la API
    alert('¡Cita veterinaria agendada exitosamente!');
    setMostrarFormularioVeterinaria(false);
    setClinicaSeleccionada(null);
  };

  const manejarEnviarCitaPeluqueria = (datosCita) => {
    console.log('Cita peluquería enviada:', datosCita);
    // La cita ya se guardó en Firebase, solo mostrar confirmación
    alert('¡Cita de peluquería reservada exitosamente!');
    setMostrarFormularioPeluqueria(false);
    setPeluqueriaSeleccionada(null);
  };

  // Función para cargar datos del usuario desde Firestore
  const cargarDatosUsuario = async () => {
    if (!usuario?.uid) return;
    
    setIsCargandoUsuario(true);
    try {
      const datos = await obtenerUsuarioPorUid(usuario.uid);
      setDatosUsuario(datos);
    } catch (error) {
      console.error("Error al cargar datos del usuario:", error);
    } finally {
      setIsCargandoUsuario(false);
    }
  };

  // Cargar datos del usuario cuando el componente se monta
  useEffect(() => {
    cargarDatosUsuario();
  }, [usuario?.uid]);

  // Función para cancelar una cita
  const handleCancelarCita = async (cita) => {
    if (!confirm('¿Estás seguro de que quieres cancelar esta cita?')) {
      return;
    }

    // Agregar la cita al set de citas cancelando
    setCitasCancelando(prev => new Set(prev).add(cita.id));

    try {
      if (cita.id) {
        // Si la cita tiene un ID de Firebase, la eliminamos directamente
        await eliminarCita(cita.id);
        console.log('Cita eliminada de Firebase:', cita.id);
      } else {
        // Si no tiene ID (cita local), la marcamos como cancelada
        await actualizarCita(cita.id || Date.now().toString(), {
          ...cita,
          estado: 'cancelada',
          fechaCancelacion: new Date()
        });
        console.log('Cita marcada como cancelada:', cita);
      }

      // Recargar datos del usuario para actualizar la UI
      await cargarDatosUsuario();
      
      alert('Cita cancelada exitosamente');
    } catch (error) {
      console.error('Error al cancelar cita:', error);
      alert('Error al cancelar la cita. Inténtalo de nuevo.');
    } finally {
      // Remover la cita del set de citas cancelando
      setCitasCancelando(prev => {
        const nuevoSet = new Set(prev);
        nuevoSet.delete(cita.id);
        return nuevoSet;
      });
    }
  };

  // Función para agregar mascota usando la función centralizada
  const handleAgregarMascota = async (mascota) => {
    setIsCargandoMascota(true);
    try {
      await agregarMascotaAUsuario(usuario.uid, mascota); // Usar el uid de Firebase Auth
      // Recargar datos del usuario después de agregar mascota
      await cargarDatosUsuario();
      // Cerrar el modal después de agregar exitosamente
      setMostrarFormularioMascota(false);
    } catch (e) {
      console.error("Error al agregar mascota:", e);
      alert("Error al agregar mascota");
    }
    setIsCargandoMascota(false);
  };


  
  console.log(datosUsuario,'datosUsuario');
  

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
            Bienvenido a tu Dashboard
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Gestiona tus mascotas y encuentra servicios veterinarios y de peluquería
          </p>
        </div>

        {/* Sección de Mascotas */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Tus Mascotas</h3>
          
          {isCargandoUsuario ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <p className="mt-2 text-gray-600">Cargando mascotas...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Tarjetas de Mascotas desde Firestore */}
              {(datosUsuario?.infoMascotas || []).map((mascota, idx) => (
                <Link 
                  key={mascota.id || idx} 
                  to={`/pet-profile/${mascota.id || idx}`}
                  className="bg-white p-4 rounded-lg shadow-sm border border-orange-100 hover:shadow-md hover:border-orange-300 transition-all duration-200 cursor-pointer group"
                >
                  {/* Header con foto si existe */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
                        {mascota.nombre}
                      </h4>
                      <p className="text-gray-600 text-sm">{mascota.raza} • {mascota.edad} años</p>
                    </div>
                    {mascota.fotoUrl && (
                      <img 
                        src={mascota.fotoUrl} 
                        alt={mascota.nombre}
                        className="w-12 h-12 rounded-full object-cover ml-2"
                      />
                    )}
                  </div>
                  
                  {/* Información básica */}
                  <div className="space-y-1 mb-3">
                    {mascota.color && (
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">Color:</span> {mascota.color}
                      </p>
                    )}
                    {mascota.contacto && (
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">Contacto:</span> {mascota.contacto}
                      </p>
                    )}
                  </div>
                  
                  {/* Vacunas */}
                  {mascota.vacunas && mascota.vacunas.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-gray-700 mb-1">Vacunas:</p>
                      <div className="flex flex-wrap gap-1">
                        {mascota.vacunas.map((vacuna, vIdx) => (
                          <span key={vIdx} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            {vacuna.nombre}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Alergias y enfermedades */}
                  {(mascota.alergias || mascota.enfermedades) && (
                    <div className="mb-3">
                      {mascota.alergias && (
                        <p className="text-xs text-gray-500 mb-1">
                          <span className="font-medium">Alergias:</span> {mascota.alergias}
                        </p>
                      )}
                      {mascota.enfermedades && (
                        <p className="text-xs text-gray-500">
                          <span className="font-medium">Enfermedades:</span> {mascota.enfermedades}
                        </p>
                      )}
                    </div>
                  )}
                  
                  {/* Notas */}
                  {mascota.notas && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">Notas:</span> {mascota.notas}
                      </p>
                    </div>
                  )}
                  
                  {/* Indicador de click */}
                  <div className="flex items-center justify-end mt-2">
                    <span className="text-xs text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver perfil →
                    </span>
                  </div>
                </Link>
              ))}
              
              {/* Botón para agregar nueva mascota */}
              <div className="p-4 rounded-lg border-2 border-dashed border-orange-300 flex items-center justify-center hover:border-orange-400 hover:bg-orange-50 transition-colors cursor-pointer"
                   onClick={() => setMostrarFormularioMascota(true)}>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl text-orange-600 font-bold">+</span>
                  </div>
                  <p className="text-sm text-orange-600 font-medium">Agregar Mascota</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sección de Citas */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Mis Citas</h3>
          
          {isCargandoUsuario ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <p className="mt-2 text-gray-600">Cargando citas...</p>
            </div>
          ) : (
            <div>
              {(datosUsuario?.citas && datosUsuario.citas.length > 0) ? (
                <div className="space-y-4">
                  {datosUsuario.citas.map((cita, index) => (
                    <div key={cita.id || index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
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
                                {cita.peluqueriaNombre || cita.veterinariaNombre || 'Profesional no especificado'}
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
                            className={`px-3 py-1 rounded text-xs transition-colors duration-200 ${
                              citasCancelando.has(cita.id) 
                                ? 'bg-gray-400 text-white cursor-not-allowed' 
                                : 'bg-red-500 text-white hover:bg-red-600'
                            }`}
                            onClick={() => handleCancelarCita(cita)}
                            disabled={citasCancelando.has(cita.id)}
                          >
                            {citasCancelando.has(cita.id) ? 'Cancelando...' : 'Cancelar'}
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
                  <p className="text-gray-600">No tienes citas programadas</p>
                  <p className="text-sm text-gray-500 mt-1">Agenda una cita con un veterinario o peluquero</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sección de Suscripción */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 mb-8 text-white">
          <h3 className="font-bold text-xl mb-2">Suscripción Premium</h3>
          <p className="mb-4 text-green-100">Desbloquea acceso para veterinarios y peluqueros por solo $5.000/mes.</p>
          <button className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors duration-200 font-medium">
            Activar
          </button>
        </div>

        {/* Sección de Clínicas Veterinarias */}
        <Veterinarias 
          clinicasVeterinarias={veterinarios} 
          manejarAbrirFormularioVeterinaria={manejarAbrirFormularioVeterinaria}
          isCargando={isCargandoVeterinarios}
        />

        {/* Sección de Peluquerías */}
        <Peluquerias 
          peluquerias={peluqueros} 
          manejarAbrirFormularioPeluqueria={manejarAbrirFormularioPeluqueria}
          isCargando={isCargandoPeluqueros}
        />
      </div>

      {/* Modales de Formularios */}
      {mostrarFormularioVeterinaria && clinicaSeleccionada && (
        <FormularioCitaVeterinaria
          clinica={clinicaSeleccionada}
          mascotas={datosUsuario?.infoMascotas || []}
          onCerrar={() => {
            setMostrarFormularioVeterinaria(false);
            setClinicaSeleccionada(null);
          }}
          onEnviar={manejarEnviarCitaVeterinaria}
        />
      )}

      {mostrarFormularioPeluqueria && peluqueriaSeleccionada && (
        <FormularioCitaPeluqueria
          peluqueria={peluqueriaSeleccionada}
          mascotas={datosUsuario?.infoMascotas || []}
          onCerrar={() => {
            setMostrarFormularioPeluqueria(false);
            setPeluqueriaSeleccionada(null);
          }}
          onEnviar={manejarEnviarCitaPeluqueria}
        />
      )}

      {/* Modal para agregar mascota */}
      {mostrarFormularioMascota && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Agregar Nueva Mascota</h3>
                <button
                  onClick={() => setMostrarFormularioMascota(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <FormularioMascota 
                onAgregarMascota={handleAgregarMascota} 
                isCargando={isCargandoMascota} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 