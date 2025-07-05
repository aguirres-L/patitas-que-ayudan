export default function HowItWorks(){
    return(
        <section id="how-it-works" className="relative container mx-auto py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Protección completa para tu mascota y comunicación directa con profesionales
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Paso 1 */}
            <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Registra a tu mascota</h3>
              <p className="text-gray-600 leading-relaxed">
                Crea un perfil completo con fotos, datos médicos y tu información de contacto.
              </p>
            </div>
            
            {/* Paso 2 */}
            <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
                             <h3 className="text-xl font-semibold mb-4 text-gray-800">Recibe tu chapita de acero</h3>
               <p className="text-gray-600 leading-relaxed">
                 Chapita de acero grabada con láser, duradera y profesional con QR único que contiene toda la información de tu mascota.
               </p>
            </div>
            
            {/* Paso 3 */}
            <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Comunicación directa</h3>
              <p className="text-gray-600 leading-relaxed">
                Veterinarios y peluqueros pueden actualizar datos médicos y agendar citas fácilmente.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
}