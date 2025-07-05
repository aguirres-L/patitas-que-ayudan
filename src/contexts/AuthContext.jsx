import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, obtenerUsuarioPorUid, obtenerProfesionalPorUid } from '../data/firebase';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState(null); // 'usuario' o 'profesional'
  const [isCargando, setIsCargando] = useState(true);
  const [isCargandoLogout, setIsCargandoLogout] = useState(false);

  // Función para cerrar sesión
  const cerrarSesion = async () => {
    try {
      setIsCargandoLogout(true);
      await signOut(auth);
      console.log('Usuario cerró sesión exitosamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    } finally {
      setIsCargandoLogout(false);
    }
  };

  // Función para cargar datos del usuario
  const cargarDatosUsuario = async (uid) => {
    try {
      // Intentar cargar como usuario común
      let datos = await obtenerUsuarioPorUid(uid);
      if (datos) {
        setDatosUsuario(datos);
        setTipoUsuario('usuario');
        return;
      }

      // Si no es usuario común, intentar cargar como profesional
      datos = await obtenerProfesionalPorUid(uid);
      if (datos) {
        setDatosUsuario(datos);
        setTipoUsuario('profesional');
        return;
      }

      // Si no se encuentra en ninguna colección
      setDatosUsuario(null);
      setTipoUsuario(null);
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
      setDatosUsuario(null);
      setTipoUsuario(null);
    }
  };

  // Escuchar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuario) => {
      setUsuario(usuario);
      
      if (usuario) {
        await cargarDatosUsuario(usuario.uid);
      } else {
        setDatosUsuario(null);
        setTipoUsuario(null);
      }
      
      setIsCargando(false);
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  // Valor del contexto
  const valor = {
    usuario,
    datosUsuario,
    tipoUsuario,
    isCargando,
    isCargandoLogout,
    cerrarSesion,
    isAutenticado: !!usuario,
    esProfesional: tipoUsuario === 'profesional',
    esUsuario: tipoUsuario === 'usuario'
  };

  return (
    <AuthContext.Provider value={valor}>
      {children}
    </AuthContext.Provider>
  );
}; 