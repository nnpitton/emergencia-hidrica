import { useCallback, useState } from 'react';

export function useOptionalGeolocation() {
  const [coords, setCoords] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | buscando | ok | no-disponible

  const intentarCapturar = useCallback(() => {
    if (!('geolocation' in navigator)) { setStatus('no-disponible'); return; }
    setStatus('buscando');
    navigator.geolocation.getCurrentPosition(
      (pos) => { setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setStatus('ok'); },
      () => setStatus('no-disponible'),
      // enableHighAccuracy + maximumAge alto: en exteriores el chip GPS suele tardar
      // varios segundos en dar un fix; con 8s sin cache fallaba seguido en el campo.
      { timeout: 20000, enableHighAccuracy: true, maximumAge: 60000 }
    );
  }, []);

  return { coords, status, intentarCapturar }; // nunca bloquea el avance del formulario
}