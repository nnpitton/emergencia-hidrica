
import { useFormContext } from 'react-hook-form';
export default function PasoEncuestador() {
  const { register, formState: { errors } } = useFormContext();
  return (
     <fieldset>
      <label>Nombre Encuestador<input {...register('encuestador_nombre')} /></label>
      {errors.encuestador_nombre && <span>{errors.encuestador_nombre.message}</span>}

      <label>
        Observaciones Finales
        <textarea {...register('observaciones_finales')} placeholder="Comentarios adicionales..." />
      </label>
      

      
    </fieldset>

  );
}