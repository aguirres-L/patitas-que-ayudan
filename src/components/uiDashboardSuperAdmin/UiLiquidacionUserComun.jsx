import React, { useState, useEffect } from 'react';
import { useTheme } from "../../contexts/ThemeContext";
import { getAllDataCollection } from '../../data/firebase/firebase';

// Este componente no recibe props
export default function UiLiquidacionesUserComun({ setIsShowLiquidaciones, usuario }) {
  const { typeTheme } = useTheme();
  
  // Estados para los pagos
  const [pagosSuscripciones, setPagosSuscripciones] = useState([]);
  const [pagosChapitas, setPagosChapitas] = useState([]);
  const [isCargandoPagos, setIsCargandoPagos] = useState(false);

  // Función para formatear fecha
  const formatearFecha = (timestamp) => {
    if (!timestamp) return 'N/A';
    if (timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return new Date(timestamp).toLocaleDateString('es-CL');
  };

  // Función para formatear moneda
  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(valor);
  };

  // Función para obtener el color del estado
  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case 'confirmado': return 'bg-green-100 text-green-800 border-green-200';
      case 'pendiente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rechazado': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  console.log(usuario.id,'usuario.id');
  
  // Función para cargar pagos del usuario
  const cargarPagosUsuario = async () => {
    if (!usuario?.id) {
      console.log('No hay usuario.id:', usuario);
      return;
    }
    
    console.log('Buscando pagos para usuario.id:', usuario.id);
    setIsCargandoPagos(true);
    try {
      // Cargar pagos de suscripciones
      const suscripciones = await getAllDataCollection('pagoSuscripciones');
      console.log('Todas las suscripciones:', suscripciones);
      const suscripcionesUsuario = suscripciones.filter(pago => pago.usuarioId === usuario.id);
      console.log('Suscripciones filtradas:', suscripcionesUsuario);
      setPagosSuscripciones(suscripcionesUsuario);

      // Cargar pagos de chapitas
      const chapitas = await getAllDataCollection('pagoChapita');
      console.log('Todas las chapitas:', chapitas);
      const chapitasUsuario = chapitas.filter(pago => pago.usuarioId === usuario.id);
      console.log('Chapitas filtradas:', chapitasUsuario);
      
      setPagosChapitas(chapitasUsuario);
    } catch (error) {
      console.error('Error al cargar pagos:', error);
    } finally {
      setIsCargandoPagos(false);
    }
  };

  // Cargar pagos cuando el componente se monta
  useEffect(() => {
    cargarPagosUsuario();
  }, [usuario?.id]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${
          typeTheme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          Historial de Pagos
        </h2>
        <button 
          className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          onClick={() => setIsShowLiquidaciones(false)}
        >
          Volver al Detalle de Usuario
        </button>
      </div>

      {/* Información del usuario */}
      <div className={`rounded-xl p-4 ${
        typeTheme === 'light' ? 'bg-blue-50' : 'bg-blue-900/20'
      }`}>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-lg font-bold text-blue-600">
              {usuario?.displayName ? usuario.displayName.charAt(0) : usuario?.email?.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${
              typeTheme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              {usuario?.displayName || usuario?.nombre || 'Usuario'}
            </h3>
            <p className={`text-sm ${
              typeTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {usuario?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Grid de dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Columna 1: Pagos de Suscripción */}
        <div className={`rounded-xl p-6 ${
          typeTheme === 'light' ? 'bg-gray-50' : 'bg-gray-700'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-semibold ${
              typeTheme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              💳 Suscripciones Mensuales
            </h3>
            <span className={`text-sm px-3 py-1 rounded-full ${
              typeTheme === 'light' ? 'bg-blue-100 text-blue-800' : 'bg-blue-900 text-blue-200'
            }`}>
              {pagosSuscripciones.length} pagos
            </span>
          </div>

          {isCargandoPagos ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className={`mt-2 text-sm ${
                typeTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Cargando suscripciones...
              </p>
            </div>
          ) : pagosSuscripciones.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💳</span>
              </div>
              <p className={`text-sm ${
                typeTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                No hay pagos de suscripción registrados
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {pagosSuscripciones.map((pago, index) => (
                <div key={pago.id || index} className={`rounded-lg p-4 border ${
                  typeTheme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-600 border-gray-500'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className={`font-semibold ${
                        typeTheme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        Suscripción Mensual
                      </h4>
                      <p className={`text-sm ${
                        typeTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        ID: {pago.id || 'N/A'}
                      </p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${obtenerColorEstado(pago.estado)}`}>
                      {pago.estado || 'pendiente'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className={`font-medium ${
                        typeTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Monto:
                      </label>
                      <p className={`font-bold ${
                        typeTheme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {formatearMoneda(pago.monto || 5000)}
                      </p>
                    </div>
                    <div>
                      <label className={`font-medium ${
                        typeTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Método:
                      </label>
                      <p className={`${
                        typeTheme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {pago.metodoPago || 'transferencia'}
                      </p>
                    </div>
                    <div>
                      <label className={`font-medium ${
                        typeTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Fecha:
                      </label>
                      <p className={`${
                        typeTheme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {formatearFecha(pago.fechaPago)}
                      </p>
                    </div>
                    <div>
                      <label className={`font-medium ${
                        typeTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Tipo:
                      </label>
                      <p className={`${
                        typeTheme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {pago.tipo || 'suscripcion_mensual'}
                      </p>
                    </div>
                  </div>

                  {pago.metodoPago === 'transferencia' && (
                    <div className={`mt-3 p-3 rounded ${
                      typeTheme === 'light' ? 'bg-gray-100' : 'bg-gray-600'
                    }`}>
                      <p className={`text-xs font-medium ${
                        typeTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Datos de Transferencia:
                      </p>
                      <p className={`text-xs ${
                        typeTheme === 'light' ? 'text-gray-800' : 'text-gray-200'
                      }`}>
                        CBU: {pago.cbuDestino || 'N/A'} | Alias: {pago.aliasDestino || 'N/A'}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Columna 2: Pagos de Chapitas */}
        <div className={`rounded-xl p-6 ${
          typeTheme === 'light' ? 'bg-gray-50' : 'bg-gray-700'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-semibold ${
              typeTheme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              🏷️ Chapitas de Identificación
            </h3>
            <span className={`text-sm px-3 py-1 rounded-full ${
              typeTheme === 'light' ? 'bg-orange-100 text-orange-800' : 'bg-orange-900 text-orange-200'
            }`}>
              {pagosChapitas.length} pagos
            </span>
          </div>

          {isCargandoPagos ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <p className={`mt-2 text-sm ${
                typeTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Cargando chapitas...
              </p>
            </div>
          ) : pagosChapitas.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏷️</span>
              </div>
              <p className={`text-sm ${
                typeTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                No hay pagos de chapitas registrados
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {pagosChapitas.map((pago, index) => (
                <div key={pago.id || index} className={`rounded-lg p-4 border ${
                  typeTheme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-600 border-gray-500'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className={`font-semibold ${
                        typeTheme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        Chapita Personalizada
                      </h4>
                      <p className={`text-sm ${
                        typeTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Para: {pago.mascotaNombre || 'Mascota'}
                      </p>
                      <p className={`text-xs ${
                        typeTheme === 'light' ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        ID: {pago.id || 'N/A'}
                      </p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${obtenerColorEstado(pago.estado)}`}>
                      {pago.estado || 'pendiente'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className={`font-medium ${
                        typeTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Monto:
                      </label>
                      <p className={`font-bold ${
                        typeTheme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {formatearMoneda(pago.monto || 7000)}
                      </p>
                    </div>
                    <div>
                      <label className={`font-medium ${
                        typeTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Método:
                      </label>
                      <p className={`${
                        typeTheme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {pago.metodoPago || 'transferencia'}
                      </p>
                    </div>
                    <div>
                      <label className={`font-medium ${
                        typeTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Fecha:
                      </label>
                      <p className={`${
                        typeTheme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {formatearFecha(pago.fechaPago)}
                      </p>
                    </div>
                    <div>
                      <label className={`font-medium ${
                        typeTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Usuario:
                      </label>
                      <p className={`${
                        typeTheme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {pago.usuarioNombre || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {pago.metodoPago === 'transferencia' && (
                    <div className={`mt-3 p-3 rounded ${
                      typeTheme === 'light' ? 'bg-gray-100' : 'bg-gray-600'
                    }`}>
                      <p className={`text-xs font-medium ${
                        typeTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Datos de Transferencia:
                      </p>
                      <p className={`text-xs ${
                        typeTheme === 'light' ? 'text-gray-800' : 'text-gray-200'
                      }`}>
                        CBU: {pago.cbuDestino || 'N/A'} | Alias: {pago.aliasDestino || 'N/A'}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Resumen de pagos */}
      <div className={`rounded-xl p-6 ${
        typeTheme === 'light' ? 'bg-gradient-to-r from-blue-50 to-orange-50' : 'bg-gradient-to-r from-blue-900/20 to-orange-900/20'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          typeTheme === 'light' ? 'text-gray-900' : 'text-white'
        }`}>
          📊 Resumen de Pagos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={`text-center p-4 rounded-lg ${
            typeTheme === 'light' ? 'bg-white' : 'bg-gray-700'
          }`}>
            <p className={`text-2xl font-bold ${
              typeTheme === 'light' ? 'text-blue-600' : 'text-blue-400'
            }`}>
              {pagosSuscripciones.length}
            </p>
            <p className={`text-sm ${
              typeTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Suscripciones
            </p>
          </div>
          <div className={`text-center p-4 rounded-lg ${
            typeTheme === 'light' ? 'bg-white' : 'bg-gray-700'
          }`}>
            <p className={`text-2xl font-bold ${
              typeTheme === 'light' ? 'text-orange-600' : 'text-orange-400'
            }`}>
              {pagosChapitas.length}
            </p>
            <p className={`text-sm ${
              typeTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Chapitas
            </p>
          </div>
          <div className={`text-center p-4 rounded-lg ${
            typeTheme === 'light' ? 'bg-white' : 'bg-gray-700'
          }`}>
            <p className={`text-2xl font-bold ${
              typeTheme === 'light' ? 'text-green-600' : 'text-green-400'
            }`}>
              {formatearMoneda(
                pagosSuscripciones.reduce((total, pago) => total + (pago.monto || 5000), 0) +
                pagosChapitas.reduce((total, pago) => total + (pago.monto || 7000), 0)
              )}
            </p>
            <p className={`text-sm ${
              typeTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Total Pagado
            </p>
          </div>
          <div className={`text-center p-4 rounded-lg ${
            typeTheme === 'light' ? 'bg-white' : 'bg-gray-700'
          }`}>
            <p className={`text-2xl font-bold ${
              typeTheme === 'light' ? 'text-purple-600' : 'text-purple-400'
            }`}>
              {pagosSuscripciones.length + pagosChapitas.length}
            </p>
            <p className={`text-sm ${
              typeTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Total Pagos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}