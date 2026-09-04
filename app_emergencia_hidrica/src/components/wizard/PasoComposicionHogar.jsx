
import { useFormContext } from 'react-hook-form';

export default function PasoComposicionHogar() {
  const { register, watch, formState: { errors } } = useFormContext();
  const hayEmbarazadas = watch('embarazadas');

  return (
    <fieldset>
      <h3 className="paso-titulo">Composicion del hogar</h3>
      <div className="paso-grid">
        <div className="campo">
          <label className="campo-label" htmlFor="cantidad_integrantes">Total de integrantes</label>
          <input id="cantidad_integrantes" type="number" inputMode="numeric" {...register('cantidad_integrantes')} placeholder="0" />
          {errors.cantidad_integrantes && <span className="campo-error">{errors.cantidad_integrantes.message}</span>}
        </div>

        <div className="campo">
          <label className="campo-label" htmlFor="cantidad_mayores">Mayores de 18</label>
          <input id="cantidad_mayores" type="number" inputMode="numeric" {...register('cantidad_mayores')} placeholder="0" />
        </div>

        <div className="campo">
          <label className="campo-label" htmlFor="cantidad_menores">Menores de 18</label>
          <input id="cantidad_menores" type="number" inputMode="numeric" {...register('cantidad_menores')} placeholder="0" />
        </div>
      </div>

      <div className="checks-grupo">
        <label className="campo-check">
          <input type="checkbox" {...register('embarazadas')} /> Embarazadas
        </label>
        <label className="campo-check">
          <input type="checkbox" {...register('adultos_mayores')} /> Adultos mayores
        </label>
        <label className="campo-check">
          <input type="checkbox" {...register('menores_con_discapacidad')} /> Menores/mayores con discapacidad
        </label>
      </div>

      {hayEmbarazadas && (
        <div className="campo animate-in" style={{ maxWidth: '280px' }}>
          <label className="campo-label" htmlFor="fpp">Fecha probable de parto (F.P.P.)</label>
          <input id="fpp" type="date" {...register('fpp')} />
          {errors.fpp && <span className="campo-error">{errors.fpp.message}</span>}
        </div>
      )}
    </fieldset>
  );
}