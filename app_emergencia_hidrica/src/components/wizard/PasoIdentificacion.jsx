
import { useFormContext } from 'react-hook-form';

export default function PasoIdentificacion() {
  const { register, formState: { errors } } = useFormContext();
  return (
    <fieldset>
      <label>DNI<input {...register('dni_jefe')} /></label>
      {errors.dni_jefe && <span>{errors.dni_jefe.message}</span>}

      <label>Apellido y nombre<input {...register('apellido_nombre')} /></label>
      {errors.apellido_nombre && <span>{errors.apellido_nombre.message}</span>}

      <label>Edad<input type="number" {...register('edad')} /></label>
      <label>Estado civil<input {...register('estado_civil')} /></label>
    </fieldset>
  );
}