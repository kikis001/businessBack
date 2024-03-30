import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Quiez extends Document {
  @Prop({ type: [String], required: true })
  questions: string[]

  @Prop({ type: [[String]], required: true })
  options: string[][]

  @Prop({ type: [Number], required: true})
  correctAnswers: number[]
}

export const QuizSchema = SchemaFactory.createForClass(Quiez);
