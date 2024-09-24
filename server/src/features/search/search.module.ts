import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { UserModule } from '../user/user.module';
import { PostdataModule } from '../postdata/postdata.module';

@Module({
  imports: [UserModule, PostdataModule],
  controllers: [SearchController],
})
export class SearchModule {}
