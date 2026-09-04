
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ZONAS } from '../../catalogos/zonas';
import { useOptionalGeolocation } from '../../hooks/useOptionalGeolocation';

export default function PasoUbicacion() {
  const { register, setValue, formState: { errors } } = useFormContext();
  const { coords, status, intentarCapturar } = useOptionalGeolocation();

  useEffect(() => { intentarCapturar(); }, []);
  useEffect(() => {
    if (coords) { setValue('latitud', coords.lat); setValue('longitud', coords.lng); }
  }, [coords]);

  return (
    <fieldset>
      {/* Zona del operativo: reemplaza a la antigua "localidad". Catálogo
          fijo en src/catalogos/zonas.js, sin relación con GPS/geolocalización. */}
      <label>Zona
        <select {...register('zona_id')}>
          <option value="">Seleccionar...</option>
          {ZONAS.map((z) => <option key={z.id} value={z.id}>{z.nombre}</option>)}
        </select>
      </label>
      {errors.zona_id && <span>{errors.zona_id.message}</span>}

      <label>Domicilio<input {...register('domicilio')} /></label>
      <label>Referencias<textarea {...register('referencias_ubicacion')} /></label>

      <p>
        GPS: {status === 'buscando' && 'buscando ubicación...'}
        {status === 'ok' && 'capturado correctamente'}
        {status === 'no-disponible' && 'no disponible — se puede continuar igual'}
      </p>
    </fieldset>
  );
}