import mongoose,{Schema,Document } from "mongoose";

export interface IUser extends Document{
    firstName:string,
    lastName:string,
    email:string,
    mobile:string,
    password:string,
    role: "ADMIN" | "USER"
}

const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'user'], default: 'user' },  // default role is user
  });

  export default mongoose.model<IUser>('User', UserSchema);