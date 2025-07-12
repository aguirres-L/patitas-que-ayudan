import SliderHome from "./slider/SliderHome";

export default function Hero(){
    return(
        <section className="relative container mx-auto py-12 mt-6 px-4 text-center">
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


          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
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
          
          {/* Enlaces para profesionales */}
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-12">
            <a 
              href="/register-profesional" 
              className="text-orange-600 hover:text-orange-700 transition-colors duration-200 font-medium"
            >
              ¿Eres veterinario o peluquero? Regístrate aquí
            </a>
            <span className="hidden sm:inline text-gray-400">•</span>
            <a 
              href="/login-profesional" 
              className="text-orange-600 hover:text-orange-700 transition-colors duration-200 font-medium"
            >
              Acceso para profesionales
            </a>
          </div>
          
                     {/* Precio destacado */}
           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl max-w-md mx-auto mb-8">
             <div className="text-center">
               <p className="text-sm text-gray-600 mb-2">Chapita de acero grabada con láser</p>
               <div className="text-3xl font-bold text-orange-600 mb-2">$7.000</div>
               <p className="text-sm text-gray-500">Identificación permanente incluida</p>
             </div>
           </div>
        </div>
      </section>
    )
}