
import { z } from 'zod';

export const encuestaSchema = z.object({
  dni_jefe: z.string().regex(/^\d{7,8}$/, 'DNI inválido'),
  apellido_nombre: z.string().min(2, 'Obligatorio'),
  edad: z.coerce.number().int().positive(),
  estado_civil: z.string().optional(),

  // Zona del operativo (reemplaza a la antigua "localidad"). Catálogo fijo
  // y chico (ver src/catalogos/zonas.js) — no requiere geolocalización.
  zona_id: z.string().min(1, 'Seleccioná una zona'),
  domicilio: z.string().min(1, 'Obligatorio'),
  referencias_ubicacion: z.string().optional(),
  latitud: z.number().nullable().optional(),
  longitud: z.number().nullable().optional(),

  cantidad_integrantes: z.coerce.number().int().min(1),
  cantidad_mayores: z.coerce.number().int().min(0),
  cantidad_menores: z.coerce.number().int().min(0),
  embarazadas: z.boolean(),
  fpp: z.string().optional(),
  adultos_mayores: z.boolean(),
  menores_con_discapacidad: z.boolean(),

  material_vivienda: z.string().min(1, 'Obligatorio'),
  situacion_vivienda: z.string().min(1, 'Obligatorio'),
  situacion_tenencia: z.string().min(1, 'Obligatorio'),
  servicios: z.array(z.string()).default([]),

  nivel_emergencia: z.coerce.number().int().min(1).max(4),

  encuestador_nombre: z.string().min(2, 'El nombre del encuestador es obligatorio'),
  observaciones_finales: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.embarazadas && !data.fpp) {
    ctx.addIssue({ path: ['fpp'], code: z.ZodIssueCode.custom,
      message: 'F.P.P. es obligatoria si hay embarazadas en el hogar' });
  }
  if (data.cantidad_mayores + data.cantidad_menores > data.cantidad_integrantes) {
    ctx.addIssue({ path: ['cantidad_integrantes'], code: z.ZodIssueCode.custom,
      message: 'La suma de mayores y menores no puede superar el total de integrantes' });
  }
});