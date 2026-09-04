// src/components/wizard/PasoNivelEmergencia.jsx
import { useFormContext } from 'react-hook-form';

const NIVELES = [
  { valor: 1, etiqueta: 'Bajo' },
  { valor: 2, etiqueta: 'Moderado' },
  { valor: 3, etiqueta: 'Alto' },
  { valor: 4, etiqueta: 'Critico' },
];

export default function PasoNivelEmergencia() {
  const { register, watch, formState: { errors } } = useFormContext();
  const nivelActual = watch('nivel_emergencia');

  return (
    <fieldset>
      <h3 className="paso-titulo">Nivel de emergencia</h3>
      <p className="text-sm text-muted" style={{ marginBottom: 'var(--space-lg)' }}>
        Seleccionar el nivel que corresponda segun la evaluacion realizada.
      </p>

      <div className="niveles-grid">
        {NIVELES.map((n) => (
          <label
            key={n.valor}
            className={`nivel-card nivel-${n.valor}${String(nivelActual) === String(n.valor) ? ' seleccionado' : ''}`}
          >
            <input type="radio" value={n.valor} {...register('nivel_emergencia')} />
            <div className="nivel-card-numero">{n.valor}</div>
            <span className="nivel-card-label">Nivel {n.valor} — {n.etiqueta}</span>
          </label>
        ))}
      </div>
      {errors.nivel_emergencia && <span className="campo-error">{errors.nivel_emergencia.message}</span>}
    </fieldset>
  );
}