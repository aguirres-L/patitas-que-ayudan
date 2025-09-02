import SliderHome from "./slider/SliderHome";
import HistoriasRescates from "./HistoriasRescates.jsx";

export default function Hero(){
    return(
        <section className="relative container mx-auto md:py-20 py-12 mt-6 px-4 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800  leading-tight">
            Protege a tu mascota y{' '}
            <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              ayuda a rescatar
            </span>{' '}
            a otras mascotas perdidas
          </h1>
          {/* <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Chapitas de acero grabadas con láser que protegen a tu mejor amigo y ayudan a rescatar animales en situación de calle
          </p> */}

          
          <SliderHome/>


          <div className="flex flex-col mt-10 sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <a 
              href="/register" 
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold text-lg"
            >
              Proteger a mi mascota
            </a>
            <a 
              href="#how-it-works" 
              className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-lg hover:bg-orange-50 transition-all duration-200 transform hover:scale-105 font-semibold text-lg"
            >
              Ver cómo funciona
            </a>
          </div>
          
          {/* Sección para profesionales - Más visible y atractiva */}
          {/* <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mt-12 mb-8 border border-blue-100"> */}
          <div className=" p-8 mt-12 mb-8 ">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              ¿Eres veterinarias, peluquerías o tiendas de mascotas?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Únete a nuestra red de veterinarias, peluquerías y tiendas de mascotas
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">🏥</div>
                <h3 className="font-semibold text-gray-800 mb-2">Veterinarios</h3>
                <p className="text-sm text-gray-600 mb-3">Ofrece servicios y ayuda a mascotas perdidas</p>
                <a 
                  href="/register-profesional" 
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                >
                  Registrarse
                </a>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">✂️</div>
                <h3 className="font-semibold text-gray-800 mb-2">Peluqueros</h3>
                <p className="text-sm text-gray-600 mb-3">Cuida y embellece a las mascotas de la comunidad</p>
                <a 
                  href="/register-profesional" 
                  className="inline-block bg-purple-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-600 transition-colors"
                >
                  Registrarse
                </a>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">🛍️</div>
                <h3 className="font-semibold text-gray-800 mb-2">Tiendas de Mascotas</h3>
                <p className="text-sm text-gray-600 mb-3">Vende alimentos y accesorios para mascotas</p>
                <a 
                  href="/register-profesional" 
                  className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors"
                >
                  Registrarse
                </a>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 mb-3">¿Ya tienes cuenta?</p>
              <a 
                href="/login-profesional" 
            //    className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold transition-colors"
              className=" inline-flex items-center  bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg border border-blue-400"

              >
                <span>Acceder a mi panel de servicios</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          
                     {/* Precio destacado */}
      {/*      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl max-w-md mx-auto mb-8">
             <div className="text-center">
               <p className="text-sm text-gray-600 mb-2">Chapita de acero grabada con láser</p>
               <div className="text-3xl font-bold text-orange-600 mb-2">$7.000</div>
               <p className="text-sm text-gray-500">Identificación permanente incluida</p>
             </div>
           </div> */}

           <HistoriasRescates/>
        </div>
      </section>
    )
}