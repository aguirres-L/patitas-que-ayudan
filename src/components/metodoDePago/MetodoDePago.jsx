import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Configuración del CBU (esto lo puedes mover a un archivo de config)
const CONFIG_PAGOS = {
  CBU_CUENTA: '1234567890123456789012', // Reemplaza con tu CBU real
  ALIAS_CUENTA: 'PATITAS.AYUDA', // Reemplaza con tu alias real
  TITULAR_CUENTA: 'Patitas que Ayudan S.A.',
  BANCO: 'Banco de la Nación Argentina'
};

export default function MetodoDePago({ mascotaNombre, monto = 5000, onCerrar }) {
  const navigate = useNavigate();
  const [metodoSeleccionado, setMetodoSeleccionado] = useState('tarjeta');
  const [datosTarjeta, setDatosTarjeta] = useState({
    numero: '',
    nombre: '',
    vencimiento: '',
    cvv: ''
  });
  const [isProcesando, setIsProcesando] = useState(false);
  const [errores, setErrores] = useState({});

  // ... existing validation and formatting functions ...

  const procesarPago = async () => {
    if (metodoSeleccionado === 'tarjeta' && !validarTarjeta()) {
      return;
    }

    setIsProcesando(true);
    
    try {
      // Aquí iría la lógica real de Mercado Pago
      // Por ahora simulamos el proceso
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular éxito
      alert(`¡Pago procesado exitosamente para la chapita de ${mascotaNombre}!`);
      onCerrar(); // Cerrar el modal
      
    } catch (error) {
      alert('Error al procesar el pago. Intenta nuevamente.');
    } finally {
      setIsProcesando(false);
    }
  };

  // ... existing helper functions ...

  return (
    <div className="space-y-6">
      {/* Información del producto */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg p-4 border border-orange-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl">🏷️</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Chapita Personalizada</h4>
            <p className="text-sm text-gray-600">Para: {mascotaNombre}</p>
            <p className="text-lg font-bold text-orange-600">${monto.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Selector de método */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Selecciona tu método de pago
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setMetodoSeleccionado('tarjeta')}
            className={`p-4 border-2 rounded-lg transition-all ${
              metodoSeleccionado === 'tarjeta'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">💳</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-800">Tarjeta</p>
                <p className="text-sm text-gray-600">Débito o Crédito</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setMetodoSeleccionado('transferencia')}
            className={`p-4 border-2 rounded-lg transition-all ${
              metodoSeleccionado === 'transferencia'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🏦</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-800">Transferencia</p>
                <p className="text-sm text-gray-600">Bancaria</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* ... existing form sections ... */}

      {/* Botón de pago */}
      <div className="flex space-x-4">
        <button
          onClick={onCerrar}
          className="flex-1 py-3 px-6 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
        >
          Cancelar
        </button>
        <button
          onClick={procesarPago}
          disabled={isProcesando}
          className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
            isProcesando
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isProcesando ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Procesando...</span>
            </div>
          ) : (
            `Procesar Pago - $${monto.toLocaleString()}`
          )}
        </button>
      </div>

      {/* Información de seguridad */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          🔒 Tus datos están protegidos con encriptación SSL
        </p>
      </div>
    </div>
  );
}