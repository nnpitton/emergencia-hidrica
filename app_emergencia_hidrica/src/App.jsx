import { useState } from 'react';
import WizardEncuesta from './components/wizard/WizardEncuesta';
import ListadoEncuestas from './components/ListadoEncuestas';

export default function App() {
  const [refrescar, setRefrescar] = useState(0);
  return (
    <div>
      <h1>Relevamiento Emergencia Hídrica</h1>
      <WizardEncuesta onGuardada={() => setRefrescar((r) => r + 1)} />
      <hr />
      <ListadoEncuestas refrescarSenal={refrescar} />
    </div>
  );
}