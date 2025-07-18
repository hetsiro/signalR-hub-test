"use client";

import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import FormularioBasico from "@/components/FormularioBasico";
import { Asistente } from "@/types/Asistente";

export default function Home() {
  const [connection, setConnection] = useState<string | null>(
    "Conectando al servidor..."
  );
  const [browserId, setBrowserId] = useState<string | null>(null);
  const [browserIdReconnected, setBrowserIdReconnected] = useState<
    string | null
  >(null);
  const [asistente, setAsistente] = useState<Asistente | null>(null);

  useEffect(() => {
    // Crear conexión
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("wss://api.primepass.cl/AcreditacionHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        withCredentials: false,
      })
      .build();

    // Conectar
    connection
      .start()
      .then(() => {
        console.log("Conectado al servidor");
        setConnection("Conectado al servidor!");
      })
      .catch((err) => {
        setConnection("Error de conexión al servidor");
        console.error("Error de conexión al servidor:", err);
      });

    // Escuchar eventos

    connection.on("Connected", (data) => {
      const connectionId = data.connectionId;
      console.log("Evento Connected:", connectionId);
      if (localStorage.getItem("browserId")) {
        setBrowserId(localStorage.getItem("browserId") || null);
        setBrowserIdReconnected(connectionId);
      } else {
        setBrowserId(connectionId);
        localStorage.setItem("browserId", connectionId);
      }
    });

    connection.on("AsistenteCreado", (data) => {
      const asistente = data;
      console.log("Evento AsistenteCreado:", asistente);
      setAsistente(asistente);
    });

    // Limpiar al desmontar
    return () => {
      connection.stop();
    };
  }, []);

  return (
    <>
      <h1
        className={`text-3xl font-bold text-center py-4 ${
          connection === "Conectado al servidor!"
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {connection}
      </h1>

      {/* Formulario */}
      {browserId ? (
        <FormularioBasico
          browserid={browserId}
          asistente={asistente}
          browserIdReconnected={browserIdReconnected}
        />
      ) : (
        <div>Cargando BrowserId...</div>
      )}
      {/* Iframe */}
      {/* {browserId && (
        <div className="mt-8 w-full">
          <iframe 
            src={`https://qa.circulodeespecialistas.cl/inscripcion-mejor-maestro?browserid=${browserId}`}
            className="w-full h-96 border-0"
            title="Formulario de inscripción"
          />
        </div>
      )} */}
    </>
  );
}
