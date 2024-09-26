import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as validator from 'validator';
import * as bcrypt from 'bcryptjs';
import * as JWT from 'jsonwebtoken';
import { Avatar, AvatarSchema } from './avatar.schema';
import { Comments, CommentsSchema } from './comments.schema';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({
    required: true,
    minlength: [3, 'Please provide a username with at least 6 characters.'],
  })
  username: string;

  @Prop({
    required: true,
    unique: true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: 'Please provide a valid email address.',
    },
  })
  email: string;

  @Prop({
    required: true,
    select: false,
    minlength: [6, 'Please provide a password with at least 6 characters'],
  })
  password: string;

  @Prop({ type: AvatarSchema })
  avatar: Avatar;

  @Prop({ type: [mongoose.Types.ObjectId], ref: 'posts' })
  posts: mongoose.Types.ObjectId[];

  @Prop({ type: [mongoose.Types.ObjectId] })
  comments_added: mongoose.Types.ObjectId[];

  @Prop({ type: [mongoose.Types.ObjectId] })
  friends: mongoose.Types.ObjectId[];

  //-------------------- mongoose methods --------------------

  // generates jwt token
  getJWTtoken(): string {
    return JWT.sign(
      { id: this._id, name: this.username },
      process.env.JWT_SECRET,
      { expiresIn: parseInt(process.env.JWT_LIFETIME) * 24 * 60 * 60 * 1000 },
    );
  }

  // match password
  async comparePass(enteredPass: string): Promise<boolean> {
    return await bcrypt.compare(enteredPass, this.password);
  }
}

// Generating Mongoose schema from class
export const UserSchema = SchemaFactory.createForClass(User);

// hashing password
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// adding methods to user
UserSchema.method('getJWTtoken', User.prototype.getJWTtoken);
UserSchema.method('comparePass', User.prototype.comparePass);
