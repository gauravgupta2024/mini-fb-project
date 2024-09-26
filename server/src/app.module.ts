import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './features/auth/auth.module';
import { UserModule } from './features/user/user.module';
import { PostdataModule } from './features/postdata/postdata.module';
import { CommentsModule } from './features/comments/comments.module';
import { SearchModule } from './features/search/search.module';

@Module({
  imports: [
    //loads env variables
    ConfigModule.forRoot({
      isGlobal: true, // can be used anywhere in app
      envFilePath: '.env', // file path
    }),

    // mongodb connection string
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        return { uri };
      },
    }),

    // adding auth module
    AuthModule,

    // adding user module
    UserModule,

    PostdataModule,

    CommentsModule,

    SearchModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
