// src/components/impresion/ComprobanteEncuesta.jsx
//
// Réplica imprimible de la "Planilla de Relevamiento - Emergencia Hídrica"
// en papel. No agrega ni quita campos respecto del instrumento original:
// solo muestra, con el mismo agrupamiento en 6 bloques, lo que ya se cargó
// en el wizard (ver WizardEncuesta.jsx / encuestaSchema.js).
//
// Recibe una "encuesta" tal como la devuelve db.js (listarEncuestas /
// guardarEncuestaFinalizada): { id_encuesta, fecha_relevamiento,
// estado_sincronizacion, payload: {...campos del formulario...} }.
//
// Este componente NO decide cuándo imprimir ni maneja el estado de "cuál
// encuesta mostrar" — eso se resuelve en el lugar que lo use (ver TODO en
// ListadoEncuestas.jsx). Acá solo se arma el papel.

import { ZONAS } from '../../catalogos/zonas';
import './ComprobanteEncuesta.css';

const MATERIAL_LABELS = {
  ladrillo: 'Ladrillo',
  madera: 'Madera',
  barro: 'Barro',
  lona: 'Lona',
};

const SITUACION_VIVIENDA_LABELS = {
  'buen-estado': 'Buen estado',
  regular: 'Regular',
  'mal-estado': 'Mal estado',
  precario: 'Precario',
};

const TENENCIA_LABELS = {
  propietario: 'Propietario',
  alquiler: 'Alquiler',
  prestamo: 'Préstamo',
};

const SERVICIOS_LABELS = {
  agua: 'Agua',
  luz: 'Luz',
  cloaca: 'Cloaca',
  pozo: 'Pozo',
};

function nombreZona(zonaId) {
  return ZONAS.find((z) => z.id === zonaId)?.nombre ?? zonaId ?? '—';
}

function siNo(valor) {
  return valor ? 'Sí' : 'No';
}

function formatearFecha(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('es-AR');
}

// Campo simple "Etiqueta: valor", reutilizado en todos los bloques.
function Campo({ etiqueta, valor }) {
  return (
    <div className="campo-impreso">
      <span className="campo-impreso-etiqueta">{etiqueta}:</span>{' '}
      <span className="campo-impreso-valor">{valor ?? '—'}</span>
    </div>
  );
}

export default function ComprobanteEncuesta({ encuesta }) {
  if (!encuesta) return null;
  const d = encuesta.payload;

  return (
    <div className="hoja-impresion">
      <header className="hoja-impresion-membrete">
        <p className="hoja-impresion-organismo">
          Secretaría de Desarrollo Humano y Promoción Social
        </p>
        <p className="hoja-impresion-organismo">
          Municipalidad de Goya — Provincia de Corrientes
        </p>
        <h1>Planilla de Relevamiento — Emergencia Hídrica</h1>
        <p className="hoja-impresion-meta">
          N.º de comprobante: {encuesta.id_encuesta} · Fecha de relevamiento:{' '}
          {formatearFecha(encuesta.fecha_relevamiento)} · Estado:{' '}
          {encuesta.estado_sincronizacion}
        </p>
      </header>

      <section>
        <h2>1. Identificación del jefe de familia</h2>
        <Campo etiqueta="Apellido y nombre" valor={d.apellido_nombre} />
        <Campo etiqueta="DNI" valor={d.dni_jefe} />
        <Campo etiqueta="Edad" valor={d.edad} />
        <Campo etiqueta="Estado civil" valor={d.estado_civil} />
      </section>

      <section>
        <h2>2. Ubicación precisa</h2>
        <Campo etiqueta="Zona" valor={nombreZona(d.zona_id)} />
        <Campo etiqueta="Domicilio" valor={d.domicilio} />
        <Campo etiqueta="Referencias" valor={d.referencias_ubicacion} />
      </section>

      <section>
        <h2>3. Composición del hogar</h2>
        <Campo etiqueta="Cantidad de integrantes" valor={d.cantidad_integrantes} />
        <Campo etiqueta="Cantidad de mayores" valor={d.cantidad_mayores} />
        <Campo etiqueta="Cantidad de menores" valor={d.cantidad_menores} />
        <Campo etiqueta="Embarazadas" valor={siNo(d.embarazadas)} />
        {d.embarazadas && <Campo etiqueta="F.P.P." valor={d.fpp} />}
        <Campo etiqueta="Adultos mayores" valor={siNo(d.adultos_mayores)} />
        <Campo
          etiqueta="Menores/mayores con discapacidad"
          valor={siNo(d.menores_con_discapacidad)}
        />
      </section>

      <section>
        <h2>4. Situación de vivienda</h2>
        <Campo etiqueta="Material" valor={MATERIAL_LABELS[d.material_vivienda]} />
        <Campo
          etiqueta="Estado de la vivienda"
          valor={SITUACION_VIVIENDA_LABELS[d.situacion_vivienda]}
        />
        <Campo etiqueta="Situación de tenencia" valor={TENENCIA_LABELS[d.situacion_tenencia]} />
        <Campo
          etiqueta="Servicios"
          valor={
            d.servicios?.length
              ? d.servicios.map((s) => SERVICIOS_LABELS[s] ?? s).join(', ')
              : 'Ninguno'
          }
        />
      </section>

      <section>
        <h2>5. Nivel de emergencia</h2>
        <Campo etiqueta="Nivel asignado" valor={d.nivel_emergencia ? `Nivel ${d.nivel_emergencia}` : '—'} />
      </section>

      <section>
        <h2>6. Encuestador</h2>
        <Campo etiqueta="Encuestador" valor={d.encuestador_nombre} />
        <Campo etiqueta="Observaciones finales" valor={d.observaciones_finales} />
      </section>

      <footer className="hoja-impresion-firmas">
        <div>
          <div className="linea-firma" />
          <p>Firma del jefe de familia</p>
        </div>
        <div>
          <div className="linea-firma" />
          <p>Firma del encuestador</p>
        </div>
      </footer>
    </div>
  );
}
