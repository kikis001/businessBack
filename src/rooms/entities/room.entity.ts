import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Quiez } from "./quiez.entity";
import { User, UserSchema } from "src/users/entities/user.entity";

@Schema()
export class Room extends Document {
  @Prop({ type: String, required: true })
  nameRoom: string

  @Prop({ type: Types.ObjectId, ref: Quiez.name, required: true })
  quiz: Quiez | Types.ObjectId

  @Prop({ type: [{ type: Types.ObjectId}], ref: User.name, default: [] })
  teams: Types.Array<User>;

  @Prop({ type:[{ type: Types.ObjectId}], ref: User.name, default: [] })
  winnerTeamId: Types.Array<User>

  @Prop({ type: Number, default: 0 })
  scoreMax: number
}

export const RoomSchema = SchemaFactory.createForClass(Room)
