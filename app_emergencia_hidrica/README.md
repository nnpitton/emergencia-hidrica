# Sistema de Relevamiento - Emergencia Hídrica

Aplicación web progresiva (**PWA - Offline First**) diseñada para la toma de datos en territorio puerta a puerta durante situaciones de emergencia hídrica e inundaciones. Permite a los encuestadores y brigadistas registrar a las familias damnificadas, relevar el estado de las viviendas y priorizar la asistencia de emergencia, incluso en zonas sin conectividad a internet ni señal móvil.

---

## 📌 Propósito y Alcance

Ante eventos climáticos o crecidas de ríos, los equipos de emergencia necesitan relevar de forma rápida, estructurada y confiable a las familias afectadas.

Esta aplicación reemplaza y complementa la planilla física tradicional en papel, garantizando:
- **Cero pérdida de datos**: almacenamiento local inmediato en el dispositivo mediante IndexedDB.
- **Trazabilidad en terreno**: captura de coordenadas GPS de la vivienda y referencias geográficas precisas.
- **Validación en tiempo real**: control de consistencia de los datos familiares, sanitarios y de vivienda antes de finalizar la carga.
- **Preparación para sincronización**: cada registro queda marcado como `pendiente` para su posterior envío centralizado cuando se restablezca la conexión.

---

## 🚀 Características Principales

### 1. Funcionamiento Offline-First y PWA
- **Instalable**: funciona como una app nativa en dispositivos Android, iOS, Windows y macOS.
- **Sin necesidad de internet**: la interfaz y la base de datos local están 100% disponibles sin conexión mediante Service Workers (Workbox) y Dexie.js (IndexedDB).

### 2. Flujo Guiado en 6 Pasos (Wizard)
El relevamiento se divide en etapas claras para agilizar la carga en campo:
1. **Encuestador**: Identificación del brigadista o agente que realiza la visita (nombre y DNI).
2. **Identificación del Jefe/a de Hogar**: Datos personales (DNI, apellido y nombres, edad, estado civil, celular de contacto y nivel educativo alcanzado).
3. **Ubicación Geográfica**:
   - Zona del operativo (Norte, Sur, Este, Oeste, Centro).
   - Localidad y domicilio exacto.
   - Referencias espaciales (esquinas, escuelas, comercios, puntos de referencia).
   - Geolocalización satelital (GPS) asistida de alta precisión.
4. **Composición del Hogar**:
   - Total de integrantes, desglose de mayores y menores (con validación de consistencia).
   - Detección de situaciones prioritarias: personas con discapacidad, enfermedades crónicas, personas mayores o personas gestantes (con fecha probable de parto condicional).
5. **Vivienda y Nivel de Afectación**:
   - Tipo y material predominante de la vivienda (material, chapa, madera, precaria).
   - Tenencia del terreno (propietario, inquilino, ocupante, prestado).
   - Estado de afectación por el agua (ingreso de agua al terreno o interior, altura alcanzada, pérdidas materiales).
   - Servicios básicos disponibles (agua potable, electricidad, cloaca/pozo, gas).
6. **Nivel de Emergencia y Asistencia**:
   - Clasificación de urgencia (Baja, Media, Alta, Crítica).
   - Necesidades inmediatas prioritarias (agua potable, alimentos, colchones/frazadas, medicamentos, evacuación).
   - Observaciones generales del encuestador.

### 3. Consulta y Gestión de Encuestas
- **Listado local**: visualización de todas las encuestas guardadas en el dispositivo.
- **Vista detallada desplegable**: panel expandible para auditar cada campo registrado de la familia.
- **Identificadores de estado**: monitoreo del estado de sincronización de cada ficha.

---

## 🛠️ Tecnologías Utilizadas

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Formularios y Validación**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Almacenamiento Local**: [Dexie.js](https://dexie.org/) (IndexedDB wrapper)
- **PWA & Cache**: [Vite Plugin PWA](https://vite-pwa-org.netlify.app/) con Workbox
- **Diseño & Estilos**: CSS Vanilla con variables de diseño (Design Tokens), arquitectura modular, soporte responsivo optimizado para móviles y paleta cromática de alta legibilidad.

---

## 📁 Estructura del Proyecto

```text
app_emergencia_hidrica/
├── public/                     # Recursos estáticos, manifest e iconos PWA
│   ├── favicon.svg
│   └── icons/                  # Iconos adaptativos PWA (192, 512, maskable)
├── src/
│   ├── components/
│   │   ├── ListadoEncuestas.jsx      # Vista de encuestas guardadas con detalle expandible
│   │   └── wizard/                   # Pasos del formulario guiado
│   │       ├── WizardEncuesta.jsx    # Orquestador del wizard y validación por paso
│   │       ├── PasoEncuestador.jsx
│   │       ├── PasoIdentificacion.jsx
│   │       ├── PasoUbicacion.jsx
│   │       ├── PasoComposicionHogar.jsx
│   │       ├── PasoVivienda.jsx
│   │       └── PasoNivelEmergencia.jsx
│   ├── db/
│   │   └── db.js                     # Configuración y métodos de Dexie / IndexedDB
│   ├── hooks/
│   │   └── useOptionalGeolocation.js # Hook para captura y diagnóstico de GPS
│   ├── schemas/
│   │   └── encuestaSchema.js         # Validaciones y reglas de consistencia de Zod
│   ├── App.css                       # Estilos de componentes y layout
│   ├── App.jsx                       # Componente principal y navegación
│   ├── index.css                     # Variables CSS globales, tipografía y resets
│   └── main.jsx                      # Punto de entrada de la aplicación
├── index.html                  # HTML base y configuración de vista móvil
├── package.json                # Dependencias y scripts
└── vite.config.js              # Configuración de Vite y plugin PWA
```

---

## 💻 Instalación y Uso Local

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- Gestor de paquetes `npm`

### Pasos

1. **Clonar o abrir el repositorio**:
   ```bash
   cd app_emergencia_hidrica
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar en modo desarrollo**:
   ```bash
   npm run dev
   ```
   Abrir [http://localhost:5173/](http://localhost:5173/) en el navegador.

4. **Compilar para producción**:
   ```bash
   npm run build
   ```

5. **Previsualizar la versión de producción (PWA y Service Worker completos)**:
   ```bash
   npm run preview
   ```
