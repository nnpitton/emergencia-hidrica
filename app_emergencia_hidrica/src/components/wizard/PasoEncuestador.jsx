
import { useFormContext } from 'react-hook-form';
export default function PasoEncuestador() {
  const { register, formState: { errors } } = useFormContext();
  return (
    <fieldset>
      <h3 className="paso-titulo">Datos del encuestador</h3>
      <div className="campo">
        <label className="campo-label" htmlFor="encuestador_nombre">Nombre del encuestador</label>
        <input id="encuestador_nombre" {...register('encuestador_nombre')} placeholder="Nombre completo" />
        {errors.encuestador_nombre && <span className="campo-error">{errors.encuestador_nombre.message}</span>}
      </div>

      <div className="campo">
        <label className="campo-label" htmlFor="observaciones_finales">Observaciones finales</label>
        <textarea
          id="observaciones_finales"
          {...register('observaciones_finales')}
          placeholder="Comentarios adicionales sobre la situacion del hogar..."
          rows={4}
        />
      </div>
    </fieldset>
  );
}