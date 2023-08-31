import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync } from 'fs';
import * as sharp from 'sharp';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('compress')
  async compress(
    @Query('path') filePath: string,
    @Query('color', ParseIntPipe) color: number,
    @Query('level', ParseIntPipe) level: number,
    @Res() res: Response,
  ) {
    console.log(filePath, color, level);
    if (!existsSync(filePath)) {
      throw new BadRequestException('文件不存在');
    }
    const data = await sharp(filePath, {
      animated: true,
      limitInputPixels: false,
    })
      .gif({
        // compressionLevel: level, 仅使用 png 的选项
        colours: color,
      })
      .toBuffer();

    res.set('Content-Disposition', 'attachment; filename="dest.gif"');
    res.send(data);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return file.path;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
