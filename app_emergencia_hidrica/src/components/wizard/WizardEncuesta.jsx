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


const CAMPOS_POR_PASO = [
  ['dni_jefe', 'apellido_nombre', 'edad', 'estado_civil'],                                 // 0: Identificación
  ['zona_id', 'domicilio'],                                                                // 1: Ubicación (refs/gps son opcionales)
  ['cantidad_integrantes', 'cantidad_mayores', 'cantidad_menores', 'embarazadas', 'fpp'],   // 2: Composición del hogar
  ['material_vivienda', 'situacion_vivienda', 'situacion_tenencia'],                        // 3: Vivienda
  ['nivel_emergencia'],                                                                     // 4: Nivel de emergencia
  ['encuestador_nombre', 'observaciones_finales'],                                          // 5: Encuestador
];

export default function WizardEncuesta({ onGuardada }) {
  const [pasoActual, setPasoActual] = useState(0);
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
    if (ok) setPasoActual((p) => Math.min(p + 1, PASOS.length - 1));
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
    onGuardada?.(id);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(finalizar)}>
        <p>Paso {pasoActual + 1} de {PASOS.length}</p>
        <PasoComponente />
        <div>
          {pasoActual > 0 && (
            <button type="button" onClick={irAlAnterior}>Atrás</button>
          )}
          {!esUltimoPaso && (
            <button type="button" onClick={irAlSiguiente}>Siguiente</button>
          )}
          {esUltimoPaso && <button type="submit">Finalizar</button>}
        </div>
      </form>
    </FormProvider>
  );
}