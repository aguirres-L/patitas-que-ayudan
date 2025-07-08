import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth';
import { auth, addDataWithCustomId } from '../data/firebase';
import { useAuth } from '../contexts/AuthContext';

// Este componente no recibe props
const RegisterProfesional = () => {
  const navigate = useNavigate();
  const { isAutenticado } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '', 
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    tipoProfesional: 'veterinario', // 'veterinario' o 'peluquero'
    especialidad: '',
    direccion: '',
    horario: '',
    experiencia: '',
    licencia: ''
  });
  const [isCargando, setIsCargando] = useState(false);
  const [error, setError] = useState('');

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAutenticado) {
      navigate('/dashboardProfesional');
    }
  }, [isAutenticado, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsCargando(true);

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setIsCargando(false);
      return;
    }

    // Validar teléfono (mínimo 8 dígitos)
    const telefonoLimpio = formData.telefono.replace(/[^\d]/g, '');
    if (telefonoLimpio.length < 8) {
      setError('El teléfono debe tener al menos 8 dígitos');
      setIsCargando(false);
      return;
    }

    try {
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );

      // Actualizar el perfil del usuario con el nombre
      await updateProfile(userCredential.user, {
        displayName: formData.nombre
      });

      // Guardar datos del profesional en Firestore
      await addDataWithCustomId('profesionales', userCredential.user.uid, {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        tipoProfesional: formData.tipoProfesional,
        especialidad: formData.especialidad,
        direccion: formData.direccion,
        horario: formData.horario,
        experiencia: formData.experiencia,
        licencia: formData.licencia,
        rol: 'profesional',
        fechaRegistro: new Date(),
        estado: 'activo'
      });

      console.log('Profesional registrado exitosamente:', userCredential.user);
      navigate('/dashboardProfesional');
      
    } catch (error) {
      console.error('Error al registrar profesional:', error);
      
      // Manejar errores específicos de Firebase
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('El correo electrónico ya está en uso');
          break;
        case 'auth/weak-password':
          setError('La contraseña es muy débil');
          break;
        case 'auth/invalid-email':
          setError('El correo electrónico no es válido');
          break;
        default:
          setError('Error al crear la cuenta. Inténtalo de nuevo.');
      }
    } finally {
      setIsCargando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validación específica para teléfono
    if (name === 'telefono') {
      const telefonoLimpio = value.replace(/[^\d\s\-\+]/g, '');
      setFormData({
        ...formData,
        [name]: telefonoLimpio
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hidden md:block absolute -top-20 -right-20 w-40 h-40 lg:w-60 lg:h-60 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="hidden md:block absolute -bottom-20 -left-20 w-40 h-40 lg:w-60 lg:h-60 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="hidden lg:block absolute top-20 left-20 w-40 h-40 lg:w-60 lg:h-60 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="md:hidden absolute top-2 right-2 w-16 h-16 bg-orange-200 rounded-full mix-blend-multiply filter blur-lg opacity-50 animate-blob"></div>
        <div className="md:hidden absolute bottom-2 left-2 w-16 h-16 bg-yellow-200 rounded-full mix-blend-multiply filter blur-lg opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative w-full max-w-md lg:max-w-lg">
        {/* Logo y título */}
        <div className="text-center mb-6">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg mb-4">
            <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            PatitasQueAyudan
          </h1>
          <p className="text-gray-600 mb-2">
            Para profesionales veterinarios y peluqueros
          </p>
          <h2 className="text-xl font-semibold text-gray-800">
            Registro Profesional
          </h2>
        </div>
        
        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md shadow-sm mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Formulario */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Tipo de Profesional */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Profesional
            </label>
            <select
              name="tipoProfesional"
              value={formData.tipoProfesional}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              disabled={isCargando}
            >
              <option value="veterinario">Veterinario</option>
              <option value="peluquero">Peluquero</option>
            </select>
          </div>

          {/* Nombre */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre completo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Tu nombre completo"
                value={formData.nombre}
                onChange={handleChange}
                disabled={isCargando}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isCargando}
              />
            </div>
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="+34 123 456 789"
                value={formData.telefono}
                onChange={handleChange}
                disabled={isCargando}
              />
            </div>
          </div>

          {/* Especialidad */}
          <div>
            <label htmlFor="especialidad" className="block text-sm font-medium text-gray-700 mb-2">
              Especialidad
            </label>
            <input
              id="especialidad"
              name="especialidad"
              type="text"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder={formData.tipoProfesional === 'veterinario' ? 'Cirugía, Dermatología, etc.' : 'Corte de raza, Baño terapéutico, etc.'}
              value={formData.especialidad}
              onChange={handleChange}
              disabled={isCargando}
            />
          </div>

          {/* Dirección */}
          <div>
            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-2">
              Dirección del establecimiento
            </label>
            <input
              id="direccion"
              name="direccion"
              type="text"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Av. Principal 123, Ciudad"
              value={formData.direccion}
              onChange={handleChange}
              disabled={isCargando}
            />
          </div>

          {/* Horario */}
          <div>
            <label htmlFor="horario" className="block text-sm font-medium text-gray-700 mb-2">
              Horario de atención
            </label>
            <input
              id="horario"
              name="horario"
              type="text"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Lun-Vie: 9:00-18:00, Sáb: 9:00-14:00"
              value={formData.horario}
              onChange={handleChange}
              disabled={isCargando}
            />
          </div>

          {/* Años de experiencia */}
          <div>
            <label htmlFor="experiencia" className="block text-sm font-medium text-gray-700 mb-2">
              Años de experiencia
            </label>
            <input
              id="experiencia"
              name="experiencia"
              type="number"
              min="0"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="5"
              value={formData.experiencia}
              onChange={handleChange}
              disabled={isCargando}
            />
          </div>

          {/* Número de licencia */}
          <div>
            <label htmlFor="licencia" className="block text-sm font-medium text-gray-700 mb-2">
              Número de licencia profesional
            </label>
            <input
              id="licencia"
              name="licencia"
              type="text"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Número de licencia o registro profesional"
              value={formData.licencia}
              onChange={handleChange}
              disabled={isCargando}
            />
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={handleChange}
                disabled={isCargando}
              />
            </div>
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Repite tu contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isCargando}
              />
            </div>
          </div>

          {/* Botón de registro */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isCargando}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-105 shadow-lg"
            >
              {isCargando ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creando cuenta profesional...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Crear cuenta profesional</span>
                </div>
              )}
            </button>
          </div>

          {/* Enlaces */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta profesional?{' '}
              <Link 
                to="/login-profesional" 
                className="font-medium text-orange-600 hover:text-orange-500 transition-colors duration-200"
              >
                Inicia sesión aquí
              </Link>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              ¿Eres usuario común?{' '}
              <Link 
                to="/register" 
                className="font-medium text-orange-600 hover:text-orange-500 transition-colors duration-200"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>

          {/* Información adicional */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Como profesional podrás acceder a los perfiles de mascotas para actualizar información médica y de cuidados.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterProfesional; 