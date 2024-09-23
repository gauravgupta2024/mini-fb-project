import { Injectable } from '@nestjs/common';
import { UserDocumentType } from 'src/types/schemas';
import { unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UserService {
  async findAndDeleteExistingAvatar(userData: UserDocumentType): Promise<void> {
    try {
      if (userData.avatar.public_id !== 'new_user') {
        const fullPath = join(process.cwd(), userData.avatar.url);
        // console.log({ fullPath });
        unlinkSync(fullPath);
      }
    } catch (error) {
      console.log({ msg: 'file not found !!', error });
    }
  }
}
