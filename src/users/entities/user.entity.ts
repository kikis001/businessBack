import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose";

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true})
  nameTeam: string

  @Prop({ type: [String], default: [], validate: {
    validator: function(arr) {
      return arr.length <=10
    },
    message: props => "La longitud de los miembros debe ser menor o igual a 10"
  }})
  members: string[]

  @Prop({ type: [Number], default: [] })
  answers: number[]

  @Prop({ type: Number, default: 0 })
  score: number
}

export const UserSchema = SchemaFactory.createForClass(User);
