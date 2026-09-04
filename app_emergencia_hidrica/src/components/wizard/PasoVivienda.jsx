// src/components/wizard/PasoVivienda.jsx
import { useFormContext } from 'react-hook-form';

const SERVICIOS_DISPONIBLES = ['agua', 'luz', 'cloaca', 'pozo'];

export default function PasoVivienda() {
  const { register, formState: { errors } } = useFormContext();
  return (
    <fieldset>
      <label>Material de la vivienda
        <select {...register('material_vivienda')}>
          <option value="">Seleccionar...</option>
          <option value="ladrillo">Ladrillo</option>
          <option value="madera">Madera</option>
          <option value="barro">Barro</option>
          <option value="lona">Lona</option>
        </select>
      </label>
      {errors.material_vivienda && <span>{errors.material_vivienda.message}</span>}

      <label>Situación de la vivienda
        <select {...register('situacion_vivienda')}>
          <option value="">Seleccionar...</option>
          <option value="buen-estado">Buen estado</option>
          <option value="regular">Regular</option>
          <option value="mal-estado">Mal estado</option>
          <option value="precario">Precario</option>
        </select>
      </label>

      <label>Situación de tenencia
        <select {...register('situacion_tenencia')}>
          <option value="">Seleccionar...</option>
          <option value="propietario">Propietario</option>
          <option value="alquiler">Alquiler</option>
          <option value="prestamo">Préstamo</option>
        </select>
      </label>
      {errors.situacion_tenencia && <span>{errors.situacion_tenencia.message}</span>}

      <p>Servicios</p>
      {SERVICIOS_DISPONIBLES.map((s) => (
        <label key={s}>
          <input type="checkbox" value={s} {...register('servicios')} /> {s}
        </label>
      ))}
    </fieldset>
  );
}