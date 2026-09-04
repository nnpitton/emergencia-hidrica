// src/components/wizard/PasoNivelEmergencia.jsx
import { useFormContext } from 'react-hook-form';

export default function PasoNivelEmergencia() {
  const { register, formState: { errors } } = useFormContext();
  return (
    <fieldset>
      <p>Nivel de emergencia (marcar con una cruz el que corresponda)</p>
      {[1, 2, 3, 4].map((n) => (
        <label key={n}>
          <input type="radio" value={n} {...register('nivel_emergencia')} /> Nivel {n}
        </label>
      ))}
      {errors.nivel_emergencia && <span>{errors.nivel_emergencia.message}</span>}
    </fieldset>
  );
}