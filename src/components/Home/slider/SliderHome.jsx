import React, { useState, useEffect } from 'react';

// imagenes macotas 
import uno from "../../../assets/7.png"
import dos from "../../../assets/8.png"
import tres from "../../../assets/9.png"
import cuatro from "../../../assets/10.png"
import cinco from "../../../assets/11.png"
import seis from "../../../assets/12.png"
import siete from "../../../assets/13.png"
import ocho from "../../../assets/14.png"
import nueve from "../../../assets/15.png"

import perroQr1 from '../../../assets/milopublic.PNG'
import perroQr2 from '../../../assets/morapublic.PNG'
import perroQr3 from '../../../assets/nikypubli.PNG'

import ui1 from '../../../assets/a1.PNG'
import ui2 from '../../../assets/a2.PNG'
import ui3 from '../../../assets/a3.PNG'
import ui4 from '../../../assets/a4.PNG'
import ui5 from '../../../assets/a5.PNG'

import rescate1 from '../../../assets/121.PNG'
import rescate2 from '../../../assets/aa.PNG'
import rescate3 from '../../../assets/cc.PNG'

// Importar imagenes
import perro from '../../../assets/perros_.png'
import perro1 from '../../../assets/perros_1.png'
import perro2 from '../../../assets/perros_2.png'
import perro3 from '../../../assets/perros_3.png'
import perro4 from '../../../assets/perros_4.png'

// Importar imagenes
const urlImages = [uno, cinco, dos, seis, tres, siete, cuatro, ocho, /* nueve */]
const urlImages2 = [perro ,perroQr1, perro2,perroQr3, perro4 ,perroQr2]
const urlImages3= [ui1, ui2, ui3, ui4, ui5]
const urlImages4= [rescate1,rescate2,rescate3]


// Datos de los slides
const datosSlides = [
  {
    id: 1,
    titulo: "Identidad para quien más querés",
    descripcion: "Placas únicas grabadas con láser, donde el nombre y la silueta de tu mascota se convierten en arte.",
    caracteristicas: [
      "Personalización exacta: Transformamos una foto en una ilustración grabada para siempre.",
      "Durabilidad premium: Materiales resistentes a agua, sol y arañazos.",
      "Más que un accesorio: un tributo a su esencia."
    ],
    imagenUrl: urlImages,
   // imagenAlt: "Placa grabada con láser personalizada"
  },
  {
    id: 2,
    titulo: "Reencuentros más rápidos, menos preocupaciones",
    descripcion: "Cada placa incluye un código QR indestructible que conecta al perfil digital de tu mascota.",
    caracteristicas: [
      "Datos vitales en crisis: Contacto del dueño .",
      "Actualización instantánea: Modifica la información en segundos sin cambiar la placa.",
      "Tecnología que protege lo que más amas."
    ],
    imagenUrl: urlImages2,
    imagenAlt: "Persona escaneando QR de la placa"
  },
  {
    id: 3,
    titulo: "Cuidado completo en una plataforma",
    descripcion: "Acceso a nuestro sistema de citas con profesionales registrados en nuestra plataforma.",
    caracteristicas: [
      "Agenda veterinaria: Reserva citas con especialistas registrados en nuestra plataforma.",
     // "Ahorro garantizado: 5% de descuento en alimentos y accesorios.",
      " Lleva el control de vacunas y consultas .",
    ],
    imagenUrl: urlImages3,
    imagenAlt: "App mostrando agenda de citas veterinarias"
  },
  {
    id: 4,
    titulo: "Cuando ganan, todos ganamos",
    descripcion: "Elegir nuestras placas es sumarse a un círculo virtuoso de ayuda.",
    caracteristicas: [
      " Parte de cada compra se transforma en ayuda para animales.",
      " Juntos hacemos que cada rastro lleve a casa.",
      " Tu compra impulsa proyectos de bienestar animal."
    ],
    imagenUrl: urlImages4,
    imagenAlt: "Placa con huellas y símbolo de corazón"
  }
];

// Componente interno para el slider automático de imágenes
function ImageSlider({ imagenes, imagenAlt }) {
  const [imagenActual, setImagenActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setImagenActual((previo) => (previo + 1) % imagenes.length);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(intervalo);
  }, [imagenes.length]);

  return (
    <div className="relative h-full min-h-[350px] sm:min-h-[400px] md:min-h-[400px] lg:min-h-[500px] overflow-hidden">
      {imagenes.map((imagen, index) => (
        <img
          key={index}
          src={imagen}
          alt={`${imagenAlt} ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
            index === imagenActual ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
        />
      ))}
      {/* Overlay gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
    </div>
  );
}

export default function SliderHome() {
  const [slideActual, setSlideActual] = useState(0);

  const irASlide = (indice) => {
    setSlideActual(indice);
  };

  const slideAnterior = () => {
    const nuevoIndice = slideActual === 0 ? datosSlides.length - 1 : slideActual - 1;
    irASlide(nuevoIndice);
  };

  const slideSiguiente = () => {
    const nuevoIndice = (slideActual + 1) % datosSlides.length;
    irASlide(nuevoIndice);
  };

  const slideActualData = datosSlides[slideActual];

  return (
    <section className="relative md:py-16  sm:py-6 lg:py-8">
      <div   className="container mx-auto px-4 sm:px-6 lg:px-1">
        <div  className="max-w-7xl mx-auto">
          {/* Título de la sección */}
          <div className="text-center mb-4 sm:mb-2 lg:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 sm:mb-3">
              ¿Por qué elegir nuestras chapitas?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Más que identificación, una experiencia completa de cuidado y protección
            </p>
          </div>

          {/* Contenedor del slider */}
          <div   className="relative bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row min-h-[600px] sm:min-h-[650px] lg:min-h-[500px]">
              {/* Imagen (izquierda en desktop, arriba en móvil) */}
              <div className="w-full h-[350px] sm:h-[400px] lg:w-1/2 lg:h-auto relative overflow-hidden">
                <ImageSlider 
                  imagenes={slideActualData.imagenUrl} 
                  imagenAlt={slideActualData.imagenAlt}
                />
              </div>

              {/* Contenido (derecha en desktop, abajo en móvil) */}
              <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 xl:p-12 flex flex-col justify-center">
                <div className="space-y-4 sm:space-y-6">
                  {/* Número de slide */}
                  <div className="flex items-center space-x-2">
                    <span className="text-xl sm:text-2xl font-bold text-orange-500">
                      {String(slideActual + 1).padStart(2, '0')}
                    </span>
                    <span className="text-gray-400 text-sm sm:text-base">/ {String(datosSlides.length).padStart(2, '0')}</span>
                  </div>

                  {/* Título */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                    {slideActualData.titulo}
                  </h3>

                  {/* Descripción */}
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    {slideActualData.descripcion}
                  </p>

                  {/* Características */}
                  <ul className="space-y-2 sm:space-y-3">
                    {slideActualData.caracteristicas.map((caracteristica, index) => (
                      <li key={index} className="flex items-start space-x-2 sm:space-x-3">
                        <span className="text-orange-500 text-base sm:text-lg mt-0.5 flex-shrink-0">
                          {index === 0 ? '✨' : index === 1 ? '✅' : index === 2 ? '🩺' : '🤝'}
                        </span>
                        <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{caracteristica}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Botones de navegación - Responsivos */}
            <button
              onClick={slideAnterior}
              className="absolute left-2 sm:left-10 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
              aria-label="Slide anterior"
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={slideSiguiente}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
              aria-label="Slide siguiente"
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indicadores de puntos - Solo en desktop para ahorrar espacio en móvil */}
            {/* <div className="hidden lg:block absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {datosSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => irASlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === slideActual
                      ? 'bg-orange-500 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir al slide ${index + 1}`}
                />
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
