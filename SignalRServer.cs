using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Agregar SignalR
builder.Services.AddSignalR();

// Configurar CORS para permitir conexiones desde el frontend
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configurar CORS
app.UseCors();

// Mapear el hub
app.MapHub<AcreditacionHub>("/AcreditacionHub");

app.Run();

// Hub de SignalR
public class AcreditacionHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        var connectionId = Context.ConnectionId;
        Console.WriteLine($"Cliente conectado: {connectionId}");
        
        // Enviar mensaje de bienvenida automáticamente
        await Clients.Caller.SendAsync("welcome", $"Bienvenido, tu ID es: {connectionId}");
        
        // También enviar un mensaje de conexión establecida
        await Clients.Caller.SendAsync("connected", new { 
            message = "Conexión establecida", 
            connectionId = connectionId,
            timestamp = DateTime.Now
        });
        
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var connectionId = Context.ConnectionId;
        Console.WriteLine($"Cliente desconectado: {connectionId}");
        await base.OnDisconnectedAsync(exception);
    }

    // Método para obtener el connectionId
    public string GetConnectionId()
    {
        return Context.ConnectionId;
    }

    // Método para identificarse
    public async Task Identificarse(string userId)
    {
        var connectionId = Context.ConnectionId;
        Console.WriteLine($"Usuario {userId} se identificó con connectionId: {connectionId}");
        
        // Enviar confirmación al cliente
        await Clients.Caller.SendAsync("identificacionConfirmada", new {
            userId = userId,
            connectionId = connectionId,
            message = "Identificación exitosa"
        });
        
        // Notificar a todos los demás clientes
        await Clients.Others.SendAsync("nuevoUsuarioConectado", new {
            userId = userId,
            connectionId = connectionId
        });
    }

    // Método para enviar mensaje a todos
    public async Task EnviarMensaje(string mensaje)
    {
        var connectionId = Context.ConnectionId;
        await Clients.All.SendAsync("mensajeRecibido", new {
            mensaje = mensaje,
            connectionId = connectionId,
            timestamp = DateTime.Now
        });
    }

    // Método para enviar mensaje privado
    public async Task EnviarMensajePrivado(string targetConnectionId, string mensaje)
    {
        await Clients.Client(targetConnectionId).SendAsync("mensajePrivado", new {
            mensaje = mensaje,
            fromConnectionId = Context.ConnectionId,
            timestamp = DateTime.Now
        });
    }
} 