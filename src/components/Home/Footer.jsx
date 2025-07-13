export default function Footer(){
    return(
        <footer className="relative bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          {/* Logo y descripción */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold">PatitasQueAyudan</h3>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Protegiendo mascotas y ayudando a las que más lo necesitan. 
              El 50% de nuestros ingresos se destina a fundaciones de rescate animal.
            </p>
          </div>

          {/* Enlaces de navegación */}
          <div className="flex justify-center space-x-8 text-sm text-gray-400 mb-8">
            <a href="/about" className="hover:text-white transition-colors duration-200 font-medium">
              Acerca de
            </a>
            <a href="/login" className="hover:text-white transition-colors duration-200 font-medium">
              Iniciar Sesión
            </a>
            <a href="/register" className="hover:text-white transition-colors duration-200 font-medium">
              Registrarse
            </a>
            
          </div>

          {/* Información adicional */}
          <div className="border-t border-gray-700 pt-8 ">
            <div className="grid md:grid-cols-3 gap-6 text-center ">
              <div>
                <h4 className="font-semibold mb-2 text-orange-400">🐾 Nuestra Misión</h4>
                <p className="text-sm text-gray-400">
                  Conectar el cuidado de mascotas con el rescate de animales en situación de calle.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-pink-400">💝 Ayuda </h4>
                <p className="text-sm text-gray-400">
                  Cada chapita y servicio contribuye al rescate y rehabilitación de mascotas.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-yellow-400">📞 Contacto</h4>
                <p className="text-sm text-gray-400">
                  info@patitasqueayudan.com<br/>
                  ¿Tienes preguntas? ¡Escríbenos!
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 pt-6 mt-8 text-center">
            <p className="text-xs text-gray-500">
              © 2024 PatitasQueAyudan. Todos los derechos reservados. 
              Haciendo del mundo un lugar mejor para las mascotas.
            </p>
          </div>
        </div>
      </footer>
    )
}