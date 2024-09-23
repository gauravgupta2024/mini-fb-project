import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './features/auth/auth.module';
import { UserModule } from './features/user/user.module';
import { PostdataModule } from './features/postdata/postdata.module';
import * as mongoose from 'mongoose';

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
        mongoose.connection.on('connected', () => console.log('DB connected.'));
        mongoose.connection.on('error', (err) =>
          console.log('DB connection error !!', err),
        );

        return { uri };
      },
    }),

    // adding auth module
    AuthModule,

    // adding user module
    UserModule,

    PostdataModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
