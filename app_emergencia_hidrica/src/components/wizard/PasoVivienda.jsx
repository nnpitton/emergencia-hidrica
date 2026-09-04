// src/components/wizard/PasoVivienda.jsx
import { useFormContext } from 'react-hook-form';

const SERVICIOS_DISPONIBLES = ['agua', 'luz', 'cloaca', 'pozo'];

export default function PasoVivienda() {
  const { register, formState: { errors } } = useFormContext();
  return (
    <fieldset>
      <h3 className="paso-titulo">Caracteristicas de la vivienda</h3>
      <div className="paso-grid">
        <div className="campo">
          <label className="campo-label" htmlFor="material_vivienda">Material de la vivienda</label>
          <select id="material_vivienda" {...register('material_vivienda')}>
            <option value="">Seleccionar...</option>
            <option value="ladrillo">Ladrillo</option>
            <option value="madera">Madera</option>
            <option value="barro">Barro</option>
            <option value="lona">Lona</option>
          </select>
          {errors.material_vivienda && <span className="campo-error">{errors.material_vivienda.message}</span>}
        </div>

        <div className="campo">
          <label className="campo-label" htmlFor="situacion_vivienda">Situacion de la vivienda</label>
          <select id="situacion_vivienda" {...register('situacion_vivienda')}>
            <option value="">Seleccionar...</option>
            <option value="buen-estado">Buen estado</option>
            <option value="regular">Regular</option>
            <option value="mal-estado">Mal estado</option>
            <option value="precario">Precario</option>
          </select>
          {errors.situacion_vivienda && <span className="campo-error">{errors.situacion_vivienda.message}</span>}
        </div>

        <div className="campo campo-full">
          <label className="campo-label" htmlFor="situacion_tenencia">Situacion de tenencia</label>
          <select id="situacion_tenencia" {...register('situacion_tenencia')}>
            <option value="">Seleccionar...</option>
            <option value="propietario">Propietario</option>
            <option value="alquiler">Alquiler</option>
            <option value="prestamo">Prestamo</option>
          </select>
          {errors.situacion_tenencia && <span className="campo-error">{errors.situacion_tenencia.message}</span>}
        </div>
      </div>

      <div className="campo">
        <span className="campo-label">Servicios disponibles</span>
        <div className="servicios-grid">
          {SERVICIOS_DISPONIBLES.map((s) => (
            <label key={s} className="servicio-chip">
              <input type="checkbox" value={s} {...register('servicios')} /> {s}
            </label>
          ))}
        </div>
      </div>
    </fieldset>
  );
}