import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Controller('/')
export class AppController {
  @Get()
  welcome(): string {
    return 'welcome to my app !!';
  }

  // @Get('/api/v1/files/:filename')
  // async getFile(
  //   @Res() res: Response,
  //   @Param('filename') filename: string,
  // ): Promise<void> {
  //   const filePath = path.join(__dirname, '..', 'public', 'posts', filename);
  //   res.sendFile(filePath, (err) => {
  //     if (err) {
  //       res.status(404).send({ success: false, msg: 'File not found' });
  //     }
  //   });
  // }
}
