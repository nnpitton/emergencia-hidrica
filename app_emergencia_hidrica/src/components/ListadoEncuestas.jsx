
import { useEffect, useState } from 'react';
import { listarEncuestas } from '../db/db';

export default function ListadoEncuestas({ refrescarSenal }) {
  const [encuestas, setEncuestas] = useState([]);

  useEffect(() => {
    listarEncuestas().then(setEncuestas);
  }, [refrescarSenal]);

  return (
    <div>
      <h2>Encuestas cargadas en este dispositivo ({encuestas.length})</h2>
      <ul>
        {encuestas.map((e) => (
          <li key={e.id_encuesta}>
            {e.payload.apellido_nombre} — DNI {e.payload.dni_jefe} — {new Date(e.fecha_relevamiento).toLocaleString()}
            {' '}— <em>{e.estado_sincronizacion}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}