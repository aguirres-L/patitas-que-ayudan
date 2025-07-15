import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  query,
  where,
  orderBy,
  limit,
  setDoc,
  arrayUnion
} from "firebase/firestore";
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from "firebase/storage";
import { db, storage } from "./firebaseConfig";

/**
 * Crea una nueva colección en Firestore
 * @param {string} nombreColeccion - Nombre de la colección a crear
 * @param {Object} datos - Datos iniciales para el primer documento
 * @returns {Promise<string>} - ID del documento creado
 */
export const createCollectionFirebase = async (nombreColeccion, datos) => {
  try {
    const docRef = await addDoc(collection(db, nombreColeccion), {
      ...datos,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    });
    console.log(`Colección ${nombreColeccion} creada con ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error("Error al crear la colección:", error);
    throw error;
  }
};

/**
 * Añade datos a una colección existente
 * @param {string} nombreColeccion - Nombre de la colección
 * @param {Object} datos - Datos a añadir
 * @returns {Promise<string>} - ID del documento creado
 */
export const addDataCollection = async (nombreColeccion, datos) => {
  try {
    const docRef = await addDoc(collection(db, nombreColeccion), {
      ...datos,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    });
    console.log(`Documento añadido a ${nombreColeccion} con ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error("Error al añadir datos:", error);
    throw error;
  }
};

/**
 * Elimina un documento de una colección usando su ID
 * @param {string} nombreColeccion - Nombre de la colección
 * @param {string} idFirestore - ID del documento a eliminar
 * @returns {Promise<void>}
 */
export const deleteDataCollection = async (nombreColeccion, idFirestore) => {
  try {
    await deleteDoc(doc(db, nombreColeccion, idFirestore));
    console.log(`Documento ${idFirestore} eliminado de ${nombreColeccion}`);
  } catch (error) {
    console.error("Error al eliminar datos:", error);
    throw error;
  }
};

/**
 * Actualiza un documento existente
 * @param {string} nombreColeccion - Nombre de la colección
 * @param {string} idFirestore - ID del documento a actualizar
 * @param {Object} datosActualizados - Nuevos datos
 * @returns {Promise<void>}
 */
export const updateDataCollection = async (nombreColeccion, idFirestore, datosActualizados) => {
  try {
    const docRef = doc(db, nombreColeccion, idFirestore);
    await updateDoc(docRef, {
      ...datosActualizados,
      fechaActualizacion: new Date()
    });
    console.log(`Documento ${idFirestore} actualizado en ${nombreColeccion}`);
  } catch (error) {
    console.error("Error al actualizar datos:", error);
    throw error;
  }
};

/**
 * Obtiene todos los documentos de una colección
 * @param {string} nombreColeccion - Nombre de la colección
 * @returns {Promise<Array>} - Array de documentos con sus IDs
 */
export const getAllDataCollection = async (nombreColeccion) => {
  try {
    const querySnapshot = await getDocs(collection(db, nombreColeccion));
    const documentos = [];
    querySnapshot.forEach((doc) => {
      documentos.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return documentos;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};

/**
 * Obtiene un documento específico por ID
 * @param {string} nombreColeccion - Nombre de la colección
 * @param {string} idFirestore - ID del documento
 * @returns {Promise<Object|null>} - Documento encontrado o null
 */
export const getDataById = async (nombreColeccion, idFirestore) => {
  try {
    const docRef = doc(db, nombreColeccion, idFirestore);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      console.log("No se encontró el documento");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener documento por ID:", error);
    throw error;
  }
};

/**
 * Busca documentos por un campo específico
 * @param {string} nombreColeccion - Nombre de la colección
 * @param {string} campo - Campo a buscar
 * @param {any} valor - Valor a buscar
 * @returns {Promise<Array>} - Array de documentos que coinciden
 */
export const searchDataByField = async (nombreColeccion, campo, valor) => {
  try {
    const q = query(collection(db, nombreColeccion), where(campo, "==", valor));
    const querySnapshot = await getDocs(q);
    const documentos = [];
    querySnapshot.forEach((doc) => {
      documentos.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return documentos;
  } catch (error) {
    console.error("Error al buscar datos:", error);
    throw error;
  }
};

/**
 * Obtiene documentos ordenados por un campo
 * @param {string} nombreColeccion - Nombre de la colección
 * @param {string} campoOrden - Campo por el cual ordenar
 * @param {string} direccion - 'asc' o 'desc'
 * @param {number} limite - Número máximo de documentos a obtener
 * @returns {Promise<Array>} - Array de documentos ordenados
 */
export const getDataOrdered = async (nombreColeccion, campoOrden, direccion = 'desc', limite = 10) => {
  try {
    const q = query(
      collection(db, nombreColeccion),
      orderBy(campoOrden, direccion),
      limit(limite)
    );
    const querySnapshot = await getDocs(q);
    const documentos = [];
    querySnapshot.forEach((doc) => {
      documentos.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return documentos;
  } catch (error) {
    console.error("Error al obtener datos ordenados:", error);
    throw error;
  }
};

/**
 * Añade datos a una colección con un ID personalizado
 * @param {string} nombreColeccion - Nombre de la colección
 * @param {string} idPersonalizado - ID personalizado para el documento
 * @param {Object} datos - Datos a añadir
 * @returns {Promise<void>}
 */
export const addDataWithCustomId = async (nombreColeccion, idPersonalizado, datos) => {
  try {
    const docRef = doc(db, nombreColeccion, idPersonalizado);
    await setDoc(docRef, {
      ...datos,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    });
    console.log(`Documento añadido a ${nombreColeccion} con ID personalizado: ${idPersonalizado}`);
  } catch (error) {
    console.error("Error al añadir datos con ID personalizado:", error);
    throw error;
  }
}; 

// Agregar mascota al array infoMascotas
export const agregarMascotaAUsuario = async (idUsuario, mascota) => {
  const usuarioRef = doc(db, "usuarios", idUsuario);
  await updateDoc(usuarioRef, {
    infoMascotas: arrayUnion(mascota)
  });
};

/**
 * Obtiene los datos de un usuario específico por su UID de Firebase Auth
 * @param {string} uid - UID del usuario de Firebase Auth
 * @returns {Promise<Object|null>} - Datos del usuario o null si no existe
 */
export const obtenerUsuarioPorUid = async (uid) => {
  try {
    const usuarioRef = doc(db, "usuarios", uid);
    const usuarioSnap = await getDoc(usuarioRef);
    
    if (usuarioSnap.exists()) {
      return {
        uid: usuarioSnap.id,
        ...usuarioSnap.data()
      };
    } else {
      console.log("No se encontró el usuario con UID:", uid);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener usuario por UID:", error);
    throw error;
  }
};

/**
 * Busca una mascota específica por su ID en todos los usuarios
 * @param {string} mascotaId - ID de la mascota a buscar
 * @returns {Promise<Object|null>} - Datos de la mascota y su propietario o null si no se encuentra
 */
export const buscarMascotaPorId = async (mascotaId) => {
  try {
    // Obtener todos los usuarios
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    
    // Buscar la mascota en el array de mascotas de cada usuario
    for (const doc of querySnapshot.docs) {
      const usuario = {
        id: doc.id,
        ...doc.data()
      };
      
      if (usuario.infoMascotas && Array.isArray(usuario.infoMascotas)) {
        const mascotaEncontrada = usuario.infoMascotas.find(m => m.id === mascotaId);
        if (mascotaEncontrada) {
          // Obtener el nombre del usuario de la misma manera que en el Dashboard
          const nombreUsuario = usuario.displayName || usuario.nombre || usuario.email || 'No disponible';
          
          return {
            mascota: mascotaEncontrada,
            propietario: {
              id: usuario.id,
              nombre: nombreUsuario,
              email: usuario.email || 'No disponible',
              telefono: usuario.telefono || 'No disponible',
              direccion: usuario.direccion || 'No disponible'
            }
          };
        }
      }
    }
    
    return null; // No se encontró la mascota
  } catch (error) {
    console.error("Error al buscar mascota por ID:", error);
    throw error;
  }
};

/**
 * Obtiene un profesional por su UID
 * @param {string} uid - UID del profesional
 * @returns {Promise<Object|null>} - Datos del profesional o null
 */
export const obtenerProfesionalPorUid = async (uid) => {
  try {
    const profesional = await getDataById('profesionales', uid);
    return profesional;
  } catch (error) {
    console.error('Error al obtener profesional por UID:', error);
    throw error;
  }
};

/**
 * Busca mascotas por número de chip
 * @param {string} numeroChip - Número de chip a buscar
 * @returns {Promise<Array>} - Array de mascotas encontradas con información del propietario
 */
export const buscarMascotasPorChip = async (numeroChip) => {
  try {
    // Obtener todos los usuarios
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    const mascotasEncontradas = [];
    
    // Buscar mascotas que coincidan con el chip
    for (const doc of querySnapshot.docs) {
      const usuario = {
        id: doc.id,
        ...doc.data()
      };
      
      if (usuario.infoMascotas && Array.isArray(usuario.infoMascotas)) {
        const mascotasCoincidentes = usuario.infoMascotas.filter(mascota => 
          mascota.numeroChip && mascota.numeroChip.toLowerCase().includes(numeroChip.toLowerCase())
        );
        
        mascotasCoincidentes.forEach(mascota => {
          const nombreUsuario = usuario.displayName || usuario.nombre || usuario.email || 'No disponible';
          
          mascotasEncontradas.push({
            ...mascota,
            propietario: {
              id: usuario.id,
              nombre: nombreUsuario,
              telefono: usuario.telefono || 'No disponible',
              email: usuario.email || 'No disponible',
              direccion: usuario.direccion || 'No disponible'
            }
          });
        });
      }
    }
    
    return mascotasEncontradas;
  } catch (error) {
    console.error('Error al buscar mascotas por chip:', error);
    throw error;
  }
};

/**
 * Actualiza información de una mascota específica
 * @param {string} mascotaId - ID de la mascota
 * @param {Object} datosActualizados - Datos a actualizar
 * @returns {Promise<void>}
 */
export const actualizarMascota = async (mascotaId, datosActualizados) => {
  try {
    // Obtener todos los usuarios
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    
    // Buscar el usuario que tiene la mascota
    for (const doc of querySnapshot.docs) {
      const usuario = {
        id: doc.id,
        ...doc.data()
      };
      
      if (usuario.infoMascotas && Array.isArray(usuario.infoMascotas)) {
        const mascotaIndex = usuario.infoMascotas.findIndex(m => m.id === mascotaId);
        if (mascotaIndex !== -1) {
          // Actualizar la mascota
          const mascotasActualizadas = [...usuario.infoMascotas];
          mascotasActualizadas[mascotaIndex] = {
            ...mascotasActualizadas[mascotaIndex],
            ...datosActualizados,
            fechaActualizacion: new Date()
          };
          
          // Actualizar el documento del usuario
          await updateDataCollection('usuarios', usuario.id, {
            infoMascotas: mascotasActualizadas
          });
          
          console.log(`Mascota ${mascotaId} actualizada exitosamente`);
          return;
        }
      }
    }
    
    throw new Error('Mascota no encontrada');
  } catch (error) {
    console.error('Error al actualizar mascota:', error);
    throw error;
  }
};

/**
 * Obtiene profesionales filtrados por tipo
 * @param {string} tipoProfesional - 'veterinario' o 'peluquero'
 * @returns {Promise<Array>} - Array de profesionales del tipo especificado
 */
export const obtenerProfesionalesPorTipo = async (tipoProfesional) => {
  try {
    const q = query(
      collection(db, "profesionales"),
      where("tipoProfesional", "==", tipoProfesional),
      where("estado", "==", "activo")
    );
    const querySnapshot = await getDocs(q);
    const profesionales = [];
    querySnapshot.forEach((doc) => {
      profesionales.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return profesionales;
  } catch (error) {
    console.error('Error al obtener profesionales por tipo:', error);
    throw error;
  }
};

/**
 * Agrega una cita al array de citas de un profesional
 * @param {string} profesionalId - ID del profesional
 * @param {Object} cita - Datos de la cita
 * @returns {Promise<void>}
 */
export const agregarCitaAProfesional = async (profesionalId, cita) => {
  try {
    const profesionalRef = doc(db, "profesionales", profesionalId);
    await updateDoc(profesionalRef, {
      citas: arrayUnion({
        ...cita,
        id: Date.now().toString(), // ID temporal para la cita
        fechaCreacion: new Date(),
        estado: 'pendiente'
      })
    });
    console.log(`Cita agregada al profesional ${profesionalId}`);
  } catch (error) {
    console.error('Error al agregar cita al profesional:', error);
    throw error;
  }
};

/**
 * Agrega una cita al array de citas de un usuario
 * @param {string} usuarioId - ID del usuario
 * @param {Object} cita - Datos de la cita
 * @returns {Promise<void>}
 */
export const agregarCitaAUsuario = async (usuarioId, cita) => {
  try {
    const usuarioRef = doc(db, "usuarios", usuarioId);
    await updateDoc(usuarioRef, {
      citas: arrayUnion({
        ...cita,
        id: Date.now().toString(), // ID temporal para la cita
        fechaCreacion: new Date(),
        estado: 'pendiente'
      })
    });
    console.log(`Cita agregada al usuario ${usuarioId}`);
  } catch (error) {
    console.error('Error al agregar cita al usuario:', error);
    throw error;
  }
};

/**
 * Obtiene las citas de un profesional desde su array de citas
 * @param {string} profesionalId - ID del profesional
 * @returns {Promise<Array>} - Array de citas del profesional
 */
export const obtenerCitasDeProfesional = async (profesionalId) => {
  try {
    const profesional = await getDataById('profesionales', profesionalId);
    return profesional?.citas || [];
  } catch (error) {
    console.error('Error al obtener citas del profesional:', error);
    throw error;
  }
};

/**
 * Agrega una nueva cita
 * @param {Object} cita - Datos de la cita
 * @returns {Promise<string>} - ID de la cita creada
 */
export const agregarCita = async (cita) => {
  try {
    const docRef = await addDoc(collection(db, "citas"), {
      ...cita,
      fechaCreacion: new Date()
    });
    console.log(`Cita creada con ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error('Error al crear cita:', error);
    throw error;
  }
};

/**
 * Obtiene las citas de un profesional específico
 * @param {string} profesionalId - ID del profesional
 * @returns {Promise<Array>} - Array de citas
 */
export const obtenerCitasProfesional = async (profesionalId) => {
  try {
    const q = query(
      collection(db, "citas"),
      where("profesionalId", "==", profesionalId),
      orderBy("fecha", "desc")
    );
    const querySnapshot = await getDocs(q);
    const citas = [];
    querySnapshot.forEach((doc) => {
      citas.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return citas;
  } catch (error) {
    console.error('Error al obtener citas del profesional:', error);
    throw error;
  }
};

/**
 * Actualiza una cita existente
 * @param {string} citaId - ID de la cita
 * @param {Object} datosActualizados - Datos a actualizar
 * @returns {Promise<void>}
 */
export const actualizarCita = async (citaId, datosActualizados) => {
  try {
    await updateDataCollection('citas', citaId, {
      ...datosActualizados,
      fechaActualizacion: new Date()
    });
    console.log(`Cita ${citaId} actualizada exitosamente`);
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    throw error;
  }
};

/**
 * Elimina una cita
 * @param {string} citaId - ID de la cita
 * @returns {Promise<void>}
 */
export const eliminarCita = async (citaId) => {
  try {
    await deleteDataCollection('citas', citaId);
    console.log(`Cita ${citaId} eliminada exitosamente`);
  } catch (error) {
    console.error('Error al eliminar cita:', error);
    throw error;
  }
};

/**
 * Agrega un nuevo producto al array de productos de un profesional/tienda
 * @param {string} profesionalId - ID del profesional/tienda
 * @param {Object} producto - Datos del producto
 * @returns {Promise<string>} - ID del producto creado
 */
export const agregarProducto = async (profesionalId, producto) => {
  try {
    const profesionalRef = doc(db, "profesionales", profesionalId);
    
    // Generar ID único para el producto
    const productoId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    const productoCompleto = {
      id: productoId,
      ...producto,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      isActivo: true
    };
    
    await updateDoc(profesionalRef, {
      productos: arrayUnion(productoCompleto)
    });
    
    console.log(`Producto creado con ID: ${productoId} en profesional ${profesionalId}`);
    return productoId;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

/**
 * Actualiza un producto existente en el array de productos del profesional
 * @param {string} profesionalId - ID del profesional/tienda
 * @param {string} productoId - ID del producto
 * @param {Object} datosActualizados - Datos a actualizar
 * @returns {Promise<void>}
 */
export const actualizarProducto = async (profesionalId, productoId, datosActualizados) => {
  try {
    // Primero obtener el profesional actual
    const profesional = await getDataById('profesionales', profesionalId);
    
    if (!profesional || !profesional.productos) {
      throw new Error('Profesional no encontrado o sin productos');
    }
    
    // Actualizar el producto específico en el array
    const productosActualizados = profesional.productos.map(producto => 
      producto.id === productoId 
        ? { ...producto, ...datosActualizados, fechaActualizacion: new Date() }
        : producto
    );
    
    // Actualizar el documento del profesional
    await updateDataCollection('profesionales', profesionalId, {
      productos: productosActualizados
    });
    
    console.log(`Producto ${productoId} actualizado exitosamente`);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

/**
 * Elimina un producto del array de productos del profesional
 * @param {string} profesionalId - ID del profesional/tienda
 * @param {string} productoId - ID del producto
 * @returns {Promise<void>}
 */
export const eliminarProducto = async (profesionalId, productoId) => {
  try {
    // Primero obtener el profesional actual
    const profesional = await getDataById('profesionales', profesionalId);
    
    if (!profesional || !profesional.productos) {
      throw new Error('Profesional no encontrado o sin productos');
    }
    
    // Filtrar el producto a eliminar
    const productosActualizados = profesional.productos.filter(producto => producto.id !== productoId);
    
    // Actualizar el documento del profesional
    await updateDataCollection('profesionales', profesionalId, {
      productos: productosActualizados
    });
    
    console.log(`Producto ${productoId} eliminado exitosamente`);
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};

/**
 * Obtiene todos los productos de un profesional/tienda
 * @param {string} profesionalId - ID del profesional/tienda
 * @returns {Promise<Array>} - Array de productos
 */
export const obtenerProductosPorProfesional = async (profesionalId) => {
  try {
    const profesional = await getDataById('profesionales', profesionalId);
    
    if (!profesional || !profesional.productos) {
      return [];
    }
    
    // Filtrar solo productos activos y ordenar por fecha de creación
    const productosActivos = profesional.productos
      .filter(producto => producto.isActivo !== false)
      .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
    
    return productosActivos;
  } catch (error) {
    console.error('Error al obtener productos del profesional:', error);
    throw error;
  }
};

/**
 * Obtiene un producto específico por ID dentro del profesional
 * @param {string} profesionalId - ID del profesional/tienda
 * @param {string} productoId - ID del producto
 * @returns {Promise<Object|null>} - Producto encontrado o null
 */
export const obtenerProductoPorId = async (profesionalId, productoId) => {
  try {
    const profesional = await getDataById('profesionales', profesionalId);
    
    if (!profesional || !profesional.productos) {
      return null;
    }
    
    const producto = profesional.productos.find(p => p.id === productoId);
    return producto || null;
  } catch (error) {
    console.error('Error al obtener producto por ID:', error);
    throw error;
  }
};

/**
 * Agrega un nuevo descuento al array de descuentos de un profesional/tienda
 * @param {string} profesionalId - ID del profesional/tienda
 * @param {Object} descuento - Datos del descuento
 * @returns {Promise<string>} - ID del descuento creado
 */
export const agregarDescuento = async (profesionalId, descuento) => {
  try {
    const profesionalRef = doc(db, "profesionales", profesionalId);
    
    // Generar ID único para el descuento
    const descuentoId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    const descuentoCompleto = {
      id: descuentoId,
      ...descuento,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      isActivo: true
    };
    
    await updateDoc(profesionalRef, {
      descuentos: arrayUnion(descuentoCompleto)
    });
    
    console.log(`Descuento creado con ID: ${descuentoId} en profesional ${profesionalId}`);
    return descuentoId;
  } catch (error) {
    console.error('Error al crear descuento:', error);
    throw error;
  }
};

/**
 * Actualiza un descuento existente en el array de descuentos del profesional
 * @param {string} profesionalId - ID del profesional/tienda
 * @param {string} descuentoId - ID del descuento
 * @param {Object} datosActualizados - Datos a actualizar
 * @returns {Promise<void>}
 */
export const actualizarDescuento = async (profesionalId, descuentoId, datosActualizados) => {
  try {
    // Primero obtener el profesional actual
    const profesional = await getDataById('profesionales', profesionalId);
    
    if (!profesional || !profesional.descuentos) {
      throw new Error('Profesional no encontrado o sin descuentos');
    }
    
    // Actualizar el descuento específico en el array
    const descuentosActualizados = profesional.descuentos.map(descuento => 
      descuento.id === descuentoId 
        ? { ...descuento, ...datosActualizados, fechaActualizacion: new Date() }
        : descuento
    );
    
    // Actualizar el documento del profesional
    await updateDataCollection('profesionales', profesionalId, {
      descuentos: descuentosActualizados
    });
    
    console.log(`Descuento ${descuentoId} actualizado exitosamente`);
  } catch (error) {
    console.error('Error al actualizar descuento:', error);
    throw error;
  }
};

/**
 * Elimina un descuento del array de descuentos del profesional
 * @param {string} profesionalId - ID del profesional/tienda
 * @param {string} descuentoId - ID del descuento
 * @returns {Promise<void>}
 */
export const eliminarDescuento = async (profesionalId, descuentoId) => {
  try {
    // Primero obtener el profesional actual
    const profesional = await getDataById('profesionales', profesionalId);
    
    if (!profesional || !profesional.descuentos) {
      throw new Error('Profesional no encontrado o sin descuentos');
    }
    
    // Filtrar el descuento a eliminar
    const descuentosActualizados = profesional.descuentos.filter(descuento => descuento.id !== descuentoId);
    
    // Actualizar el documento del profesional
    await updateDataCollection('profesionales', profesionalId, {
      descuentos: descuentosActualizados
    });
    
    console.log(`Descuento ${descuentoId} eliminado exitosamente`);
  } catch (error) {
    console.error('Error al eliminar descuento:', error);
    throw error;
  }
};

/**
 * Obtiene todos los descuentos de un profesional/tienda
 * @param {string} profesionalId - ID del profesional/tienda
 * @returns {Promise<Array>} - Array de descuentos
 */
export const obtenerDescuentosPorProfesional = async (profesionalId) => {
  try {
    const profesional = await getDataById('profesionales', profesionalId);
    
    if (!profesional || !profesional.descuentos) {
      return [];
    }
    
    // Filtrar solo descuentos activos y ordenar por fecha de creación
    const descuentosActivos = profesional.descuentos
      .filter(descuento => descuento.isActivo !== false)
      .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
    
    return descuentosActivos;
  } catch (error) {
    console.error('Error al obtener descuentos del profesional:', error);
    throw error;
  }
};

/**
 * Obtiene un descuento específico por ID dentro del profesional
 * @param {string} profesionalId - ID del profesional/tienda
 * @param {string} descuentoId - ID del descuento
 * @returns {Promise<Object|null>} - Descuento encontrado o null
 */
export const obtenerDescuentoPorId = async (profesionalId, descuentoId) => {
  try {
    const profesional = await getDataById('profesionales', profesionalId);
    
    if (!profesional || !profesional.descuentos) {
      return null;
    }
    
    const descuento = profesional.descuentos.find(d => d.id === descuentoId);
    return descuento || null;
  } catch (error) {
    console.error('Error al obtener descuento por ID:', error);
    throw error;
  }
};

// ==================== FUNCIONES DE STORAGE ====================

/**
 * Sube un archivo a Firebase Storage
 * @param {File} archivo - Archivo a subir
 * @param {string} ruta - Ruta en Storage (ej: 'users/123/pets/456')
 * @param {string} nombreArchivo - Nombre del archivo
 * @returns {Promise<string>} - URL de descarga del archivo
 */
export const subirArchivo = async (archivo, ruta, nombreArchivo) => {
  try {
    // Crear referencia única para el archivo
    const extension = archivo.name.split('.').pop();
    const nombreUnico = `${nombreArchivo}_${Date.now()}.${extension}`;
    const storageRef = ref(storage, `${ruta}/${nombreUnico}`);
    
    // Subir archivo
    const snapshot = await uploadBytes(storageRef, archivo);
    
    // Obtener URL de descarga
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log(`Archivo subido exitosamente: ${downloadURL}`);
    return downloadURL;
  } catch (error) {
    console.error('Error al subir archivo:', error);
    throw error;
  }
};

/**
 * Sube una imagen de mascota a Firebase Storage
 * @param {string} userId - ID del usuario
 * @param {string} petId - ID de la mascota
 * @param {File} archivo - Archivo de imagen
 * @returns {Promise<string>} - URL de la imagen subida
 */
export const subirImagenMascota = async (userId, petId, archivo) => {
  try {
    const ruta = `users/${userId}/pets/${petId}/images`;
    const nombreArchivo = `profile_${petId}`;
    
    const imageUrl = await subirArchivo(archivo, ruta, nombreArchivo);
    return imageUrl;
  } catch (error) {
    console.error('Error al subir imagen de mascota:', error);
    throw error;
  }
};

/**
 * Elimina un archivo de Firebase Storage
 * @param {string} urlArchivo - URL completa del archivo
 * @returns {Promise<void>}
 */
export const eliminarArchivo = async (urlArchivo) => {
  try {
    // Extraer la ruta del archivo desde la URL
    const url = new URL(urlArchivo);
    const rutaArchivo = decodeURIComponent(url.pathname.split('/o/')[1]?.split('?')[0] || '');
    
    if (!rutaArchivo) {
      throw new Error('No se pudo extraer la ruta del archivo desde la URL');
    }
    
    const storageRef = ref(storage, rutaArchivo);
    await deleteObject(storageRef);
    
    console.log('Archivo eliminado exitosamente');
  } catch (error) {
    console.error('Error al eliminar archivo:', error);
    throw error;
  }
};