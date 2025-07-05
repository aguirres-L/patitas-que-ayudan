import React, { useState } from 'react';

// Este componente no recibe props opcionales.
export const FormularioMascota = ({onAgregarMascota, isCargando }) => {
  // Tabs
  const [tab, setTab] = useState(0);

  // Identificación simple
  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [color, setColor] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [contacto, setContacto] = useState('');

  // Detalles avanzados
  const [vacunas, setVacunas] = useState([{ nombre: '', fecha: '' }]);
  const [alergias, setAlergias] = useState('');
  const [enfermedades, setEnfermedades] = useState('');
  const [notas, setNotas] = useState('');

  // Función para generar ID único
  const generarIdUnico = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `${timestamp}-${random}`;
  };

  // Animación simple para tabs
  const tabClasses = (active) =>
    `px-4 py-2 rounded-t-lg font-semibold transition-all duration-300 ${
      active
        ? 'bg-orange-500 text-white shadow-lg scale-105'
        : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
    }`;

  // Manejo de vacunas dinámicas
  const handleVacunaChange = (idx, field, value) => {
    const nuevasVacunas = vacunas.map((v, i) =>
      i === idx ? { ...v, [field]: value } : v
    );
    setVacunas(nuevasVacunas);
  };
  const agregarVacuna = () => setVacunas([...vacunas, { nombre: '', fecha: '' }]);
  const eliminarVacuna = (idx) =>
    setVacunas(vacunas.filter((_, i) => i !== idx));

  // Envío
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !raza || !edad) return;
    
    const mascotaConId = {
      id: generarIdUnico(), // Generar ID único
      nombre,
      raza,
      edad: Number(edad),
      color,
      fotoUrl,
      contacto,
      vacunas: vacunas.filter(v => v.nombre && v.fecha),
      alergias,
      enfermedades,
      notas,
      fechaCreacion: new Date().toISOString(), // Agregar fecha de creación
    };
    
    onAgregarMascota(mascotaConId);
    
    // Limpia el formulario
    setNombre('');
    setRaza('');
    setEdad('');
    setColor('');
    setFotoUrl('');
    setContacto('');
    setVacunas([{ nombre: '', fecha: '' }]);
    setAlergias('');
    setEnfermedades('');
    setNotas('');
    setTab(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-2 sm:p-4 md:p-6 space-y-4"
    >
      {/* Tabs responsivos */}
      <div className="flex flex-col sm:flex-row border-b border-orange-200 mb-4">
        <button
          type="button"
          className={tabClasses(tab === 0) + " w-full sm:w-auto mb-2 sm:mb-0"}
          onClick={() => setTab(0)}
        >
          Identificación
        </button>
        <button
          type="button"
          className={tabClasses(tab === 1) + " w-full sm:w-auto"}
          onClick={() => setTab(1)}
        >
          Detalles avanzados
        </button>
      </div>

      {/* Tab content */}
      <div className="transition-all duration-500">
        {tab === 0 && (
          <div className="animate-fade-in flex flex-col gap-3">
            <input
              className="border rounded px-3 py-2 w-full text-base"
              placeholder="Nombre"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full text-base"
              placeholder="Raza"
              value={raza}
              onChange={e => setRaza(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full text-base"
              placeholder="Edad"
              type="number"
              min="0"
              value={edad}
              onChange={e => setEdad(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full text-base"
              placeholder="Color"
              value={color}
              onChange={e => setColor(e.target.value)}
            />
            <input
              className="border rounded px-3 py-2 w-full text-base"
              placeholder="Foto (URL)"
              value={fotoUrl}
              onChange={e => setFotoUrl(e.target.value)}
            />
         {/*    <input
              className="border rounded px-3 py-2 w-full text-base"
              placeholder="Contacto de emergencia"
              value={contacto}
              onChange={e => setContacto(e.target.value)}
            /> */}
          </div>
        )}

        {tab === 1 && (
          <div className="animate-fade-in flex flex-col gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Vacunas</label>
              {vacunas.map((vacuna, idx) => (
                <div key={idx} className="flex ms:w-1/2 flex-col flex-row gap-2 mb-2">
                  <input
                    className="border rounded px-3 py-2 flex-1 text-base"
                    placeholder="Nombre vacuna"
                    value={vacuna.nombre}
                    onChange={e =>
                      handleVacunaChange(idx, 'nombre', e.target.value)
                    }
                  />
                  <input
                    className="border rounded px-3 py-2 flex-1 text-base"
                    type="date"
                    value={vacuna.fecha}
                    onChange={e =>
                      handleVacunaChange(idx, 'fecha', e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="text-red-500 font-bold px-2"
                    onClick={() => eliminarVacuna(idx)}
                    tabIndex={-1}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="text-orange-600 hover:underline text-sm"
                onClick={agregarVacuna}
              >
                + Agregar vacuna
              </button>
            </div>
            <input
              className="border rounded px-3 py-2 w-full text-base"
              placeholder="Alergias"
              value={alergias}
              onChange={e => setAlergias(e.target.value)}
            />
            <input
              className="border rounded px-3 py-2 w-full text-base"
              placeholder="Enfermedades"
              value={enfermedades}
              onChange={e => setEnfermedades(e.target.value)}
            />
            <textarea
              className="border rounded px-3 py-2 w-full text-base"
              placeholder="Notas adicionales"
              value={notas}
              onChange={e => setNotas(e.target.value)}
              rows={2}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-3 rounded w-full font-semibold shadow-md hover:bg-orange-600 transition-all duration-300 text-base"
        disabled={isCargando}
      >
        {isCargando ? 'Agregando...' : 'Agregar Mascota'}
      </button>

      {/* Animación fade-in (Tailwind + CSS) */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.5s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </form>
  );
}; 