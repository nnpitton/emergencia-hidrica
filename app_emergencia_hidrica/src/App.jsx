import { useState } from 'react';
import WizardEncuesta from './components/wizard/WizardEncuesta';
import ListadoEncuestas from './components/ListadoEncuestas';
import './App.css';

export default function App() {
  const [refrescar, setRefrescar] = useState(0);
  return (
    <>
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-header-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C12 2 5 10.5 5 15a7 7 0 0 0 14 0C19 10.5 12 2 12 2zm0 18a5 5 0 0 1-5-5c0-3.13 3.8-8.91 5-10.78C13.2 6.09 17 11.87 17 15a5 5 0 0 1-5 5z" />
            </svg>
          </div>
          <div>
            <h1>Relevamiento Emergencia Hidrica</h1>
            <p>Sistema de relevamiento puerta a puerta</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <section className="seccion">
          <WizardEncuesta onGuardada={() => setRefrescar((r) => r + 1)} />
        </section>

        <section className="seccion">
          <ListadoEncuestas refrescarSenal={refrescar} />
        </section>
      </main>
    </>
  );
}