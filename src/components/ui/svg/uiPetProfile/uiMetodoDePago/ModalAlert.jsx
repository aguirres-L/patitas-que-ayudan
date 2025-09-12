import DecoracionForm from "../../../../decoracionUi/DecoracionForm";



export default function ModalAlert({ typeAlert, mensaje, onCerrar }) {

    // Alerta informativa para errores de pago (tono amable, no dramático)
    if (typeAlert === 'error') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
                <div role="dialog" aria-modal="true" className="relative w-full max-w-lg overflow-hidden bg-white rounded-2xl shadow-2xl">
                    <DecoracionForm className="z-0" />
                    <div className="relative z-10">
                    <div className="flex items-start justify-between p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 via-yellow-50 to-pink-50">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.75 6.75a.75.75 0 011.5 0v5a.75.75 0 01-1.5 0v-5zm.75 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                            </span>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{mensaje?.tipo || 'No pudimos completar el pago'}</h3>
                                <p className="text-sm font-medium text-gray-600">No se realizó ningún cobro. Revisá tu método de pago e intentá nuevamente.</p>
                            </div>
                        </div>
                        <button
                            onClick={onCerrar}
                            aria-label="Cerrar"
                            className="p-2 text-gray-400 transition-colors hover:text-gray-600"
                        >
                            ×
                        </button>
                    </div>
                    <div className="p-6">
                        <p className="text-gray-700">{mensaje?.mensaje}</p>
                    </div>
                    <div className="flex justify-end gap-3 p-4 bg-gray-50">
                        <button
                            onClick={onCerrar}
                            className="px-4 py-2 text-sm font-semibold text-white transition-colors rounded-lg bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
                        >
                            Entendido
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }

    // Alerta para próximas actualizaciones (tono profesional)
    if (typeAlert === 'nextUpdate') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
                <div role="dialog" aria-modal="true" className="relative w-full max-w-lg overflow-hidden bg-white rounded-2xl shadow-2xl">
                <DecoracionForm className="z-0" />
                    <div className="relative z-10">
                    
                    <div className="flex items-start justify-between p-4 bg-gray-800 bg-opacity-60">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-10 h-10 rounded-full text-pink-600">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M12 2a1 1 0 01.894.553l1.618 3.236 3.57.519a1 1 0 01.554 1.705l-2.584 2.52.61 3.557a1 1 0 01-1.451 1.054L12 13.89l-3.211 1.689a1 1 0 01-1.451-1.054l.61-3.557-2.584-2.52a1 1 0 01.554-1.705l3.57-.519L11.106 2.553A1 1 0 0112 2z" />
                                </svg>
                            </span>
                            <div>
                                <h3 className="text-lg font-bold text-gray-100">Funcionalidad en desarrollo</h3>
                                <p className="text-sm font-medium text-gray-200">Estamos trabajando para que esté disponible pronto.</p>
                            </div>
                        </div>
                        <button
                            onClick={onCerrar}
                            aria-label="Cerrar"
                            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                            >
                            x
                        </button>
                    </div>
                    <div className="p-6 bg-gray-800 bg-opacity-60">
                        <p className="text-gray-100">Gracias por tu paciencia. Queremos ofrecerte la mejor experiencia.</p>
                    </div>
                    <div className="flex justify-end gap-3 p-4 bg-gray-800 bg-opacity-60">
                        <button
                            onClick={onCerrar}
                            className="px-4 py-2 text-sm font-semibold text-white transition-colors rounded-lg bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
                        >
                            Entendido
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }


    if (typeAlert === 'success') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
            <div role="dialog" aria-modal="true" className="relative w-full max-w-lg overflow-hidden bg-white rounded-2xl shadow-2xl">
            <DecoracionForm className="z-0" />
                <div className="relative z-10">
                
                <div className="flex items-start justify-between p-4 bg-gray-800 bg-opacity-60">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-10 h-10 rounded-full text-pink-600">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M12 2a1 1 0 01.894.553l1.618 3.236 3.57.519a1 1 0 01.554 1.705l-2.584 2.52.61 3.557a1 1 0 01-1.451 1.054L12 13.89l-3.211 1.689a1 1 0 01-1.451-1.054l.61-3.557-2.584-2.52a1 1 0 01.554-1.705l3.57-.519L11.106 2.553A1 1 0 0112 2z" />
                            </svg>
                        </span>
                        <div>
                            <h3 className="text-lg font-bold text-gray-100">Pago realizado con éxito</h3>
                            <p className="text-sm font-medium text-gray-200">Gracias por tu pago. Tu mascota recibira su chapita en la brevedad.</p>
                        </div>
                    </div>
                    <button
                        onClick={onCerrar}
                        aria-label="Cerrar"
                        className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                        >
                        x
                    </button>
                </div>
                <div className="p-6 bg-gray-800 bg-opacity-60">
                    <p className="text-gray-100">Gracias por tu pago. Tu mascota recibira su chapita en la brevedad.</p>
                </div>
                <div className="flex justify-end gap-3 p-4 bg-gray-800 bg-opacity-60">
                    <button
                        onClick={onCerrar}
                        className="px-4 py-2 text-sm font-semibold text-white transition-colors rounded-lg bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    >
                        Volver al perfil
                    </button>
                </div>
                </div>
            </div>
        </div>
        );
    }

    return null;
}