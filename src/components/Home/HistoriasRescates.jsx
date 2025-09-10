import React, { useState } from 'react';

// Este componente no recibe props
const historiasRescate = [
  {
    id: 1,
    imagen: 'https://media.a24.com/p/5ea1366ab57e090f86abf5037da6b60e/adjuntos/296/imagenes/009/462/0009462750/533x300/smart/batata-perrita-rescatadajpg.jpg',
    titulo: 'Luna encontró su hogar después de 2 años en la calle',
    descripcion: 'Esta hermosa perrita fue rescatada en condiciones críticas de desnutrición y abandono. Su transformación es un testimonio del poder del amor y la dedicación.',
    nombreMascota: 'Luna',
    edad: '3 años',
    raza: 'Mezcla',
    historia: 'Luna fue encontrada desnutrida y con heridas en las patas en las afueras de la ciudad. Después de 6 meses de cuidados veterinarios intensivos, rehabilitación física y mucho amor, finalmente encontró una familia que la adora. Hoy es una perrita feliz que disfruta de largos paseos y mimos interminables.',
    fechaRescate: '15 de Marzo, 2024',
    estado:false,
    tiempoRescate: '6 meses'
  },
  {
    id: 2,
    imagen: 'https://estaticos.elcolombiano.com/binrepository/580x435/0c0/580d365/none/11101/BXVN/whatsapp-image-2021-05-07-at-6-11-50-pm_37681142_20210507183811.jpg',
    titulo: 'Max: De la desesperación a la felicidad',
    descripcion: 'Un perro abandonado en un parque industrial encontró una segunda oportunidad gracias al trabajo incansable de nuestro equipo de rescate.',
    nombreMascota: 'Max',
    edad: '2 años',
    raza: 'Golden Retriever',
    historia: 'Max fue rescatado de un parque industrial donde vivía solo, buscando comida entre la basura. Sufría de ansiedad severa y desconfiaba de los humanos. Con paciencia y técnicas de socialización, Max aprendió a confiar nuevamente. Ahora es el compañero inseparable de una familia con niños, demostrando que el amor puede curar las heridas más profundas.',
    fechaRescate: '22 de Febrero, 2024',
    estado:false,
    tiempoRescate: '4 meses'
  },
  {
    id: 3,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRCt6ca2YOOyWETvQNkHid8qOO0CLcQMSgwRkIbZdH7dWasJ1NDafKyHAJhh5XFi5HSO0',
    titulo: 'Bella: Una transformación milagrosa',
    descripcion: 'Esta gatita demostró que el amor todo lo puede, superando problemas respiratorios graves para convertirse en una mascota saludable.',
    nombreMascota: 'Bella',
    edad: '1 año',
    raza: 'Gato doméstico',
    historia: 'Bella llegó con problemas respiratorios graves que los veterinarios consideraron críticos. Requirió cirugía de emergencia y cuidados intensivos durante semanas. Los veterinarios trabajaron incansablemente y hoy es una gatita saludable y juguetona que ronronea constantemente. Su caso inspiró a muchos a no rendirse ante las dificultades.',
    fechaRescate: '8 de Enero, 2024',
    estado:true,
    tiempoRescate: '3 meses'
  },
  {
    id: 4,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLouz96v0Y9K9pbDjAg7jpusVn8aLa58YMOXsixcLv5M4gUVwNb9w5A5Ttxbj2P6RAou8',
    titulo: 'Rocky: El guerrero que nunca se rindió',
    descripcion: 'Con solo 3 patas, Rocky demostró que las limitaciones físicas no son obstáculo para la felicidad y el amor.',
    nombreMascota: 'Rocky',
    edad: '4 años',
    raza: 'Pitbull',
    historia: 'Rocky llegó con una pata gravemente herida que requirió amputación. A pesar del trauma, su espíritu nunca se quebró. Aprendió a moverse con agilidad y se convirtió en un ejemplo de resiliencia. Su nueva familia lo adora por su valentía y determinación.',
    fechaRescate: '10 de Diciembre, 2023',
    estado:true,
    tiempoRescate: '5 meses'
  },
  {
    id: 5,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDZNEXEh1jSi3WbN00yZm2pG9iIXRN-IAMmit_R2kT382jQMSMJPTUF2wBtI34uPS5ooI',
    titulo: 'Mia: La princesa que conquistó corazones',
    descripcion: 'Esta pequeña gatita sorda demostró que las discapacidades no son limitaciones para encontrar amor y felicidad.',
    nombreMascota: 'Mia',
    edad: '2 años',
    raza: 'Gato blanco',
    historia: 'Mia nació sorda, pero eso nunca la detuvo. Aprendió a comunicarse a través de vibraciones y gestos. Su familia adoptiva se adaptó perfectamente a sus necesidades especiales, creando señales visuales para comunicarse. Hoy es una gatita feliz que disfruta de la vida al máximo.',
    fechaRescate: '5 de Noviembre, 2023',
    estado:true,
    tiempoRescate: '2 meses'
  },
  {
    id: 6,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV_QoaS0Qf0DEr3k9Qt3BlJ0-P8ii9dkIEx3C4Xxsjcv7bAx4AesGrCavpd0FtjwrCqUE',
    titulo: 'Thor: El gigante gentil que encontró su lugar',
    descripcion: 'Este perro grande intimidaba por su tamaño, pero su corazón era más grande que sus miedos.',
    nombreMascota: 'Thor',
    edad: '5 años',
    raza: 'Gran Danés',
    historia: 'Thor fue abandonado por su tamaño intimidante. Muchos lo rechazaban sin conocer su naturaleza gentil. Finalmente, una familia con experiencia en perros grandes lo adoptó. Hoy es el guardián más amoroso de la casa, demostrando que el tamaño no define el corazón.',
    fechaRescate: '20 de Octubre, 2023',
    estado:true,
    tiempoRescate: '7 meses'
  }
];

export default function HistoriasRescates() {
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirNoticia = (noticia) => {
    setNoticiaSeleccionada(noticia);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setNoticiaSeleccionada(null);
  };


  // Función para abrir WhatsApp con mensaje personalizado
  const infoAdoptar = (mascota = null) => {
    // Número de WhatsApp (reemplaza con el número real de tu organización)
    const numeroWhatsApp = '5491112345678'; // Formato: código país + código área + número
    
    // Mensaje base
    let mensaje = '¡Hola! Estoy interesado en adoptar una mascota de Patitas que Ayudan. ';
    
    // Si hay una mascota específica, personalizar el mensaje
    console.log(mascota,'mascota');
    if (mascota) {
      mensaje += `Me llamó especialmente la atención la historia de ${mascota.nombreMascota} (${mascota.raza}, ${mascota.edad}). `;
      mensaje += `¿Podrían darme más información sobre el proceso de adopción?`;
    } else {
      mensaje += '¿Podrían ayudarme a encontrar la mascota perfecta para mi familia?';
    }
    
    // Codificar el mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Crear URL de WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
    
    // Abrir WhatsApp en nueva pestaña
    window.open(urlWhatsApp, '_blank');
  };

  return (
    <section className="relative container mx-auto md:py-20 py-12 mt-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Historias de rescates
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conoce las increíbles transformaciones de nuestras mascotas rescatadas. 
            Cada historia es una prueba de que el amor y la dedicación pueden cambiar vidas.
          </p>
        </div>

        {/* Grid de noticias */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {historiasRescate.map((noticia) => (
            <article 
              key={noticia.id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => abrirNoticia(noticia)}
            >
              {/* Imagen */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={noticia.imagen}
                  alt={noticia.titulo}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    noticia.estado === false 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {noticia.estado ? 'Adoptado' : 'Disponible'}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {noticia.fechaRescate}
                  </span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {noticia.titulo}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {noticia.descripcion}
                </p>

                {/* Info rápida de la mascota */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>🐾 {noticia.nombreMascota}</span>
                  <span>�� {noticia.tiempoRescate}</span>
                </div>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 text-sm">
                  Leer historia completa
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* CTA de adopción */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">
            ¿Te conmovió alguna de estas historias? Cada mascota merece una segunda oportunidad.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg">
            ¡Adopta una mascota!
          </button>
        </div>
      </div>

      {/* Modal de noticia completa */}
      {mostrarModal && noticiaSeleccionada && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header del modal */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-start">
              <div>
                <span className="inline-block bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full mb-2">
                  {noticiaSeleccionada.fechaRescate}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {noticiaSeleccionada.titulo}
                </h2>
              </div>
              <button
                onClick={cerrarModal}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Imagen */}
                <div className="relative">
                  <img
                    src={noticiaSeleccionada.imagen}
                    alt={noticiaSeleccionada.titulo}
                    className="w-full h-80 object-contain rounded-lg"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      noticiaSeleccionada.estado === 'Adoptada' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {noticiaSeleccionada.estado}
                    </span>
                  </div>
                </div>

                {/* Información detallada */}
                <div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Sobre {noticiaSeleccionada.nombreMascota}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Edad:</span>
                        <span className="font-medium text-gray-700">{noticiaSeleccionada.edad}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Raza:</span>
                        <span className="font-medium text-gray-700">{noticiaSeleccionada.raza}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Tiempo de rescate:</span>
                        <span className="font-medium text-gray-700">{noticiaSeleccionada.tiempoRescate}</span>
                      </div>
                    </div>
                  </div>

                  <h5 className="font-semibold text-gray-800 mb-3">La historia completa</h5>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {noticiaSeleccionada.historia}
                  </p>
                </div>
              </div>

              {/* Footer del modal */}
             
            { noticiaSeleccionada.estado === false ? (
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <button onClick={() => infoAdoptar(noticiaSeleccionada)} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                  ¡Quiero adoptar una mascota como esta!
                </button>
              </div>
            ):(
              ''
            )}

            </div>
          </div>
        </div>
      )}
    </section>
  );
}