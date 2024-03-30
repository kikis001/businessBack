import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Room, RoomSchema } from "./room.entity";

@Schema()
export class Winner extends Document {
  @Prop({ type: RoomSchema })
  idRoom: Room

  @Prop({ type: [String] })
  WinnerTeamName: string[]
}

export const WinnerSchema = SchemaFactory.createForClass(Winner);
