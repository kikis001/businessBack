import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from '../services/rooms.service';

@WebSocketGateway()
export class RoomsGateway {
  // constructor(private roomsService: RoomsService) {}
  // @WebSocketServer() server: Server;

  // afterInit(server: Server) {
  //   console.log('WebSocket inicializado');
  // }

  // @SubscribeMessage('joinRoom')
  // async handleJoinRoom(client: Socket, roomId: string): Promise<void> {
  //   try {
  //     const room = await this.roomsService.addTeamToRoom(roomId, client.id);
  //     const numberOfMembers = room.teams.length;
  //     this.server.to(client.id).emit('roomMembers', numberOfMembers);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
}
