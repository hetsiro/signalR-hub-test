
// import * as signalR from "@microsoft/signalr";

export default function Home() {

    // Crear conexión
    // const connection = new signalR.HubConnectionBuilder()
    //   .withUrl("wss://api.primepass.cl/AcreditacionHub", {
    //     skipNegotiation: true,
    //     transport: signalR.HttpTransportType.WebSockets,
    //     withCredentials: false,
    //   })
    //   .build();

    // // Conectar
    // connection
    //   .start()
    //   .then(() => {
    //     console.log("Conectado al servidor");
    //     setConnection("Conectado al servidor!");
    //   })
    //   .catch((err) => {
    //     setConnection("Error de conexión al servidor");
    //     console.error("Error de conexión al servidor:", err);
    //   });

    // // Escuchar eventos
    // connection.on("Connected", (data) => {
    //   const connectionId = data.connectionId;
    //   console.log("Evento recibido:", connectionId);
    //   setBrowserId(connectionId);

    //   fetch("https://api.primepass.cl/api/mejormaestro/formtest", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       rut: "237406133",
    //       nombre: "Andrea",
    //       apellido: "Godoy",
    //       mail: "agodoy1009@gmail.com",
    //       celular: "985192689",
    //       fnac: "1973-09-10T00:00:00",
    //       especialidad: "ninguna",
    //       region: "Metropolitana",
    //       comuna: "Las condes",
    //       browserid: connectionId,
    //       checkboxterminos: "true",
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("Respuesta:", data);
    //     });
    // });

    // // Limpiar al desmontar
    // return () => {
    //   connection.stop();
    // };


  return (
    <div className="bg-gradient-to-tr from-gray-500 to-stone-600 text-white p-4 rounded-lg min-w-1/2 min-h-1/2 flex flex-col justify-start items-center">
      {/* <h1 className="text-3xl font-bold">{connection}</h1> */}
      <iframe src={`https://qa.circulodeespecialistas.cl/inscripcion-mejor-maestro`} />
    </div>
  );
}
