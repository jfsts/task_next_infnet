// app/RegisterServiceWorker.js
'use client';

import { useEffect } from 'react';

const RegisterServiceWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch((error) => {
          console.log('Falha ao registrar o Service Worker:', error);
        });
    }
  }, []);

  return null;
};

export default RegisterServiceWorker;