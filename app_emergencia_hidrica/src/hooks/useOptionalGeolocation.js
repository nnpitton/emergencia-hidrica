import { useState } from 'react';

export function useOptionalGeolocation() {
  const [coords, setCoords] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | buscando | ok | no-disponible

  function intentarCapturar() {
    if (!('geolocation' in navigator)) { setStatus('no-disponible'); return; }
    setStatus('buscando');
    navigator.geolocation.getCurrentPosition(
      (pos) => { setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setStatus('ok'); },
      () => setStatus('no-disponible'),
      { timeout: 8000 }
    );
  }
  return { coords, status, intentarCapturar }; // nunca bloquea el avance del formulario
}