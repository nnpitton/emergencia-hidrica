
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useOptionalGeolocation } from '../../hooks/useOptionalGeolocation';

const ZONAS = [
  { id: 'norte', nombre: 'Norte' },
  { id: 'sur', nombre: 'Sur' },
  { id: 'este', nombre: 'Este' },
  { id: 'oeste', nombre: 'Oeste' },
  { id: 'centro', nombre: 'Centro' },
];

export default function PasoUbicacion() {
  const { register, setValue, formState: { errors } } = useFormContext();
  const { coords, status, intentarCapturar } = useOptionalGeolocation();

  useEffect(() => { intentarCapturar(); }, []);
  useEffect(() => {
    if (coords) { setValue('latitud', coords.lat); setValue('longitud', coords.lng); }
  }, [coords]);

  return (
    <fieldset>
      <h3 className="paso-titulo">Ubicacion</h3>
      <div className="paso-grid">
        <div className="campo">
          <label className="campo-label" htmlFor="zona_id">Zona</label>
          <select id="zona_id" {...register('zona_id')}>
            <option value="">Seleccionar...</option>
            {ZONAS.map((z) => <option key={z.id} value={z.id}>{z.nombre}</option>)}
          </select>
          {errors.zona_id && <span className="campo-error">{errors.zona_id.message}</span>}
        </div>

        <div className="campo">
          <label className="campo-label" htmlFor="localidad">Localidad</label>
          <input id="localidad" {...register('localidad')} placeholder="Nombre de la localidad" />
          {errors.localidad && <span className="campo-error">{errors.localidad.message}</span>}
        </div>

        <div className="campo campo-full">
          <label className="campo-label" htmlFor="domicilio">Domicilio</label>
          <input id="domicilio" {...register('domicilio')} placeholder="Calle y numero" />
          {errors.domicilio && <span className="campo-error">{errors.domicilio.message}</span>}
        </div>

        <div className="campo campo-full">
          <label className="campo-label" htmlFor="referencias_ubicacion">Referencias de ubicacion</label>
          <textarea
            id="referencias_ubicacion"
            {...register('referencias_ubicacion')}
            placeholder="Ej: entre calle San Martin y Belgrano, cerca de la escuela N 42, frente al kiosco de la esquina..."
            rows={3}
          />
        </div>

        <div className="campo campo-full">
          <span className={`gps-badge ${status === 'buscando' ? 'gps-buscando' : status === 'ok' ? 'gps-ok' : 'gps-error'}`}>
            {status === 'buscando' && (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                Buscando ubicacion...
              </>
            )}
            {status === 'ok' && (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                GPS capturado
              </>
            )}
            {status === 'no-disponible' && (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                GPS no disponible — se puede continuar
              </>
            )}
          </span>
          {status === 'no-disponible' && (
            <button type="button" className="gps-reintentar" onClick={intentarCapturar}>
              Reintentar ubicacion
            </button>
          )}
        </div>
      </div>
    </fieldset>
  );
}