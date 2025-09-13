import { IToken } from "@/types/token";
import { Schema, model } from "mongoose";

const tokenSchema = new Schema<IToken>({
  token: {
    type: String,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export default model<IToken>("Token", tokenSchema);
