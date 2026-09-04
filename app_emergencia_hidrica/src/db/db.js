import Dexie from 'dexie';
import { v4 as uuidv4 } from 'uuid';

//creo db y una tabla(store) llamada encuestas
export const db = new Dexie('emergencia_hidrica');
db.version(1).stores({
  encuestas: 'id_encuesta, dni_jefe, estado_sincronizacion, fecha_relevamiento',
});

//guardamos el dispositivo del que salio la informacion
function getDeviceId() {
  let id = localStorage.getItem('device_id');
  if (!id) { id = uuidv4(); localStorage.setItem('device_id', id); }
  return id;
}


export async function guardarEncuestaFinalizada(datosValidados) {
  const encuesta = {
    id_encuesta: uuidv4(),              // generado en el dispositivo, no autoincremental
    version_formulario: 1,
    dispositivo_id: getDeviceId(),
    fecha_relevamiento: new Date().toISOString(),
    estado_sincronizacion: 'pendiente',  // en esta fase no hay backend, pero se deja
    payload: datosValidados,              // el campo listo para la Fase 2
  };
  await db.encuestas.add(encuesta);
  return encuesta.id_encuesta;
}

export function listarEncuestas() {
  return db.encuestas.orderBy('fecha_relevamiento').reverse().toArray();
}

export function contarPendientes() {
  return db.encuestas.where('estado_sincronizacion').equals('pendiente').count();
}