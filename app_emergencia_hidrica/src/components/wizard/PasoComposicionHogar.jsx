
import { useFormContext } from 'react-hook-form';

export default function PasoComposicionHogar() {
  const { register, formState: { errors } } = useFormContext();
  return (
    <fieldset>
      <label>Cantidad de integrantes<input type="number" {...register('cantidad_integrantes')} /></label>
      <label>Cantidad de mayores<input type="number" {...register('cantidad_mayores')} /></label>
      <label>Cantidad de menores<input type="number" {...register('cantidad_menores')} /></label>
      {errors.cantidad_integrantes && <span>{errors.cantidad_integrantes.message}</span>}

      <label><input type="checkbox" {...register('embarazadas')} /> Embarazadas</label>
      <label>F.P.P.<input type="date" {...register('fpp')} /></label>
      {errors.fpp && <span>{errors.fpp.message}</span>}

      <label><input type="checkbox" {...register('adultos_mayores')} /> Adultos mayores</label>
      <label><input type="checkbox" {...register('menores_con_discapacidad')} /> Menores/mayores con discapacidad</label>
    </fieldset>
  );
}