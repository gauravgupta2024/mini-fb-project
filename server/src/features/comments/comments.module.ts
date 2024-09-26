import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { UserModule } from '../user/user.module';
import { PostdataModule } from '../postdata/postdata.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Comments, CommentsSchema } from 'src/schemas/comments.schema';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    UserModule,
    PostdataModule,
    MongooseModule.forFeature([
      {
        name: Comments.name,
        schema: CommentsSchema,
      },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
