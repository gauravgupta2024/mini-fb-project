import { Module } from '@nestjs/common';
import { PostdataController } from './postdata.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostData, PostDataSchema } from 'src/schemas/post.schema';
import { UserModule } from '../user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { PostMulterConfig } from 'src/middlewares/post-multer-middlware';
import { PostdataService } from './postdata.service';

@Module({
  imports: [
    // register post schema
    MongooseModule.forFeature([
      {
        name: PostData.name,
        schema: PostDataSchema,
      },
    ]),

    // regitser multer module
    MulterModule.register(PostMulterConfig()),

    // importing usermodule to use authgaurd.
    UserModule,
  ],
  controllers: [PostdataController],
  providers: [PostdataService],
  exports: [MongooseModule],
})
export class PostdataModule {}
