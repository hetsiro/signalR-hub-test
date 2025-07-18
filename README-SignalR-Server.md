# Servidor SignalR Simulado

Este es un servidor SignalR simple que simula el comportamiento del servidor `wss://api.primepass.cl/AcreditacionHub`.

## Características del Servidor

### Eventos Automáticos
- **`welcome`**: Se envía automáticamente cuando un cliente se conecta
- **`connected`**: Se envía automáticamente con información de la conexión

### Métodos Disponibles
- **`GetConnectionId()`**: Devuelve el ID de conexión del cliente
- **`Identificarse(userId)`**: Permite al cliente identificarse con un nombre de usuario
- **`EnviarMensaje(mensaje)`**: Envía un mensaje a todos los clientes conectados
- **`EnviarMensajePrivado(targetConnectionId, mensaje)`**: Envía un mensaje privado a un cliente específico

## Cómo Ejecutar el Servidor

### Prerrequisitos
- .NET 8.0 SDK instalado
- Visual Studio Code o Visual Studio

### Pasos para Ejecutar

1. **Abrir terminal en la carpeta del servidor**
   ```bash
   cd SignalRServer
   ```

2. **Restaurar dependencias**
   ```bash
   dotnet restore
   ```

3. **Ejecutar el servidor**
   ```bash
   dotnet run
   ```

4. **El servidor estará disponible en**
   ```
   http://localhost:5000
   https://localhost:5001
   ```

## Configurar el Frontend

Para conectar tu aplicación React al servidor local, cambia la URL en tu código:

```javascript
const connection = new signalR.HubConnectionBuilder()
  .withUrl('http://localhost:5000/AcreditacionHub', {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
    withCredentials: false
  })
  .build();
```

## Eventos que Recibirás

### Al Conectar
```json
{
  "methodName": "welcome",
  "args": ["Bienvenido, tu ID es: abc123"]
}
```

```json
{
  "methodName": "connected", 
  "args": [{
    "message": "Conexión establecida",
    "connectionId": "abc123",
    "timestamp": "2025-01-07T15:30:00"
  }]
}
```

### Al Identificarse
```json
{
  "methodName": "identificacionConfirmada",
  "args": [{
    "userId": "cristobal",
    "connectionId": "abc123",
    "message": "Identificación exitosa"
  }]
}
```

## Pruebas

1. **Conectar**: El servidor enviará automáticamente mensajes de bienvenida
2. **Obtener ID**: Llama a `connection.invoke('GetConnectionId')`
3. **Identificarse**: Llama a `connection.invoke('Identificarse', 'tu-nombre')`
4. **Enviar mensaje**: Llama a `connection.invoke('EnviarMensaje', 'Hola mundo')`

## Logs del Servidor

El servidor mostrará en consola:
- Cuando un cliente se conecta
- Cuando un cliente se desconecta
- Cuando un usuario se identifica
- Los mensajes enviados 