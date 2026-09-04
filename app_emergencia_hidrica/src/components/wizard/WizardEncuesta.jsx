import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { encuestaSchema } from '../../schemas/encuestaSchema';
import { guardarEncuestaFinalizada } from '../../db/db';
import PasoIdentificacion from './PasoIdentificacion';
import PasoUbicacion from './PasoUbicacion';
import PasoComposicionHogar from './PasoComposicionHogar';
import PasoVivienda from './PasoVivienda';
import PasoNivelEmergencia from './PasoNivelEmergencia';
import PasoEncuestador from './PasoEncuestador';

const PASOS = [
  PasoIdentificacion,
  PasoUbicacion,
  PasoComposicionHogar,
  PasoVivienda,
  PasoNivelEmergencia,
  PasoEncuestador,
];

const NOMBRES_PASOS = [
  'Identificacion',
  'Ubicacion',
  'Hogar',
  'Vivienda',
  'Emergencia',
  'Encuestador',
];

const PASO_COMPOSICION_HOGAR = 2;

const CAMPOS_POR_PASO = [
  ['dni_jefe', 'apellido_nombre', 'edad', 'estado_civil', 'celular', 'nivel_educativo'], // 0: Identificación
  ['zona_id', 'localidad', 'domicilio'],                                                   // 1: Ubicación (refs/gps son opcionales)
  ['cantidad_integrantes', 'cantidad_mayores', 'cantidad_menores', 'embarazadas', 'fpp'],   // 2: Composición del hogar
  ['material_vivienda', 'situacion_vivienda', 'situacion_tenencia'],                        // 3: Vivienda
  ['nivel_emergencia'],                                                                     // 4: Nivel de emergencia
  ['encuestador_nombre', 'observaciones_finales'],                                          // 5: Encuestador
];

export default function WizardEncuesta({ onGuardada }) {
  const [pasoActual, setPasoActual] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const methods = useForm({
    resolver: zodResolver(encuestaSchema),
    mode: 'onBlur',
    defaultValues: {
      embarazadas: false,
      adultos_mayores: false,
      menores_con_discapacidad: false,
      servicios: [],
    },
  });

  const esUltimoPaso = pasoActual === PASOS.length - 1;
  const PasoComponente = PASOS[pasoActual];

  async function irAlSiguiente() {

    const ok = await methods.trigger(CAMPOS_POR_PASO[pasoActual]);
    if (!ok) return;

    // Las reglas cruzadas del superRefine (integrantes = mayores+menores, F.P.P.
    // obligatoria si hay embarazadas) solo se ejecutan cuando TODO el formulario es
    // valido (Zod no corre superRefine si el objeto tiene otros campos invalidos,
    // como los de pasos posteriores todavia vacios). Por eso se validan a mano acá.
    if (pasoActual === PASO_COMPOSICION_HOGAR) {
      const { cantidad_integrantes, cantidad_mayores, cantidad_menores } = methods.getValues();
      const total = Number(cantidad_integrantes) || 0;
      const mayores = Number(cantidad_mayores) || 0;
      const menores = Number(cantidad_menores) || 0;
      if (mayores + menores !== total) {
        methods.setError('cantidad_integrantes', {
          type: 'manual',
          message: 'El total de integrantes debe ser igual a la suma de mayores y menores',
        });
        return;
      }

      const { embarazadas, fpp } = methods.getValues();
      if (embarazadas && !fpp) {
        methods.setError('fpp', {
          type: 'manual',
          message: 'F.P.P. es obligatoria si hay embarazadas en el hogar',
        });
        return;
      }
    }

    setPasoActual((p) => Math.min(p + 1, PASOS.length - 1));
  }

  function irAlAnterior() {
    setPasoActual((p) => Math.max(p - 1, 0));
  }

  async function finalizar(datos) {
    // Acá sí corre el schema completo (incluye las reglas cruzadas de superRefine,
    // como F.P.P. obligatoria si embarazadas === true), vía handleSubmit más abajo.
    const id = await guardarEncuestaFinalizada(datos);
    methods.reset();
    setPasoActual(0);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
    onGuardada?.(id);
  }

  return (
    <FormProvider {...methods}>
      <div className="wizard">
        {/* Barra de progreso */}
        <div className="wizard-progreso">
          {PASOS.map((_, i) => (
            <div
              key={i}
              className={`wizard-paso-indicador${i === pasoActual ? ' activo' : ''}${i < pasoActual ? ' completado' : ''}`}
            >
              <div className="wizard-paso-dot">
                {i < pasoActual ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              {i < PASOS.length - 1 && <div className="wizard-paso-linea" />}
            </div>
          ))}
        </div>
        <div className="wizard-paso-nombre">
          Paso {pasoActual + 1} de {PASOS.length} — {NOMBRES_PASOS[pasoActual]}
        </div>

        {/* Contenido del paso */}
        <form onSubmit={methods.handleSubmit(finalizar)}>
          <div className="card" style={{ padding: 'var(--space-xl)' }}>
            <div className="wizard-contenido" key={pasoActual}>
              <PasoComponente />
            </div>
          </div>

          <div className="wizard-acciones">
            {pasoActual > 0 && (
              <button type="button" className="btn btn-secondary" onClick={irAlAnterior}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                Atras
              </button>
            )}
            <div className="wizard-acciones-derecha">
              {!esUltimoPaso && (
                <button type="button" className="btn btn-primary" onClick={irAlSiguiente}>
                  Siguiente
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              )}
              {esUltimoPaso && (
                <button type="submit" className="btn btn-success">
                  Finalizar encuesta
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {toastVisible && (
        <div className="toast-exito">Encuesta guardada correctamente</div>
      )}
    </FormProvider>
  );
}