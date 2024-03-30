import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from '../services/rooms.service';

@WebSocketGateway()
export class RoomsGateway {
  constructor(private readonly roomsService: RoomsService) {}

  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    // Aquí podrías implementar lógica adicional al conectar el cliente al websocket
    console.log(`Cliente conectado: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    // Aquí podrías implementar lógica adicional al desconectar el cliente del websocket
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('getRooms')
  async handleGetRooms(client: Socket) {
    try {
      const rooms = await this.roomsService.getAllWithUserCount();
      client.emit('rooms', rooms);
    } catch (error) {
      // Manejo de errores
      console.error('Error al obtener las salas:', error.message);
    }
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, { roomId, teamId }: { roomId: string, teamId: string }) {
    try {
      await this.roomsService.addTeamToRoom(roomId, teamId);
      const rooms = await this.roomsService.getAllWithUserCount();
      this.server.emit('rooms', rooms); // Emitir actualización a todos los clientes conectados
    } catch (error) {
      // Manejo de errores
      console.error('Error al unirse a la sala:', error.message);
    }
  }
}
