import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from '../../users/entities/user.entity'
import { Room } from "./room.entity";

@Schema()
export class Winner extends Document {
  @Prop({ type: Types.ObjectId, ref: Room.name, required: true })
  idRoom:  Room | Types.ObjectId


  // @Prop({ type: Types.ObjectId, ref: Quiez.name, required: true })
  // quiz: Quiez | Types.ObjectId
  @Prop({ type:[{ type: Types.ObjectId}], ref: User.name, default: [] })
  WinnerTeamName: Types.Array<User> | String[]
}

export const WinnerSchema = SchemaFactory.createForClass(Winner);
