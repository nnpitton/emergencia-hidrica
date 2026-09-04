
import { useFormContext } from 'react-hook-form';

const ESTADOS_CIVILES = [
  { valor: 'soltero', label: 'Soltero/a' },
  { valor: 'casado', label: 'Casado/a' },
  { valor: 'viudo', label: 'Viudo/a' },
  { valor: 'concubinato', label: 'En concubinato' },
];

const NIVELES_EDUCATIVOS = [
  { valor: 'primaria_completa', label: 'Primaria completa' },
  { valor: 'primaria_incompleta', label: 'Primaria incompleta' },
  { valor: 'secundaria_completa', label: 'Secundaria completa' },
  { valor: 'secundaria_incompleta', label: 'Secundaria incompleta' },
  { valor: 'terciario_completo', label: 'Terciario completo' },
  { valor: 'terciario_incompleto', label: 'Terciario incompleto' },
];

export default function PasoIdentificacion() {
  const { register, formState: { errors } } = useFormContext();
  return (
    <fieldset>
      <h3 className="paso-titulo">Datos del jefe/a de hogar</h3>
      <div className="paso-grid">
        <div className="campo">
          <label className="campo-label" htmlFor="dni_jefe">DNI</label>
          <input id="dni_jefe" inputMode="numeric" {...register('dni_jefe')} placeholder="Ej: 30123456" />
          {errors.dni_jefe && <span className="campo-error">{errors.dni_jefe.message}</span>}
        </div>

        <div className="campo">
          <label className="campo-label" htmlFor="apellido_nombre">Apellido y nombre</label>
          <input id="apellido_nombre" {...register('apellido_nombre')} placeholder="Apellido, Nombre" />
          {errors.apellido_nombre && <span className="campo-error">{errors.apellido_nombre.message}</span>}
        </div>

        <div className="campo">
          <label className="campo-label" htmlFor="edad">Edad</label>
          <input id="edad" type="number" inputMode="numeric" {...register('edad')} placeholder="Edad" />
          {errors.edad && <span className="campo-error">{errors.edad.message}</span>}
        </div>

        <div className="campo">
          <label className="campo-label" htmlFor="estado_civil">Estado civil</label>
          <select id="estado_civil" {...register('estado_civil')}>
            <option value="">Seleccionar...</option>
            {ESTADOS_CIVILES.map((ec) => (
              <option key={ec.valor} value={ec.valor}>{ec.label}</option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label className="campo-label" htmlFor="celular">Celular (opcional)</label>
          <input id="celular" type="tel" inputMode="tel" {...register('celular')} placeholder="Ej: 3816123456" />
        </div>
      </div>

      <div className="campo">
        <span className="campo-label">Nivel educativo</span>
        {errors.nivel_educativo && <span className="campo-error">{errors.nivel_educativo.message}</span>}
        <div className="checks-grupo">
          {NIVELES_EDUCATIVOS.map((ne) => (
            <label key={ne.valor} className="campo-check">
              <input type="radio" value={ne.valor} {...register('nivel_educativo')} />
              {ne.label}
            </label>
          ))}
        </div>
      </div>
    </fieldset>
  );
}