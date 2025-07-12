'use client';

import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

export default function Home() {
  const [connection, setConnection] = useState<string | null>('Conectando al servidor...');
  const [mensaje, setMensaje] = useState<any | null>(null);
  useEffect(() => {
    // Crear conexión
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('wss://api.primepass.cl/AcreditacionHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        withCredentials: false
      })
      .build();

    // Conectar
    connection.start()
      .then(() => {
        console.log('Conectado al servidor');
        setConnection('Conectado al servidor!');
        // Te conectas Y le dices quién eres
        connection.invoke('Identificarse', { userId: 'cristobal' })
          .then(() => {
            console.log('Servidor recibió tu identificación');
          })
          .catch((error) => {
            console.log('Error, el servidor no recibió tu identificación:', error);
          });
      })
      .catch((err) => {
        setConnection('Error de conexión al servidor');
        console.error('Error de conexión al servidor:', err);
      });

    // Escuchar eventos
    connection.on('*', (datos) => {
      console.log('Evento recibido:', datos);
      setMensaje(datos);
    });

    // Limpiar al desmontar
    return () => {
      connection.stop();
    };
  }, []);

  return (
    <div className='bg-gray-100 border-4 border-gray-600 text-black p-4 rounded-lg min-w-1/2 min-h-1/2 flex flex-col justify-start items-center'>
      <h1 className='text-3xl font-bold'>{connection}</h1>
      <p className='my-auto text-3xl'>{JSON.stringify(mensaje)}</p>
    </div>
  );
} 