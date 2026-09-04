# app_emergencia_hidrica

## Qué es

App offline-first (PWA) para relevar encuestas de emergencia hídrica puerta a puerta.
En esta fase no hay backend: cada encuesta se guarda localmente en el dispositivo
(IndexedDB) con `estado_sincronizacion: 'pendiente'`, dejando el campo listo para
cuando exista sincronización con un servidor (Fase 2).

## Stack

- React 19 + Vite 8
- react-hook-form + zod (`@hookform/resolvers`) para el formulario y su validación
- Dexie (IndexedDB) para persistencia local
- vite-plugin-pwa para instalación/offline

## Comandos

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run lint` — eslint
- `npm run preview` — preview del build

## Estructura

- `src/components/wizard/` — formulario de 6 pasos. `WizardEncuesta.jsx` orquesta
  el paso actual y el envío final; cada `Paso*.jsx` es un paso individual.
- `src/schemas/encuestaSchema.js` — schema zod único para todo el formulario,
  con validaciones cruzadas en `superRefine` (ej: F.P.P. obligatoria si hay
  embarazadas, o que mayores + menores no superen el total de integrantes).
- `src/db/db.js` — wrapper de Dexie: `guardarEncuestaFinalizada`,
  `listarEncuestas`, `contarPendientes`.
- `src/hooks/useOptionalGeolocation.js` — geolocalización opcional; su estado
  nunca bloquea el avance del formulario.
- `src/catalogos/` — catálogos estáticos (`zonas.js`).

## Convenciones

- Nombres de dominio y comentarios en español (`dni_jefe`, `encuestador_nombre`,
  etc.) — mantener ese idioma en el código nuevo.
- La validación por paso vive en `CAMPOS_POR_PASO` (`WizardEncuesta.jsx`): al
  agregar o quitar un campo del formulario hay que actualizar ese array además
  del schema, o el wizard no lo va a validar al avanzar de paso.
- El schema completo (con `superRefine`) solo corre al finalizar, vía
  `handleSubmit`. La validación por paso usa `methods.trigger()` con
  subconjuntos de campos.

## Contexto reciente

- Se eliminó el campo `localidad_id`: la ubicación ahora se resuelve solo con
  `zona_id`, contra un catálogo chico y fijo en `src/catalogos/zonas.js`.
  `src/catalogos/localidades.js` quedó sin ninguna referencia en el código —
  se puede borrar cuando se confirme que no hace falta recuperarlo.

## Pendiente / no asumir

- `src/catalogos/zonas.js` (y `localidades.js`, si se recupera) tienen datos
  de ejemplo, no el listado real del operativo — no asumir que están completos.
- `README.md` todavía es el genérico de Vite, no describe el proyecto.
- No hay backend ni tests todavía (Fase 1). No agregar llamadas a API sin
  confirmarlo primero.
