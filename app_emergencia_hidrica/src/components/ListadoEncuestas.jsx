
import { useEffect, useState } from 'react';
import { listarEncuestas } from '../db/db';
import ComprobanteEncuesta from './impresion/ComprobanteEncuesta';

const LABELS = {
  dni_jefe: 'DNI',
  apellido_nombre: 'Apellido y nombre',
  edad: 'Edad',
  estado_civil: 'Estado civil',
  celular: 'Celular',
  nivel_educativo: 'Nivel educativo',
  zona_id: 'Zona',
  localidad: 'Localidad',
  domicilio: 'Domicilio',
  referencias_ubicacion: 'Referencias',
  cantidad_integrantes: 'Total integrantes',
  cantidad_mayores: 'Mayores de 18',
  cantidad_menores: 'Menores de 18',
  embarazadas: 'Embarazadas',
  fpp: 'F.P.P.',
  adultos_mayores: 'Adultos mayores',
  menores_con_discapacidad: 'Menores/mayores con discapacidad',
  material_vivienda: 'Material vivienda',
  situacion_vivienda: 'Situacion vivienda',
  situacion_tenencia: 'Situacion tenencia',
  servicios: 'Servicios',
  nivel_emergencia: 'Nivel de emergencia',
  encuestador_nombre: 'Encuestador',
  observaciones_finales: 'Observaciones',
};

function formatearValor(clave, valor) {
  if (valor === true) return 'Si';
  if (valor === false) return 'No';
  if (valor === null || valor === undefined || valor === '') return '—';
  if (Array.isArray(valor)) return valor.length > 0 ? valor.join(', ') : '—';
  return String(valor);
}

export default function ListadoEncuestas({ refrescarSenal }) {
  const [encuestas, setEncuestas] = useState([]);
  const [expandidas, setExpandidas] = useState({});

  // TODO (Nicolas): estado para saber qué encuesta se está por imprimir.
  // Empieza en null (nada seleccionado para imprimir).
  // const [encuestaAImprimir, setEncuestaAImprimir] = useState(null);

  useEffect(() => {
    listarEncuestas().then(setEncuestas);
  }, [refrescarSenal]);

  function toggleExpandir(id) {
    setExpandidas((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  // TODO (Nicolas): función que dispara la impresión de una encuesta.
  // Pasos que tiene que hacer (podés usar useEffect en vez de esto si te
  // resulta más prolijo, cualquiera de los dos enfoques está bien):
  //   1. Guardar la encuesta elegida con setEncuestaAImprimir(encuesta).
  //   2. Esperar a que React vuelva a renderizar con esa encuesta ya en
  //      <ComprobanteEncuesta /> antes de llamar a window.print() — si
  //      llamás a print() en el mismo tick todavía no se actualizó el DOM.
  //      Una forma simple: hacerlo en un useEffect que dependa de
  //      encuestaAImprimir, y ahí sí llamar a window.print().
  //   3. Después de imprimir (o cancelar), volver a poner
  //      encuestaAImprimir en null para que la hoja se oculte de nuevo.
  //
  // function imprimir(encuesta) {
  //   ...
  // }

  return (
    <div className="listado">
      <div className="listado-header">
        <h2>Encuestas cargadas</h2>
        <span className="listado-count">{encuestas.length} en este dispositivo</span>
      </div>

      {encuestas.length === 0 ? (
        <div className="card listado-vacio">
          <div className="listado-vacio-icono">
            <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <h3>Sin encuestas todavia</h3>
          <p className="text-sm text-muted">Las encuestas completadas apareceran aca.</p>
        </div>
      ) : (
        <div className="listado-items">
          {encuestas.map((e) => {
            const abierta = !!expandidas[e.id_encuesta];
            return (
              <div key={e.id_encuesta} className="card encuesta-card">
                <div
                  className="encuesta-card-clickable"
                  onClick={() => toggleExpandir(e.id_encuesta)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(ev) => { if (ev.key === 'Enter' || ev.key === ' ') toggleExpandir(e.id_encuesta); }}
                >
                  <div className="encuesta-card-header">
                    <span className="encuesta-card-nombre">{e.payload.apellido_nombre}</span>
                    <div className="encuesta-card-header-right">
                      <span className={`badge badge-${e.estado_sincronizacion === 'pendiente' ? 'pendiente' : 'sincronizado'}`}>
                        {e.estado_sincronizacion}
                      </span>
                      <svg
                        className={`encuesta-card-chevron${abierta ? ' abierta' : ''}`}
                        width="18" height="18" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="encuesta-card-detalles">
                    <span className="encuesta-card-detalle">
                      <strong>DNI</strong> {e.payload.dni_jefe}
                    </span>
                    <span className="encuesta-card-detalle">
                      <strong>Fecha</strong> {new Date(e.fecha_relevamiento).toLocaleString()}
                    </span>
                  </div>
                </div>

                {abierta && (
                  <div className="encuesta-card-expandido animate-in">
                    <div className="encuesta-detalle-grid">
                      {Object.entries(LABELS).map(([clave, label]) => {
                        const valor = e.payload[clave];
                        if (valor === undefined || valor === null || valor === '' || (Array.isArray(valor) && valor.length === 0)) {
                          // Mostrar igualmente pero con guion
                        }
                        return (
                          <div key={clave} className="encuesta-detalle-item">
                            <span className="encuesta-detalle-label">{label}</span>
                            <span className="encuesta-detalle-valor">{formatearValor(clave, valor)}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="encuesta-card-acciones">
                      {/* TODO (Nicolas): botón que llame a imprimir(e) una vez que
                          exista la función de arriba. Por ahora queda deshabilitado
                          para que el proyecto siga compilando. */}
                      <button type="button" className="btn btn-secondary btn-sm" disabled>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 6 2 18 2 18 9" />
                          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                          <rect x="6" y="14" width="12" height="8" />
                        </svg>
                        Imprimir
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/*
        TODO (Nicolas): reemplazar `encuesta={null}` por `encuesta={encuestaAImprimir}`
        una vez que tengas el estado de arriba. El propio componente ya
        maneja el caso "no hay nada para imprimir" (devuelve null).
        La clase CSS que lo hace visible en pantalla/impresión también hay
        que agregarla condicionalmente: className={encuestaAImprimir ? 'hoja-impresion--activa' : ''}
        pasada como prop extra si decidís exponerla, o resuelto directamente
        acá con un div envolvente. Cualquiera de los dos caminos sirve.
      */}
      <ComprobanteEncuesta encuesta={null} />
    </div>
  );
}
