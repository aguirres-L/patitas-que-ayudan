export default function DetailPagoChapita({ obtenerColorEstado, pagosChapitas, typeTheme, isCargandoPagos, formatearMoneda, formatearFecha }){
    
    return(
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

  
    )
}