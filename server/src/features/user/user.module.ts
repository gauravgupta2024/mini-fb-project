import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserController } from './user.controller';
import { MulterModule } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { AvatarMulterConfig } from 'src/middlewares/avatar-multer-middleware';

@Module({
  imports: [
    // register userschema
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),

    // regitser multer
    MulterModule.register(AvatarMulterConfig()),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [MongooseModule],
})
export class UserModule {}
