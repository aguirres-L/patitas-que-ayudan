import React, { useState, useEffect, useRef } from 'react';

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
      "Datos vitales en crisis: Contacto del dueño disponible al instante cuando más se necesita.",
      "Actualización instantánea: Modifica la información en segundos sin cambiar la placa física.",
      "Tecnología avanzada que protege lo que más amas en todo momento."
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
      "Control total: Lleva el registro de vacunas y consultas médicas.",
      "Cuidado integral para tu mascota en un solo lugar."
    ],
    imagenUrl: urlImages3,
    imagenAlt: "App mostrando agenda de citas veterinarias"
  },
  {
    id: 4,
    titulo: "Cuando ganan, todos ganamos",
    descripcion: "Elegir nuestras placas es sumarse a un círculo virtuoso de ayuda.",
    caracteristicas: [
      "Parte de cada compra se transforma en ayuda directa para animales necesitados.",
      "Juntos hacemos que cada rastro lleve a casa de forma segura y confiable.",
      "Tu compra impulsa proyectos de bienestar animal en toda la comunidad."
    ],
    imagenUrl: urlImages4,
    imagenAlt: "Placa con huellas y símbolo de corazón"
  }
];

// Componente interno para el slider de imágenes con scroll horizontal
function ImageSlider({ imagenes, imagenAlt }) {
  const scrollContainerRef = useRef(null);
  const [imagenActual, setImagenActual] = useState(0);

  // Scroll suave al hacer clic en los indicadores
  const irAImagen = (indice) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const imageWidth = container.offsetWidth;
      container.scrollTo({
        left: indice * imageWidth,
        behavior: 'smooth'
      });
      setImagenActual(indice);
    }
  };

  // Detectar scroll para actualizar imagen actual
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const imageWidth = container.offsetWidth;
    const scrollLeft = container.scrollLeft;
    const newImageIndex = Math.round(scrollLeft / imageWidth);
    
    if (newImageIndex !== imagenActual && newImageIndex >= 0 && newImageIndex < imagenes.length) {
      setImagenActual(newImageIndex);
    }
  };

  return (
    <div className="relative h-full min-h-[350px] sm:min-h-[400px] md:min-h-[400px] lg:min-h-[500px] overflow-hidden">
      {/* Contenedor de scroll horizontal para las imágenes */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth h-full"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {imagenes.map((imagen, index) => (
          <div 
            key={index}
            className="flex-shrink-0 w-full snap-start"
            style={{ minWidth: '100%' }}
          >
            <img
              src={imagen}
              alt={`${imagenAlt} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Overlay gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none"></div>
      
      {/* Indicadores de imágenes - centrados en la parte inferior */}
      <div className="absolute p-2 bg-black/50 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {imagenes.map((_, index) => (
          <button
            key={index}
            onClick={() => irAImagen(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === imagenActual
                ? 'bg-blue-500 scale-125 shadow-lg'
                : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Ir a la imagen ${index + 1}`}
          />
        ))}
      </div>
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
    <section className="relative md:py-16 sm:py-6 lg:py-8">

      <div className="container mx-auto px-2 sm:px-1 lg:px-1">
        <div className="max-w-7xl mx-auto">
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
          <div className="relative">
            {/* Versión móvil con navegación por botones */}
            <div className="lg:hidden"> 

              {/* Card del slider */}
              <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="flex flex-col min-h-[650px]">
                  {/* Imagen */}
                  <div className="h-[350px] sm:h-[400px] relative overflow-hidden">
                    <ImageSlider 
                      imagenes={datosSlides[slideActual].imagenUrl} 
                      imagenAlt={datosSlides[slideActual].imagenAlt}
                    />
                  </div>

                  {/* Contenido */}
                  <div className="p-10 sm:p-14 flex flex-col justify-center flex-1">
                    <div className="space-y-4 sm:space-y-6">
                      {/* Header con número y indicadores */}
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl sm:text-2xl font-bold text-orange-500">
                            {String(slideActual + 1).padStart(2, '0')}
                          </span>
                          <span className="text-gray-400 text-sm sm:text-base">/ {String(datosSlides.length).padStart(2, '0')}</span>
                        </div>
                        
                        {/* Indicador de progreso */}
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-orange-500 rounded-full transition-all duration-500 ease-out"
                              style={{ 
                                width: `${((slideActual + 1) / datosSlides.length) * 100}%`
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Título */}
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                        {datosSlides[slideActual].titulo}
                      </h3>

                      {/* Descripción */}
                      <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                        {datosSlides[slideActual].descripcion}
                      </p>

                      {/* Características */}
                      <ul className="space-y-2 sm:space-y-3">
                        {datosSlides[slideActual].caracteristicas.map((caracteristica, idx) => (
                          <li key={idx} className="flex items-start space-x-2 sm:space-x-3">
                            <span className="text-orange-500 text-base sm:text-lg mt-0.5 flex-shrink-0">
                              {idx === 0 ? '✨' : idx === 1 ? '✅' : idx === 2 ? '🩺' : '🤝'}
                            </span>
                            <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{caracteristica}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Indicadores de puntos móvil */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  {datosSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => irASlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                        index === slideActual
                          ? 'bg-orange-500 scale-125 shadow-lg'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Ir al slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Botones de navegación móvil - POSICIÓN FIJA */}
            <div className="lg:hidden">
              <div className="absolute top-1/2 left-[-12px] transform -translate-y-1/2 z-20">
                <button
                  onClick={slideAnterior}
                  className="w-10 h-10 bg-white/95 hover:bg-white rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 border border-gray-200"
                  aria-label="Slide anterior"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>

              <div className="absolute top-1/2 right-[-12px] transform -translate-y-1/2 z-20">
                <button
                  onClick={slideSiguiente}
                  className="w-10 h-10 bg-white/95 hover:bg-white rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 border border-gray-200"
                  aria-label="Slide siguiente"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Versión desktop con botones de navegación */}
            <div className="hidden lg:flex flex-row min-h-[500px]">
              {/* Imagen (izquierda en desktop) */}
              <div className="w-1/2 h-auto relative overflow-hidden">
                <ImageSlider 
                  imagenes={slideActualData.imagenUrl} 
                  imagenAlt={slideActualData.imagenAlt}
                />
              </div>

              {/* Contenido (derecha en desktop) */}
              <div className="w-1/2 p-8 xl:p-12 flex flex-col justify-center">
                <div className="space-y-6">
                  <div className="flex flex-row">
                    {/* Número de slide */}
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-orange-500">
                        {String(slideActual + 1).padStart(2, '0')}
                      </span>
                      <span className="text-gray-400 text-base">/ {String(datosSlides.length).padStart(2, '0')}</span>
                    </div>
                  </div>

                  {/* Título */}
                  <h3 className="text-3xl font-bold z-10 text-gray-800 leading-tight">
                    {slideActualData.titulo}
                  </h3>

                  {/* Descripción */}
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {slideActualData.descripcion}
                  </p>

                  {/* Características */}
                  <ul className="space-y-3">
                    {slideActualData.caracteristicas.map((caracteristica, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="text-orange-500 text-lg mt-0.5 flex-shrink-0">
                          {index === 0 ? '✨' : index === 1 ? '✅' : index === 2 ? '🩺' : '🤝'}
                        </span>
                        <span className="text-base text-gray-700 leading-relaxed">{caracteristica}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Botones de navegación desktop */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <button
                  onClick={slideAnterior}
                  className="w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="Slide anterior"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>

              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <button
                  onClick={slideSiguiente}
                  className="w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="Slide siguiente"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Indicadores de puntos - Solo en desktop */}
          <div className="hidden lg:block bg-white w-auto p-3 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
          </div>
        </div>
      </div>
    </section>
  );
}
